import { useState, useEffect } from 'react';
import handleTokenExpiry from '../HandleTokenExpiry';
import './UserInfo.css';

function UserInfo(props) {
    const { setUserID, setUserPlaylists } = props;

    const handleLogout = () => {
        window.sessionStorage.removeItem("authorized");
        window.sessionStorage.removeItem("access_token");
        window.sessionStorage.removeItem("access_token_timestamp");
        alert("You have been logged out successfully.");
        window.location.reload();
    }

    const [ userName, setUserName ] = useState("");
    useEffect(() => {
        handleTokenExpiry();
        const accessToken = window.sessionStorage.getItem("access_token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        };

        const fetchURL = 'https://api.spotify.com/v1/me';
        fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(data => {
                setUserName(data["display_name"]);
                setUserID(data["id"]);
            })
            .catch(error => {
                setUserName("<error>");
                console.log(error);
            });

        const fetchPlaylistsURL = new URL('https://api.spotify.com/v1/me/playlists');
        fetchPlaylistsURL.searchParams.set('limit', 50);
        let offset = 0;
        let playlistIDs = {};
        while (true) {
            fetchPlaylistsURL.searchParams.set('offset', offset);
    
            fetch(fetchPlaylistsURL.href, requestOptions)
                .then(response => response.json())
                .then(data => {
                    data["items"].forEach((playlist) => {
                        playlistIDs[playlist["id"]] = playlist["name"];
                    });
                })
                .catch(error => {
                    console.log(error);
                });

            if (Object.keys(playlistIDs).length < 50) {
                break;
            } else {
                offset += 50;
            }
        };
        setUserPlaylists(playlistIDs);

        return () => {
            setUserName("");
            setUserID("");
            setUserPlaylists({});

        };
    }, [ setUserID, setUserPlaylists ]);

    return (
        <div className="userinfo">
            <div>Logged in as<strong>&nbsp;{userName}&nbsp;</strong></div>
            <div style={{cursor: "pointer"}} onClick={handleLogout}><u>(Log Out)</u></div>
        </div>
    );
};

export default UserInfo;
