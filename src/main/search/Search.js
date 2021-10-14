import { useState, useEffect } from 'react';
import useVisibleComponent from './useVisibleComponent';
import SearchResult from './SearchResult';
import './Search.css';

function Search(props) {
    const { playlist, setPlaylist } = props;

    const [ ref, visible, setResultVisible ] = useVisibleComponent(false);
    const [ query, setQuery ] = useState("");

    useEffect(() => {
        if (query) {
            setResultVisible(true);
        } else {
            setResultVisible(false);
        }
    }, [ query, setResultVisible ]);

    const onChangeSetQuery = e => setQuery(e.target.value);
    const onFocusSetVisible = () => setResultVisible(true);

    return (
        <div ref={ref}>
            <div className="search">
                <input
                    className="search-searchbar main-component"
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={onChangeSetQuery}
                    onFocus={onFocusSetVisible}
                />
                {query && visible &&
                    <SearchResult
                        query={query.trim()}
                        setQuery={setQuery}
                        playlist={playlist}
                        setPlaylist={setPlaylist}
                        setResultVisible={setResultVisible}
                    />
                }
            </div>
        </div>
    );
}

export default Search;