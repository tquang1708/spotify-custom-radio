import DeleteButton from "./DeleteButton";
import './Subsection.css';

function Subsection(props) {
    const { mainName, subsectionTitles, hasDeleteButton } = props
    const subsectionItems = subsectionTitles.map((title) =>
        <div key={mainName + title} className="main-entry-subsection-item">
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