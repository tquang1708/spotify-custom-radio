import Footer from '../Footer';
import '../App.css';
import { useEffect, useState } from 'react';

function Outro(props) {
    const playlistCreated = playlistCreated;
    const [ loadingText, setLoadingText ] = useState(".");

    useEffect(() => {
        function updateLoadingText() {
            if (loadingText.length === 3) {
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

    if (!playlistCreated) {
        let disclaimer = "";
        disclaimer += "It might take a while to build the playlist for larger playlists, "
        disclaimer += "or during times when the site is busy, due to rate limiting on "
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
                <Footer footerText={disclaimer}/>
            </div>
        );
    } else {
        //
    }
}

export default Outro;