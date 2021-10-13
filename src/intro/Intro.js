import './Intro.css';
import { authorize } from './authorize';

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
    const authorizeURL = new URL(`https://accounts.spotify.com/authorize`);
    authorizeURL.searchParams.append('client_id', authorize['client_id']);
    authorizeURL.searchParams.append('redirect_uri', authorize['redirect_uri']);
    authorizeURL.searchParams.append('response_type', 'token');
    authorizeURL.searchParams.append('state', spotifyState);
    authorizeURL.searchParams.append('scope', authorize['scope']);

    sessionStorage.setItem('spt_auth_state', spotifyState);

    return (
        <div className="main-title intro">
            <a href={authorizeURL.href}>
                Login to Spotify
            </a>
            &nbsp;to begin
        </div>
    );
}

export default Intro;