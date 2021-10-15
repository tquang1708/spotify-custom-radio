import { useState, useEffect } from 'react';
import UserInfo from './userinfo/UserInfo';
import Search from './search/Search';
import Playlist from './playlist/Playlist';
import Submit from './submit/Submit';
import Outro from '../outro/Outro';
import Footer from '../Footer';
import './Main.css';

function Main() {
    const [ playlist, setPlaylist ] = useState({});
    const [ userID, setUserID ] = useState("");
    const [ appInUsage, setAppInUsage ] = useState(true);
    const [ playlistCreated, setPlaylistCreated ] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            window.sessionStorage.removeItem("authorized");
            window.sessionStorage.removeItem("access_token");
            window.sessionStorage.removeItem("access_token_timestamp");
            alert("Your login token has expired. Please login again.");
            window.location.reload()
	    }, 3300000);
    }, []);

    if (appInUsage) {
        let disclaimer = "";
        disclaimer += "Note that the Discography option only includes all Albums, "
        disclaimer += "Singles and EPs and do not include Compilations or Apperances "
        disclaimer += "on other artists' albums.";

        return (<div className="main">
            <UserInfo 
                setUserID={setUserID} />
            <Search
                playlist={playlist}
                setPlaylist={setPlaylist} />
            <Playlist
                playlist={playlist} 
                setPlaylist={setPlaylist} />
            <Submit
                userID={userID}
                playlist={playlist}
                setAppInUsage={setAppInUsage}
                setPlaylistCreated={setPlaylistCreated} />
            <Footer footerText={disclaimer} />
        </div>
        );
    } else {
        return(
            <Outro playlistCreated={playlistCreated} />
        );
    };
}

export default Main;
