import { useState } from 'react';
import Entry from '../common/Entry';
import './Search.css';

import Subsection from '../common/Subsection';

const utamonogatari = "https://e.snmc.io/i/fullres/w/f3903c2304ba9cffa52bd5acdbccb4c6/5978269"
const utamonogatari2 = "https://e.snmc.io/i/fullres/w/e53de5208afdbd66d694720145a46de2/7449404"

function SearchResult() {
    const subsectionTitles = ["Add Discography", "Add Top Tracks"];
    const subsection = <Subsection mainName="物語シリーズ" subsectionTitles={subsectionTitles}/>;

    return (
        <div className="search-searchresult main-component">
            <p className="main-title">Artists</p>
            <Entry
                mainName="物語シリーズ"
                imageUrl={utamonogatari}
                isSearchResult={true}
                hasSubsection={true}
                subsection={subsection}
            />
            <p className="main-title">Albums</p>
            <Entry
                mainName="歌物語2 -〈物語〉シリーズ主題歌集-"
                subName="物語シリーズ"
                imageUrl={utamonogatari2}
                isSearchResult={true}
                hasSubsection={false}
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
                className="search-searchbar main-component"
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