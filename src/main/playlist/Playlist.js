import Entry from '../common/Entry';
import Subsection from '../common/Subsection';
import './Playlist.css';

const kikuo = "https://lastfm.freetls.fastly.net/i/u/770x0/bb99d426167e160736b9ada06fd84449.jpg"

function Playlist(props) {
    const { playlist, setPlaylist } = props;
    const subsectionTitles = ["Top Tracks", "(Album) Die Lit"];
    const subsection = <Subsection mainName="Playboi Carti" subsectionTitles={subsectionTitles} hasDeleteButton={true} />;

    let playlistItems;
    if (playlist.length === 0) {
        playlistItems = 
            <p style={{alignSelf: "center", color: "var(--text-color-dim)", fontStyle: "italic"}}>
                This playlist seems a bit empty... Add some songs to it through the search bar above.
            </p>;
    } else {
        playlistItems = playlist.map(() => 
            <Entry
                mainName="きくお"
                imageUrl={kikuo}
                hasSubsection={true}
                subsection={subsection}
                hasDeleteButton={true}
            />
        );
    }

    return (
        <div className="main-component playlist">
            <p className="main-title">Current Playlist</p>
            {playlistItems}
        </div>
    );
};

export default Playlist;