import './Button.css';

function FoldButton(props) {
    const { isVisible, showSubsection } = props;

    if (isVisible) {
        return (
            <div 
                className="main-button main-visible-button">
                {showSubsection ? "—" : "+"}
            </div>
        );
    } else {
        return (<div className="main-button"></div>);
    };
}

export default FoldButton;