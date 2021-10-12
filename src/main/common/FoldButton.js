import './Button.css';

function FoldButton(props) {
    const { isVisible, showSubsection, setShowSubsection } = props;
    const onClickShowSubsection = () => setShowSubsection(!showSubsection);
    const onMouseDownPreventDefault = (e) => e.preventDefault();

    if (isVisible) {
        return (
            <div 
                className="main-button main-visible-button"
                onClick={onClickShowSubsection}
                onMouseDown={onMouseDownPreventDefault}>
                {showSubsection ? "—" : "+"}
            </div>
        );
    } else {
        return (<div className="main-button"></div>);
    };
}

export default FoldButton;