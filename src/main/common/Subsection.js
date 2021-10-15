import SearchSubsection from "./SearchSubsection";
import PlaylistSubsection from "./PlaylistSubsection";
import './Subsection.css';

function Subsection(props) {
    const { artistID,
            artistName,
            artistUrl,
            isSearchResult,
            playlist,
            setPlaylist,
            setQuery,
            setResultVisible } = props

    let subsectionItems = [];
    if (isSearchResult) {
        subsectionItems = [true, false].map((i) => {
            return <SearchSubsection 
		        key={"search subsection" + artistID + i}
                playlist={playlist}
                artistID={artistID}
                artistName={artistName}
                artistUrl={artistUrl}
                isDiscography={i}
                setPlaylist={setPlaylist}
                setResultVisible={setResultVisible}
                setQuery={setQuery}
            />;
        });
    } else {
        if (playlist[artistID]["discography"]) {
            subsectionItems.push(
                <PlaylistSubsection 
                    key={"playlist subsection" + artistID + "discography"}
                    artistID={artistID}
                    title={"Discography"}
		            isDiscography={true}
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                />
            );
        } else {
            if (playlist[artistID]["topTracks"]) {
                subsectionItems.push(
                    <PlaylistSubsection 
                        key={"playlist subsection" + artistID + "toptracks"}
                        artistID={artistID}
                        title={"Top Tracks"}
			            isDiscography={false}
                        playlist={playlist}
                        setPlaylist={setPlaylist}
                    />
                );
            };

            Object.keys(playlist[artistID]["albums"]).forEach((albumID) => {
                subsectionItems.push(
                    <PlaylistSubsection 
                        key={"playlist subsection" + artistID + albumID}
                        artistID={artistID}
                        albumID={albumID}
                        title={`(album) ${playlist[artistID]["albums"][albumID]}`}
			            isDiscography={false}
                        playlist={playlist}
                        setPlaylist={setPlaylist}
                    />
                );
            });
        }
    }

    return (
        <div className="main-entry-subsection">
            {subsectionItems}
        </div>
    );
}

export default Subsection;
