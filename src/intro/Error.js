import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className="main-title" style={{alignSelf: "center"}}>
            An error occurred. Please try to <Link to="/" style={{textDecoration: "none"}} >log in again</Link>.
        </div>
    );
}

export default Error;