import { useState } from 'react';
import './Search.css'

const cartiArtist = "https://lastfm.freetls.fastly.net/i/u/770x0/6d9bfcf2d0b72abed86c72ccf99ccf33.jpg"
const cartiLit = "https://e.snmc.io/i/fullres/w/bec4478f4b274d9365f8d8b25858fa33/7212299"

function FoldButton(props) {
    const { isArtistResult, showSubsection, setShowSubsection } = props;
    const onClickShowSubsection = () => setShowSubsection(!showSubsection);
    const onMouseDownPreventDefault = (e) => e.preventDefault();

    if (isArtistResult) {
        return (
            <div 
                className="search-searchresult-button foldbutton"
                onClick={onClickShowSubsection}
                onMouseDown={onMouseDownPreventDefault}>
                {showSubsection ? "—" : "+"}
            </div>
        );
    } else {
        return (<div className="search-searchresult-button"></div>);
    };
}

function SearchResultEntry(props) {
    const { imageUrl, mainName, subName, isArtistResult } = props;
    const [ showSubsection, setShowSubsection ] = useState(false);
    const subsection =
        <div className="search-searchresult-subsection">
            <div className="search-searchresult-subsection-item">Add Discography</div>
            <div className="search-searchresult-subsection-item">Add Top Tracks</div>
        </div>;

    return (
        <div className="search-searchresult-entry">
            <div className="search-searchresult-entry-info">
                <FoldButton 
                    isArtistResult={isArtistResult}
                    showSubsection={showSubsection}
                    setShowSubsection={setShowSubsection} />
                <img 
                    src={imageUrl}
                    alt={mainName}
                    style={{width: '90px', height: '90px', padding: '5px'}}
                ></img>
                <div>
                    <h3>{mainName}</h3>
                    <p>{subName}</p>
                </div>
            </div>
            {showSubsection && subsection}
        </div>
    );
}

function SearchResult() {
    return (
        <div className="search-searchresult">
            <p className="search-searchresult-title">Artists</p>
            <SearchResultEntry
                isArtistResult={true}
                imageUrl={cartiArtist}
                mainName="Playboi Carti"
            />
            <SearchResultEntry
                isArtistResult={true}
                imageUrl={cartiArtist}
                mainName="Playboi Carti"
            />
            <SearchResultEntry
                isArtistResult={true}
                imageUrl={cartiArtist}
                mainName="Playboi Carti"
            />
            <p className="search-searchresult-title">Albums</p>
            <SearchResultEntry
                isArtistResult={false}
                imageUrl={cartiLit}
                mainName="Die Lit"
                subName="Playboi Carti"
            />
            <SearchResultEntry
                isArtistResult={false}
                imageUrl={cartiLit}
                mainName="Die Lit"
                subName="Playboi Carti"
            />
            <SearchResultEntry
                isArtistResult={false}
                imageUrl={cartiLit}
                mainName="Die Lit"
                subName="Playboi Carti"
            />
        </div>
    );
}

function Search() {
    const [ query, setQuery ] = useState("");
    const [ focus, setFocus ] = useState(false);

    const onFocusSetFocus = () => setFocus(true);
    const onBlurSetFocus = () => setFocus(false);

    return (
        <div className="search">
            <input
                className="search-searchbar"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={onFocusSetFocus}
                onBlur={onBlurSetFocus}
            />
            {query && focus && <SearchResult />}
        </div>
    );
}

export default Search;