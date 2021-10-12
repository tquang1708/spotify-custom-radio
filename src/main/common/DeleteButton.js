function DeleteButton(props) {
    const isSubsection = props.isSubsection;

    if (isSubsection) {
        return (
            <div className="main-button main-visible-button main-delete-button">
                {"X"}
            </div>
        );
    } else {
        return (
            <div className="main-button main-visible-button main-delete-button main-entry-details-delete-button">
                {"X"}
            </div>
        );
    }
};

export default DeleteButton;