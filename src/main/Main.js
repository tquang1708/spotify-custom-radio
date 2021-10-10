import './Main.css';
import { useState } from 'react';

function SearchResultEntry() {
    return (
        <p>test</p>
    );
}

function SearchResult() {
    return (
        <div className="search-searchresult">
            <p className="search-searchresult-title">Artists</p>
            <SearchResultEntry />
            <SearchResultEntry />
            <p className="search-searchresult-title">Albums</p>
            <SearchResultEntry />
            <SearchResultEntry />
        </div>
    );
}

function Search() {
    const [query, setQuery] = useState("");
    const [focus, setFocus] = useState(false);

    return (
        <div className="search">
            <input
                className="search-searchbar"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            {query && focus && <SearchResult />}
        </div>
    );
}

function Playlist() {
    return (
        <div className="playlist">
            <p>Playlist</p>
        </div>
    );
}

function Submit() {
    return (
        <div className="submit">
            <p>Submit</p>
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