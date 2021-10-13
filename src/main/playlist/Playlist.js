import Entry from '../common/Entry';
import Subsection from '../common/Subsection';
import './Playlist.css';

const cartiArtist = "https://lastfm.freetls.fastly.net/i/u/770x0/6d9bfcf2d0b72abed86c72ccf99ccf33.jpg"

function Playlist() {
    const subsectionTitles = ["Top Tracks", "(Album) Die Lit"];
    const subsection = <Subsection mainName="Playboi Carti" subsectionTitles={subsectionTitles} hasDeleteButton={true} />;

    return (
        <div className="main-component playlist">
            <p className="main-title">Current Playlist</p>
            <Entry
                mainName="Playboi Carti"
                imageUrl={cartiArtist}
                hasSubsection={true}
                subsection={subsection}
                hasDeleteButton={true}
            />
        </div>
    );
};

export default Playlist;