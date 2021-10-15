import Footer from '../Footer';
import '../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Outro(props) {
    const { tracksFetched,
            tracksFetchFinished,
            playlistCreated, 
            playlistName, 
            playlistLink,
            setAppInUsage,
            setPlaylistCreated } = props;
    const [ loadingText, setLoadingText ] = useState(".");

    useEffect(() => {
        function updateLoadingText() {
            if (loadingText.length === 5) {
                setLoadingText(".");
            } else {
                setLoadingText(loadingText + ".");
            }
        }

        const intervalID = setInterval(updateLoadingText, 350);

        return () => {
            clearInterval(intervalID);
        };
    }, [ loadingText ]);

    const onClickResetState = () => {
        setAppInUsage(true);
        setPlaylistCreated(false);
        window.location.reload();
    };

    if (!playlistCreated) {
        let disclaimer = "It might take a while to build the playlist for larger playlists ";
        disclaimer += "or during times when the site is busy due to rate limiting on "
        disclaimer += "Spotify's API."

        let flavorText;
        if (!tracksFetchFinished) {
            flavorText = <div>Fetching Tracks{loadingText}</div>;
        } else {
            flavorText = <div><span style={{color: "var(--highlight-color)"}}>{tracksFetched}</span> Tracks Found. Adding{loadingText}</div>;
        }

        return (
            <div className="center-element">
                <p className="center-text">
                    Constructing <span style={{color: "var(--highlight-color)"}}>Playlist</span>
                    <br/>{flavorText}
                </p>
                <Footer footerText={disclaimer} />
            </div>
        );
    } else {
        return (
            <div className="center-element">
                <p className="center-text">
                    Playlist <a href={playlistLink} target="_blank" rel="noreferrer" >{playlistName}</a> Created!
                    <Link to="/" onClick={onClickResetState}>&nbsp;Create Another playlist?</Link>
                </p>
                <Footer selfAdvertising={true} />
            </div>
        );
    }
}

export default Outro;