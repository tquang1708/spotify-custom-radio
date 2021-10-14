import { useState } from 'react';
import './Submit.css';

function Submit(props) {
    const playlist = props.playlist;
    const [ duplicateChecked, setDuplicateChecked ] = useState(false);
    const onClickUpdateValue = () => setDuplicateChecked(!duplicateChecked);
    const onClickSubmit = () => console.log(playlist);

    return (
        <div className="submit">
            <div className="submit-checkbox">
                <input
                    type="checkbox"
                    checked={duplicateChecked}
                    onClick={onClickUpdateValue}
                />
                <div onClick={onClickUpdateValue}>Make Playlist Public?</div>
            </div>
            <div 
                className="submit-button main-component"
                onClick={onClickSubmit}>
                Submit
            </div>
        </div>
    );
}

export default Submit;