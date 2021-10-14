import { useState } from 'react';
import FoldButton from './FoldButton';
import DeleteButton from './DeleteButton';
import './Entry.css';

function Entry(props) {
    const { mainName,
            subName, 
            artistName,
            artistID,
            imageUrl, 
            isSearchResult, 
            hasSubsection, 
            subsection, 
            hasDeleteButton, 
            playlist, 
            setPlaylist, 
            setQuery, 
            setResultVisible } = props;
    const [ showSubsection, setShowSubsection ] = useState(false);

    const onClickShowSubsection = () => setShowSubsection(!showSubsection);
    const onClickAddAlbum = () => {
        let newPlaylist = {...playlist};
        if (artistID in playlist) {
            newPlaylist[artistID]['subsection'].add(`(album) ${mainName}`);
        } else {
            newPlaylist[artistID] = {
                name: artistName,
                imageUrl: imageUrl,
                subsection: new Set([`(album) ${mainName}`]),
            }
        };
        setPlaylist(newPlaylist);
        setResultVisible(false);
        setQuery("");
    };

    return (
        <div className="main-entry">
            <div className="main-entry-details">
                <div
                    className="main-entry-details-left"
                    onClick={isSearchResult && !hasSubsection ? onClickAddAlbum : onClickShowSubsection}>
                    <FoldButton 
                        isVisible={hasSubsection}
                        showSubsection={showSubsection} />
                    <img 
                        src={imageUrl}
                        alt=""
                        style={{width: '90px', height: '90px', padding: '5px'}}
                    ></img>
                    <div>
                        <h3>{mainName}</h3>
                        <p>{subName}</p>
                    </div>
                </div>
                {hasDeleteButton && 
                    <DeleteButton 
                        artistID={artistID}
                        playlist={playlist}
                        setPlaylist={setPlaylist} />}
            </div>
            {showSubsection && subsection}
        </div>
    );
}

export default Entry;