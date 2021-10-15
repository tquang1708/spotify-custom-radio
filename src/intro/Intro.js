import Footer from '../Footer';
import '../App.css';
import { options } from '../options';

// taken from https://github.com/spotify/web-api-auth-examples/blob/master/implicit_grant/public/index.html
function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    };

    return text;
};

function Intro() {
    const spotifyState = generateRandomString(16);
    const scope = "playlist-modify-private playlist-modify-public user-read-private";

    const authorizeURL = new URL(`https://accounts.spotify.com/authorize`);
    authorizeURL.searchParams.set('client_id', options['client_id']);
    authorizeURL.searchParams.set('redirect_uri', options['redirect_uri']);
    authorizeURL.searchParams.set('response_type', 'token');
    authorizeURL.searchParams.set('state', spotifyState);
    authorizeURL.searchParams.set('scope', scope);

    sessionStorage.setItem('spt_auth_state', spotifyState);

    return (
        <div className="center-text">
            <div className="main-title ">
                <a href={authorizeURL.href}>
                    Login to Spotify
                </a>&nbsp;to begin
            </div>
            <Footer selfAdvertising={true} />
        </div>
    );
}

export default Intro;