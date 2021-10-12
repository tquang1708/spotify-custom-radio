import Search from './search/Search';
import Playlist from './playlist/Playlist';
import Submit from './submit/Submit';
import './Main.css';

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