import { useState } from 'react';
import handleTokenExpiry from '../HandleTokenExpiry';
import { options } from '../../options';
import './Submit.css';

async function handleRequest(fetchURL, requestOptions) {
    let response;
    while (true) {
        response = await fetch(fetchURL.href, requestOptions).catch(error => {console.log(error)});
        if (response.ok) {
            break;
        } else {
            // too many requests
            if (response.status === 429) {
                const timeout = parseInt(response.headers.get("retry-after"), 10);
                await new Promise(r => setTimeout(r, timeout));
            } else if (response.status === 403) {
                let alertMessage = "";
                alertMessage += "403 forbidden. Your login token has expired, probably. Please login again.\n\n";
                alertMessage += "If this happened while you were adding tracks to the playlist, this might have been ";
                alertMessage += "triggered because the playlist already has 10,000 items, which is Spotify's maximum ";
                alertMessage += "permitted size for a playlist."

                window.sessionStorage.removeItem("authorized");
                window.sessionStorage.removeItem("access_token");
                window.sessionStorage.removeItem("access_token_timestamp");
                alert(alertMessage);
                window.location.reload();
            }
        }
    }

    return response;
}

async function getAlbumTrackURIs(requestOptions, albumID) {
    let trackURIs = new Set([]);

    const fetchURL = new URL(`https://api.spotify.com/v1/albums/${albumID}/tracks`);
    fetchURL.searchParams.set('market', 'from_token');
    fetchURL.searchParams.set('limit', '50');

    let offset = 0;
    while (true) {
        fetchURL.searchParams.set('offset', offset);

        const response = await handleRequest(fetchURL, requestOptions);
        const data = await response.json().catch(error => console.log(error));
        const items = data["items"];

        items.forEach((track) => {
            trackURIs.add(track["uri"]);
        });

        if (items.length < 50) {
            break;
        } else {
            offset += 50;
        }
    }

    return trackURIs;
}

// fisher-yates shuffle algo
// taken from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var i;
    for (i = array.length - 1; i > 0; i--) {
        // pick a remaining element
        const rem = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[rem];
        array[rem] = temp;
    }
    return array;
}

function Submit(props) {
    const { userID, 
            userPlaylists,
            playlist, 
            playlistName, 
            setTracksFetched,
            setTracksFetchFinished,
            setPlaylistName, 
            setPlaylistLink,
            setAppInUsage, 
            setPlaylistCreated } = props;
    const [ createPlaylist, setCreatePlaylist ] = useState(true);
    const [ appendToPlaylistID, setAppendToPlaylistID ] = useState("");
    const [ privatePlaylist, setPrivatePlaylist ] = useState(true);
    const [ selectValue, setSelectValue ] = useState("create private");

    const onClickSubmit = async () => {
        handleTokenExpiry();

        if (Object.keys(playlist).length === 0) {
            alert("Your playlist is currently empty. Nothing to be done for now.");
        } else if (Object.keys(playlist).length > options["entry_count_limit"] && options["enable_rate_limit"]) {
            let alertMessage = "";
            alertMessage += `There are more than ${options["entry_count_limit"]} items in your playlist. `
            alertMessage += "Please remove some items to free up the app.\n\n"
            alertMessage += "Note that you can turn off rate limiting on your local build by "
            alertMessage += "turning off the respective option in options.js"
            alert(alertMessage);
        } else {
            const accessToken = window.sessionStorage.getItem("access_token");
            const getRequestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            };

            // gathering track uris and album IDs;
            let trackURIs = new Set([]);
            let albumIDs = new Set([]);
        
            await Promise.all(Object.keys(playlist).map(async (artistID) => {
                if (playlist[artistID]["discography"]) {
                    const fetchURL = new URL(`https://api.spotify.com/v1/artists/${artistID}/albums`);
                    fetchURL.searchParams.set('market', 'from_token');
                    fetchURL.searchParams.set('include_groups', 'album,single');
                    fetchURL.searchParams.set('limit', '50');

                    let offset = 0;
                    while (true) {
                        fetchURL.searchParams.set('offset', offset);
                
                        const response = await handleRequest(fetchURL, getRequestOptions);
                        const data = await response.json().catch(error => console.log(error));
                        const items = data["items"];
                        const itemsIDs = items.map(album => album["id"]);
                        itemsIDs.forEach(id => albumIDs.add(id));
                
                        if (items.length < 50) {
                            break;
                        } else {
                            offset += 50;
                        }
                    };
                } else {
                    Object.keys(playlist[artistID]["albums"]).forEach(id => albumIDs.add(id));

                    if (playlist[artistID]["topTracks"]) {
                        const fetchURL = new URL(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`);
                        fetchURL.searchParams.set('market', 'from_token');

                        const response = await handleRequest(fetchURL, getRequestOptions);
                        const data = await response.json().catch(error => console.log(error));
                        data["tracks"].forEach((track) => {
                            trackURIs.add(track["uri"]);
                        }); 
                    };
                }
            }));

            // another early rate limit
            if (options["enable_rate_limit"] && albumIDs.size > options["album_count_limit"]) {
                let alertMessage = "";
                alertMessage += `There are more than ${options["album_count_limit"]} albums/eps/singles in your playlist. `
                alertMessage += "Please remove some items to free up the app.\n\n"
                alertMessage += "Note that you can turn off rate limiting on your local build by "
                alertMessage += "turning off the respective option in options.js"
                alert(alertMessage);
            } else {
                // switch to loading view
                setAppInUsage(false);

                // populate trackuris
                await Promise.all(Array.from(albumIDs).map(async (albumID) => {
                    const albumURIs = await getAlbumTrackURIs(getRequestOptions, albumID);
                    trackURIs = new Set([...trackURIs, ...albumURIs]);
                }))

                setTracksFetched(trackURIs.size);
                setTracksFetchFinished(true);

                // make the playlist
                let playlistID = "";
                if (createPlaylist) {
                    const finalPlaylistName = playlistName ? playlistName : "Custom Radio Station";
                    setPlaylistName(finalPlaylistName);
                    const createPlaylistJSON = {
                        name: finalPlaylistName,
                        public: !privatePlaylist,
                        description: options["playlist_description"]
                    }
                    const createRequestOptions = {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(createPlaylistJSON)
                    };
                    const createURL = new URL(`https://api.spotify.com/v1/users/${userID}/playlists`);
                    const response = await handleRequest(createURL, createRequestOptions);
                    const data = await response.json().catch(error => console.log(error));
                    playlistID = data["id"];
                    setPlaylistLink(data["external_urls"]["spotify"]);
                } else {
                    // or append
                    playlistID = appendToPlaylistID ? appendToPlaylistID : Object.keys(userPlaylists)[0]

                    const getRequestOptions = {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                        }
                    }
                    const getPlaylistURL = new URL(`https://api.spotify.com/v1/playlists/${playlistID}`);
                    const response = await handleRequest(getPlaylistURL, getRequestOptions);
                    const data = await response.json().catch(error => console.log(error));
                    setPlaylistName(data["name"]);
                    setPlaylistLink(data["external_urls"]["spotify"]);
                }

                // populate the playlist
                const trackURIArray = shuffle(Array.from(trackURIs));
                const addTracksURL = new URL(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`);

                await Promise.all([...Array(Math.ceil(trackURIArray.length / 100)).keys()].map(async (chunkIndex) => {
                    const trackURIIndex = chunkIndex * 100;
                    const toAddURIs = trackURIArray.slice(trackURIIndex, trackURIIndex + 100);
                    const addTracksJSON = {
                        uris: toAddURIs,
                    };

                    const addRequestOptions = {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(addTracksJSON)
                    };
                    const response = await handleRequest(addTracksURL, addRequestOptions);
                    await response.json().catch(error => console.log(error));
                }));
            }

            // update finished state
            setPlaylistCreated(true);
        }
    };

    const onChangeUpdatePlaylistName = e => setPlaylistName(e.target.value);
    const onChangeUpdateAppendPlaylistID = (e) => {
        setPlaylistName(userPlaylists[e.target.value]);
        setAppendToPlaylistID(e.target.value);
    };
    const onChangeUpdateValue = (e) => {
        if (e.target.value === "append") {
            if (Object.keys(userPlaylists).length === 0) {
                alert("You have no playlist to append to yet.");
            } else {
                setSelectValue(e.target.value);
                setCreatePlaylist(false);
            }
        } else {
            setSelectValue(e.target.value);
            setCreatePlaylist(true);
            setPlaylistName("");
            if (e.target.value.includes("private")) {
                setPrivatePlaylist(true);
            } else {
                setPrivatePlaylist(false);
            }
        }
    };

    let playlistSelect;
    if (createPlaylist) {
        playlistSelect = 
            <input
                type="text"
                value={playlistName}
                placeholder="Playlist Name..."
                onChange={onChangeUpdatePlaylistName}
                style={{
                    height: "25px"
                }}
            />
    } else {
        const playlistOptions = Object.keys(userPlaylists).map((playlistID) => {
            return <option key={"append" + playlistID} value={playlistID}>{userPlaylists[playlistID]}</option>
        });
        playlistSelect = 
            <select
                value={appendToPlaylistID}
                onChange={onChangeUpdateAppendPlaylistID}>
                {playlistOptions}
            </select>
    }

    return (
        <div className="submit">
            <div className="submit-options">
                <select
                    value={selectValue}
                    onChange={onChangeUpdateValue}>
                    <option value="create private">Create a new Private Playlist</option>
                    <option value="create public">Create a new Public Playlist</option>
                    <option value="append">Append to an existing Playlist</option>
                </select>
                {playlistSelect}
            </div>
            <div 
                className="submit-button main-component"
                onClick={onClickSubmit}>
                Submit
            </div>
        </div>
    );
}

export default Submit;
