import { useState, useEffect } from 'react';
import Entry from '../common/Entry';
import './Search.css';

import Subsection from '../common/Subsection';

function SearchResult(props) {
    const query = props.query.trim();
    const [ artistResults, setArtistResults ] = useState([]);
    const [ albumResults, setAlbumResults ] = useState([]);

    useEffect(() => {
        const accessToken = window.sessionStorage.getItem("access_token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        };
        const fetchURL = new URL('https://api.spotify.com/v1/search');
        fetchURL.searchParams.append('q', query);
        fetchURL.searchParams.append('market', 'from_token');
        fetchURL.searchParams.append('limit', '5');
        fetchURL.searchParams.append('type', 'artist,album');

        fetch(fetchURL.href, requestOptions)
            .then(response => response.json())
            .then(data => {
                setArtistResults(data["artists"]["items"]);
                setAlbumResults(data["albums"]["items"]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [query]);

    const subsectionTitles = ["Add Discography", "Add Top Tracks"];
    const artistItems = artistResults.map((artist) => 
        <Entry
            mainName={artist["name"]}
            imageUrl={artist.images?.at(-1)?.url}
            isSearchResult={true}
            hasSubsection={true}
            subsection={<Subsection mainName={artist["name"]} subsectionTitles={subsectionTitles}/>}
        />
    );
    const albumItems = albumResults.map((album) => 
        <Entry
            mainName={album["name"]}
            subName={album["artists"].map((at) => at["name"]).join(', ')}
            imageUrl={album.images?.at(-1)?.url}
            isSearchResult={true}
            hasSubsection={false}
        />
    );

    return (
        <div className="search-searchresult main-component">
            <p className="main-title">Artists</p>
            {artistItems}
            <p className="main-title">Albums</p>
            {albumItems}
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
            {query && focus && <SearchResult query={query} />}
            {/* {<SearchResult query={query} />} */}
        </div>
    );
}

export default Search;