import { useState, useEffect } from 'react';
import handleTokenExpiry from '../HandleTokenExpiry';
import Entry from '../common/Entry';
import Subsection from '../common/Subsection';

function SearchResult(props) {
    const { query,
            setQuery, 
            playlist, 
            setPlaylist,
            setResultVisible } = props;
    const [ artistResults, setArtistResults ] = useState([]);
    const [ albumResults, setAlbumResults ] = useState([]);
    const [ offsetArtist, setOffsetArtist ] = useState(0);
    const [ offsetAlbum, setOffsetAlbum ] = useState(0);

    useEffect(() => {
        handleTokenExpiry();

        const accessToken = window.sessionStorage.getItem("access_token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        };
        const fetchURL = new URL('https://api.spotify.com/v1/search');
        fetchURL.searchParams.set('q', query);
        fetchURL.searchParams.set('market', 'from_token');
        fetchURL.searchParams.set('type', 'artist,album');

        fetch(fetchURL.href, requestOptions)
            .then(response => response.json())
            .then(data => {
                setArtistResults(data?.artists?.items);
                setAlbumResults(data?.albums?.items);
            })
            .catch(error => {
                console.log(error);
            })

        setOffsetArtist(0);
        setOffsetAlbum(0);

        return () => {
            setArtistResults([]);
            setAlbumResults([]);
        }
    }, [ query ]);

    const limitArtist = artistResults ? artistResults.length : 0;
    const limitAlbum = albumResults ? albumResults.length : 0;

    const artistItems = artistResults?.slice(offsetArtist, offsetArtist + 5).map((artist) => 
        <Entry
            key={"search result" + artist["id"]}
            mainName={artist["name"]}
            subName={artist["genres"].map((g) => g.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ')}
            artistID={artist["id"]}
            imageUrl={artist.images?.at(-1)?.url}
            isSearchResult={true}
            hasSubsection={true}
            subsection={<Subsection
                artistID={artist["id"]}
                artistName={artist["name"]}
                artistUrl={artist.images?.at(-1)?.url}
                isSearchResult={true}
                playlist={playlist}
                setPlaylist={setPlaylist}
                setQuery={setQuery}
                setResultVisible={setResultVisible} />}
            playlist={playlist}
            setPlaylist={setPlaylist}
            setQuery={setQuery}
        />
    );
    const albumItems = albumResults?.slice(offsetAlbum, offsetAlbum + 5).map((album) => 
        <Entry
            key={"search result" + album["id"]}
            artistName={album.artists?.at(0).name}
            artistID={album.artists?.at(0).id}
            albumID={album["id"]}
            mainName={album["name"]}
            subName={album["artists"].map((a) => a["name"]).join(', ')}
            imageUrl={album.images?.at(0)?.url}
            isSearchResult={true}
            hasSubsection={false}
            playlist={playlist}
            setPlaylist={setPlaylist}
            setResultVisible={setResultVisible}
            setQuery={setQuery}
        />
    );

    const onClickDecreaseOffsetArtist = () => setOffsetArtist(offsetArtist - 5);
    const onClickIncreaseOffsetArtist = () => setOffsetArtist(offsetArtist + 5);
    const onClickDecreaseOffsetAlbum = () => setOffsetAlbum(offsetAlbum - 5);
    const onClickIncreaseOffsetAlbum = () => setOffsetAlbum(offsetAlbum + 5);
    const onMouseDownPreventDefault = (e) => e.preventDefault();

    return (
        <div className="search-searchresult main-component">
            <p className="main-title">Artists</p>
            {artistItems && offsetArtist > 0 &&
                <div 
                    className="main-entry-details search-scroll-buttons"
                    onClick={onClickDecreaseOffsetArtist}
                    onMouseDown={onMouseDownPreventDefault}>
                    Previous...
                </div>}
            {artistItems}
            {artistItems && offsetArtist + 5 < limitArtist &&
                <div 
                    className="main-entry-details search-scroll-buttons"
                    onClick={onClickIncreaseOffsetArtist}
                    onMouseDown={onMouseDownPreventDefault}>
                Next...
                </div>}
            <p className="main-title">Albums</p>
            {offsetAlbum > 0 &&
                <div 
                    className="main-entry-details search-scroll-buttons"
                    onClick={onClickDecreaseOffsetAlbum}
                    onMouseDown={onMouseDownPreventDefault}>
                    Previous...
                </div>}
            {albumItems}
            {albumItems && offsetAlbum + 5 < limitAlbum &&
                <div 
                    className="main-entry-details search-scroll-buttons"
                    onClick={onClickIncreaseOffsetAlbum}
                    onMouseDown={onMouseDownPreventDefault}>
                    Next...
                </div>}
        </div>
    );
}

export default SearchResult;
