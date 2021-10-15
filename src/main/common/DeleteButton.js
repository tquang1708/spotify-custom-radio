import './Button.css';

function DeleteButton(props) {
    const {
        artistID,
	albumID,
        isSubsection,
	isDiscography,
        playlist,
        setPlaylist,
    } = props;

    const onClickDeleteItem = () => {
        let newPlaylist = {...playlist};

        if (!isDiscography && isSubsection) {
	    if (albumID) {
		delete newPlaylist[artistID]["albums"][albumID];
	    } else {
		newPlaylist[artistID]["topTracks"] = false;
	    };

	    if (!(newPlaylist[artistID]["topTracks"]) 
		    && Object.keys(newPlaylist[artistID]["albums"]).length === 0) {
                delete newPlaylist[artistID];
	    };
        } else {
            delete newPlaylist[artistID];
        };

        setPlaylist(newPlaylist);
    };

    return (
        <div
            className="main-button main-visible-button main-delete-button"
            onClick={onClickDeleteItem} >
            {"X"}
        </div>
    );
};

export default DeleteButton;
