import { useState } from 'react';
import FoldButton from './FoldButton';
import DeleteButton from './DeleteButton';
import './Entry.css';

function Entry(props) {
    const { mainName,
            subName, 
            artist,
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
        const artistID = artist.id;
        const artistName = artist.name;

        let newPlaylist = {...playlist};
        if (artistID in playlist) {
            let prevSubsection = newPlaylist[artistID]['subsection'];
            const title = `(album) ${mainName}`;
            if (!(prevSubsection.includes(title))) {
                prevSubsection.push(`${title}`);
            }
        } else {
            newPlaylist[artistID] = {
                name: artistName,
                imageUrl: imageUrl,
                subsection: [`(album) ${mainName}`],
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
                {hasDeleteButton && <DeleteButton />}
            </div>
            {showSubsection && subsection}
        </div>
    );
}

export default Entry;