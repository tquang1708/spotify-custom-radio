import DeleteButton from "./DeleteButton";
import './Subsection.css';

function Subsection(props) {
    const { id, subsectionTitles, hasDeleteButton, isSearchResult, setQuery, setResultVisible } = props
    const onClickSetResultVisible = () => {
        setQuery("");
        setResultVisible(false);
    }

    const subsectionItems = subsectionTitles.map((title) =>
        <div 
            key={id + title}
            className="main-entry-subsection-item"
            onClick={isSearchResult ? onClickSetResultVisible : undefined}>
            {title}
            {hasDeleteButton && <DeleteButton isSubsection={true} />}
        </div>
    );

    return (
        <div className="main-entry-subsection">
            {subsectionItems}
        </div>
    );
}

export default Subsection;