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
                window.sessionStorage.removeItem("authorized");
                window.sessionStorage.removeItem("access_token");
                window.sessionStorage.removeItem("access_token_timestamp");
                alert("Your login token has expired, probably. Please login again.");
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

function Submit(props) {
    const { userID, playlist, setAppInUsage } = props;
    const [ checked, setChecked ] = useState(false);
    const [ playlistName, setPlaylistName ] = useState("");
    const onClickUpdateValue = () => setChecked(!checked);

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
                alertMessage += "(don't add Viper pls.) Please remove some items to free up the app.\n\n"
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

                // make the playlist
                const finalPlaylistName = playlistName ? playlistName : "Custom Radio Station";
                const createPlaylistJSON = {
                    name: finalPlaylistName,
                    public: checked,
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
                const playlistID = data["id"];

                let trackURIIndex = 0;
                const trackURIArray = Array.from(trackURIs);
                const addTracksURL = new URL(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`);
                while (trackURIIndex < trackURIArray.length) {
                    const addTracksJSON = {
                        uris: trackURIArray.slice(trackURIIndex, trackURIIndex + 100),
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
                    const data = await response.json().catch(error => console.log(error));

                    trackURIIndex += 100;
                }
            }
        }
    };

    const onChangeUpdatePlaylistName = e => setPlaylistName(e.target.value);

    return (
        <div className="submit">
            <input
                type="text"
                value={playlistName}
                placeholder="Playlist Name..."
                onChange={onChangeUpdatePlaylistName}
                style={{
                    height: "25px"
                }}
            />
            <div className="submit-public">
                <input
                    type="checkbox"
                    checked={checked}
                    onClick={onClickUpdateValue}
                />
                <div
                    onClick={onClickUpdateValue}
                    style={{
                        cursor: "pointer"
                    }}>
                    Make Playlist Public?
                </div>
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
