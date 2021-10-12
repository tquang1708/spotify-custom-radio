import './Submit.css';

function Submit() {
    return (
        <div className="submit">
            <div className="submit-duplicate">
                <input type="checkbox"/>
                <div>Include Duplicate?</div>
            </div>
            <div className="submit-button main-component">Submit</div>
        </div>
    );
}

export default Submit;