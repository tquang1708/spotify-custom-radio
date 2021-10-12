import { useState } from 'react';
import FoldButton from './FoldButton';
import DeleteButton from './DeleteButton';

function Entry(props) {
    const { mainName, subName, imageUrl, hasSubsection, subsection, hasDeleteButton } = props;
    const [ showSubsection, setShowSubsection ] = useState(false);

    return (
        <div className="main-entry">
            <div className="main-entry-details">
                <div className="main-entry-details-left">
                    <FoldButton 
                        isVisible={hasSubsection}
                        showSubsection={showSubsection}
                        setShowSubsection={setShowSubsection} />
                    <img 
                        src={imageUrl}
                        alt={mainName}
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