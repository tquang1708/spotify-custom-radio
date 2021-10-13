import { useState } from 'react';
import SearchResult from './SearchResult';
import './Search.css';

function Search(props) {
    const { playlist, setPlaylist } = props;

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
            {query && focus && <SearchResult query={query.trim()}  playlist={playlist} setPlaylist={setPlaylist} />}
            {/* {<SearchResult query={query} />} */}
        </div>
    );
}

export default Search;