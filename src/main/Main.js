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
            <Search playlist={playlist} setPlaylist={setPlaylist} />
            <Playlist key={playlist} playlist={playlist} setPlaylist={setPlaylist} />
            <Submit />
        </div>
    );
}

export default Main;