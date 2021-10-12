import Search from './search/Search';
import Entry from './common/Entry';
import Subsection from './common/Subsection';
import './Main.css';

const cartiArtist = "https://lastfm.freetls.fastly.net/i/u/770x0/6d9bfcf2d0b72abed86c72ccf99ccf33.jpg"

function Playlist() {
    const subsectionTitles = ["Top Tracks", "(Album) Die LIt"];
    const subsection = <Subsection mainName="Playboi Carti" subsectionTitles={subsectionTitles} hasDeleteButton={true} />;

    return (
        <div className="playlist main-component">
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
}

function Submit() {
    return (
        <div className="submit">
            <div className="submit-duplicate">
                <input type="checkbox"/>
                <div>Include Duplicate?</div>
            </div>
            <div className="submit-button main-component">Submit</div>
        </div>
    );
}

function Main() {
    return (
        <div className="main">
            <Search />
            <Playlist />
            <Submit />
        </div>
    );
}

export default Main;