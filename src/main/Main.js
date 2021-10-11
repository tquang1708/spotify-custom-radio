import Search from './search/Search';
import './Main.css';

function Playlist() {
    return (
        <div className="playlist">
            <p>Playlist</p>
        </div>
    );
}

function Submit() {
    return (
        <div className="submit">
            <p>Submit</p>
        </div>
    );
}

function Main() {
    return (
        <div className="main">
            <Search />
            <Playlist />
            <Submit />
        </div>
    );
}

export default Main;