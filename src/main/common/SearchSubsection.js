function SearchSubsection(props) {
    const { playlist,
            artistID,
            artistName,
            artistUrl,
            isDiscography,
            setPlaylist,
            setResultVisible,
            setQuery } = props;

    const onClickAddItem = () => {
        let newPlaylist = {...playlist};

        if (artistID in playlist) {
            if (isDiscography) {
                newPlaylist[artistID]['discography'] = true;
                newPlaylist[artistID]['topTracks'] = false;
                newPlaylist[artistID]['albums'] = new Set([]);
            } else {
                if (newPlaylist[artistID]['discography']) {
                    alert("You already added this artist's discography");
                } else {
                    newPlaylist[artistID]['topTracks'] = true;
                }
            }
        } else {
            newPlaylist[artistID] = {
                name: artistName,
                imageUrl: artistUrl,
                discography: isDiscography,
                topTracks: !isDiscography,
                albums: {},
            }
        };
        setPlaylist(newPlaylist);

        setResultVisible(false);
        setQuery("");
    }

    return (
        <div 
            className="main-entry-subsection-item"
            onClick={onClickAddItem}>
            {isDiscography ? "Add Discography" : "Add Top Tracks"}
        </div>
    );   
}

export default SearchSubsection;
