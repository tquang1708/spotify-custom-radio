import './UserInfo.css';
import { useState, useEffect } from 'react';

function UserInfo() {
    const handleLogout = () => {
        window.sessionStorage.removeItem("authorized");
        window.sessionStorage.removeItem("access_token");
        window.sessionStorage.removeItem("access_token_timestamp");
        alert("You have been logged out successfully.");
        window.location.reload();
    }

    const [ userName, setUserName ] = useState("");
    useEffect(() => {
        const accessToken = window.sessionStorage.getItem("access_token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        };

        fetch('https://api.spotify.com/v1/me', requestOptions)
            .then(response => response.json())
            .then(data => setUserName(data["display_name"]))
            .catch(error => {
                setUserName("<error>");
                console.log(error);
            });
    }, []);

    return (
        <div className="userinfo">
            <div>Logged in as<strong>&nbsp;{userName}&nbsp;</strong></div>
            <div style={{cursor: "pointer"}} onClick={handleLogout}><u>(Log Out)</u></div>
        </div>
    );
};

export default UserInfo;
