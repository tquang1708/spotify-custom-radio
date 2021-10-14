import Entry from '../common/Entry';
import Subsection from '../common/Subsection';
import './Playlist.css';

function Playlist(props) {
    const { playlist } = props;

    let playlistItems;
    if (Object.keys(playlist).length === 0) {
        playlistItems = 
            <p style={{textAlign: "center", alignSelf: "center", color: "var(--text-color-dim)", fontStyle: "italic"}}>
                This playlist seems a bit empty... Add some songs to it through the search bar above.
            </p>;
    } else {
        playlistItems = Object.keys(playlist).map((i) => {
            const subsectionTitles = playlist[i]['subsection'];
            const subsection = <Subsection subsectionTitles={subsectionTitles.sort()} hasDeleteButton={true} />;
    
            return <Entry
                key={"playlist" + i}
                mainName={playlist[i]['name']}
                imageUrl={playlist[i]['imageUrl']}
                hasSubsection={true}
                subsection={subsection}
                hasDeleteButton={true}
            />
        });
    }

    return (
        <div className="main-component playlist">
            <p className="main-title">Current Playlist</p>
            {playlistItems}
        </div>
    );
};

export default Playlist;