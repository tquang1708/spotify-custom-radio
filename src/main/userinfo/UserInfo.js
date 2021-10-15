import { useState, useEffect } from 'react';
import handleTokenExpiry from '../HandleTokenExpiry';
import './UserInfo.css';

function UserInfo(props) {
    const setUserID = props.setUserID;

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

        fetch('https://api.spotify.com/v1/me', requestOptions)
            .then(response => response.json())
            .then(data => {
                setUserName(data["display_name"]);
                setUserID(data["id"]);
            })
            .catch(error => {
                setUserName("<error>");
                console.log(error);
            });

        return () => {
            setUserName("");
            setUserID("");
        };
    }, [ setUserID ]);

    return (
        <div className="userinfo">
            <div>Logged in as<strong>&nbsp;{userName}&nbsp;</strong></div>
            <div style={{cursor: "pointer"}} onClick={handleLogout}><u>(Log Out)</u></div>
        </div>
    );
};

export default UserInfo;
