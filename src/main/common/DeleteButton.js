import './Button.css';

function DeleteButton(props) {
    const {
        artistID,
        isSubsection,
        playlist,
        setPlaylist,
    } = props;

    const onClickDeleteItem = () => {
        let newPlaylist = {...playlist};

        if (isSubsection) {
            const subsection = newPlaylist[artistID]["subsection"];
            subsection.delete(title);
            if (subsection.size === 0) {
                delete newPlaylist[artistID];
            } else {
                // not checking on discography since it cannot appear here
                if (title === "Top Tracks") {
                    newPlaylist[artistID]["topTracks"] = false;
                } else {
                    // fix
                    newPlaylist[artistID]["albums"].delete(albumID);
                }
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