import DeleteButton from "./DeleteButton";

function PlaylistSubsection(props) {
    const { artistID,
            albumID,
            title,
	    isDiscography,
            playlist,
            setPlaylist } = props

    return (
        <div 
            className="main-entry-subsection-item">
            {title}
            <DeleteButton 
                artistID={artistID}
                albumID={albumID}
                isSubsection={true}
	    	isDiscography={isDiscography}
                playlist={playlist}
                setPlaylist={setPlaylist} />
        </div>
    );
}

export default PlaylistSubsection;
