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
    const [ userPlaylists, setUserPlaylists ] = useState({});
    const [ tracksFetched, setTracksFetched ] = useState(0);
    const [ tracksFetchFinished, setTracksFetchFinished ] = useState(false);
    const [ playlistName, setPlaylistName ] = useState("");
    const [ playlistLink, setPlaylistLink ] = useState("");
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
                setUserID={setUserID}
                setUserPlaylists={setUserPlaylists} />
            <Search
                playlist={playlist}
                setPlaylist={setPlaylist} />
            <Playlist
                playlist={playlist} 
                setPlaylist={setPlaylist} />
            <Submit
                userID={userID}
                userPlaylists={userPlaylists}
                playlist={playlist}
                playlistName={playlistName}
                setTracksFetched={setTracksFetched}
                setTracksFetchFinished={setTracksFetchFinished}
                setPlaylistName={setPlaylistName}
                setPlaylistLink={setPlaylistLink}
                setAppInUsage={setAppInUsage}
                setPlaylistCreated={setPlaylistCreated} />
            <Footer footerText={disclaimer} />
        </div>
        );
    } else {
        return(
            <Outro 
                tracksFetched={tracksFetched}
                tracksFetchFinished={tracksFetchFinished}
                playlistName={playlistName}
                playlistLink={playlistLink}
                playlistCreated={playlistCreated}
                setAppInUsage={setAppInUsage}
                setPlaylistCreated={setPlaylistCreated} />
        );
    };
}

export default Main;
