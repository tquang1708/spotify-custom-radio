import Footer from '../Footer';
import '../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Outro(props) {
    const { playlistCreated, 
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

        return (
            <div className="center-text">
                <p
                    style={{
                        color: "var(--text-color)",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                    Constructing <span style={{color: "var(--highlight-color)"}}>Playlist</span><br/>{loadingText}
                </p>
                <Footer footerText={disclaimer} />
            </div>
        );
    } else {
        return (
            <div className="center-text">
                <p
                    style={{
                        color: "var(--text-color)",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                    Playlist <a href={playlistLink} target="_blank" rel="noreferrer" >{playlistName}</a> Created!
                    <Link to="/" onClick={onClickResetState}>&nbsp;Create Another playlist?</Link>
                </p>
                <Footer selfAdvertising={true} />
            </div>
        );
    }
}

export default Outro;