import UserInfo from './userinfo/UserInfo';
import Search from './search/Search';
import Playlist from './playlist/Playlist';
import Submit from './submit/Submit';
import './Main.css';

function Main(props) {
    return (
        <div className="main">
            <UserInfo />
            <Search />
            <Playlist />
            <Submit />
        </div>
    );
}

export default Main;