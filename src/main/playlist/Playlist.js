import Entry from '../common/Entry';
import Subsection from '../common/Subsection';
import './Playlist.css';

function Playlist(props) {
    const { playlist, setPlaylist } = props;

    let playlistItems;
    if (Object.keys(playlist).length === 0) {
        playlistItems = 
            <p style={{textAlign: "center", alignSelf: "center", color: "var(--text-color-dim)", fontStyle: "italic"}}>
                This playlist seems a bit empty... Add some songs to it through the search bar above.
            </p>;
    } else {
        playlistItems = Object.keys(playlist).map((i) => {
            const subsection = 
                <Subsection 
                    artistID={i}
                    playlist={playlist}
                    setPlaylist={setPlaylist} />;
	
            let subName = "";
	        if (playlist[i]['discography']) {
		        subName = "Discography";
	        } else {
		        if (playlist[i]['topTracks']) {
		            subName = subName + "Top Tracks, ";
		        };

		        Object.values(playlist[i]['albums']).forEach((album) => {
		            subName = subName + "(album) " + album + ", ";
                });

		        subName = subName.slice(0, -2);
	        }
    
            return <Entry
                key={"playlist" + i}
                artistID={i}
                mainName={playlist[i]['name']}
                subName={subName}
                imageUrl={playlist[i]['imageUrl']}
                hasSubsection={true}
                subsection={subsection}
                playlist={playlist}
                setPlaylist={setPlaylist}
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
