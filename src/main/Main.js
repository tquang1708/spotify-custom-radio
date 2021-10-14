import { useState } from 'react';
import UserInfo from './userinfo/UserInfo';
import Search from './search/Search';
import Playlist from './playlist/Playlist';
import Submit from './submit/Submit';
import './Main.css';

function Main() {
    const [ playlist, setPlaylist ] = useState({});

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