import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className="main-title intro">
            An error occurred. Please try to <Link to="/">login again.</Link>
        </div>
    );
}

export default Error;