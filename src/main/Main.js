import { useState, useEffect } from 'react';
import UserInfo from './userinfo/UserInfo';
import Search from './search/Search';
import Playlist from './playlist/Playlist';
import Submit from './submit/Submit';
import './Main.css';

function Main() {
    const [ playlist, setPlaylist ] = useState({});

    useEffect(() => {
        setTimeout(() => {
            window.sessionStorage.removeItem("authorized");
            window.sessionStorage.removeItem("access_token");
            window.sessionStorage.removeItem("access_token_timestamp");
            alert("Your login token has expired. Please login again.");
            window.location.reload()
	}, 3300000);
    }, []);

    return (
        <div className="main">
            <UserInfo />
            <Search
                playlist={playlist}
                setPlaylist={setPlaylist} />
            <Playlist
                playlist={playlist} 
                setPlaylist={setPlaylist} />
            <Submit playlist={playlist} />
        </div>
    );
}

export default Main;
