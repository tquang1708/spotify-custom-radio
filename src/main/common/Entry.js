import { useState } from 'react';
import FoldButton from './FoldButton';
import DeleteButton from './DeleteButton';
import './Entry.css';

function Entry(props) {
    const { mainName, subName, imageUrl, isSearchResult, hasSubsection, subsection, hasDeleteButton } = props;
    const [ showSubsection, setShowSubsection ] = useState(false);

    const onClickShowSubsection = () => setShowSubsection(!showSubsection);
    const onMouseDownPreventDefault = (e) => e.preventDefault();

    return (
        <div className="main-entry">
            <div className="main-entry-details">
                <div
                    className="main-entry-details-left"
                    onMouseDown={isSearchResult && hasSubsection ? onMouseDownPreventDefault : undefined}
                    onClick={hasSubsection ? onClickShowSubsection : undefined}>
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