import './Button.css';

function DeleteButton(props) {
    const {
        artistID,
        isSubsection,
        title,
        playlist,
        setPlaylist,
    } = props;

    const onClickDeleteItem = () => {
        let newPlaylist = {...playlist};
        console.log(playlist)
        console.log(setPlaylist)

        if (isSubsection) {
            const subsection = newPlaylist[artistID]["subsection"];
            subsection.delete(title);
            if (subsection.size === 0) {
                delete newPlaylist[artistID];
            };
        } else {
            delete newPlaylist[artistID];
        };

        setPlaylist(newPlaylist);
    };

    if (isSubsection) {
        return (
            <div
                className="main-button main-visible-button main-delete-button"
                onClick={onClickDeleteItem} >
                {"X"}
            </div>
        );
    } else {
        return (
            <div 
                className="main-button main-visible-button main-delete-button main-entry-details-delete-button"
                onClick={onClickDeleteItem} >
                {"X"}
            </div>
        );
    }
};

export default DeleteButton;