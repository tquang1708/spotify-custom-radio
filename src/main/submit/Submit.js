import { useState } from 'react';
import './Submit.css';

function Submit() {
    const [ duplicateChecked, setDuplicateChecked ] = useState(false);
    const onClickUpdateValue = () => setDuplicateChecked(!duplicateChecked);

    return (
        <div className="submit">
            <div className="submit-duplicate">
                <input
                    type="checkbox"
                    checked={duplicateChecked}
                    onClick={onClickUpdateValue}
                />
                <div onClick={onClickUpdateValue}>Include Duplicate?</div>
            </div>
            <div className="submit-button main-component">Submit</div>
        </div>
    );
}

export default Submit;