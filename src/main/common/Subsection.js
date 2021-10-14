import DeleteButton from "./DeleteButton";
import './Subsection.css';

function SubsectionItem(props) {
    const { artistID,
            artistName,
            artistUrl,
            title,
            hasDeleteButton,
            isSearchResult,
            playlist,
            setPlaylist,
            setQuery,
            setResultVisible } = props

    const onClickAddItem = () => {
        let newPlaylist = {...playlist};
        const playlistTitle = title.split(" ").slice(1).join(" ");

        if (artistID in playlist) {
            newPlaylist[artistID]['subsection'].add(`${playlistTitle}`);
        } else {
            newPlaylist[artistID] = {
                name: artistName,
                imageUrl: artistUrl,
                subsection: new Set([`${playlistTitle}`]),
            }
        };
        setPlaylist(newPlaylist);

        setResultVisible(false);
        setQuery("");
    }

    return (
        <div 
            className="main-entry-subsection-item"
            onClick={isSearchResult ? onClickAddItem : undefined}>
            {title}
            {hasDeleteButton &&
                <DeleteButton 
                    artistID={artistID}
                    isSubsection={true}
                    title={title}
                    playlist={playlist}
                    setPlaylist={setPlaylist} />}
        </div>
    );
}

function Subsection(props) {
    const { artistID,
            artistName,
            artistUrl,
            subsectionTitles,
            hasDeleteButton,
            isSearchResult,
            playlist,
            setPlaylist,
            setQuery,
            setResultVisible } = props

    const subsectionItems = [...subsectionTitles].map((title) =>
        <SubsectionItem 
            key={"search result subsection" + artistID + title}
            artistID={artistID}
            artistName={artistName}
            artistUrl={artistUrl}
            title={title}
            hasDeleteButton={hasDeleteButton}
            isSearchResult={isSearchResult}
            playlist={playlist}
            setPlaylist={setPlaylist}
            setQuery={setQuery}
            setResultVisible={setResultVisible}
        />
    );

    return (
        <div className="main-entry-subsection">
            {subsectionItems}
        </div>
    );
}

export default Subsection;