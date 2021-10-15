import { useState } from 'react';
import './Submit.css';

function Submit(props) {
    const playlist = props.playlist;
    const [ checked, setChecked ] = useState(false);
    const onClickUpdateValue = () => setChecked(!checked);

    console.log(playlist);

    const onClickSubmit = () => {
	if (Object.keys(playlist).length === 0) {
	    alert("Your playlist is currently empty. Nothing to be done for now.");
	} else {
	    const accessToken = window.sessionStorage.getItem("access_token");
            const getRequestOptions = {
		method: 'GET',
		headers: {
		    'Authorization': 'Bearer ' + accessToken,
		}
	    };
	    const postRequestOptions = {
		method: 'POST',
		headers: {
	            'Authorization': 'Bearer ' + accessToken,
		}
            }

	    let trackIDs = new Set([]);
	    Object.keys(playlist).forEach((artistID) => {
		if (playlist[artistID]["discography"]) {
		    // add all artist's albums
		} else {
	            if (playlist[artistID]["topTracks"]) {
			const fetchURL = new URL(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`);
			fetchURL.searchParams.append('market', 'from_token');

			fetch(fetchURL.href, getRequestOptions)
			    .then(response => response.json())
			    .then(data => {
				console.log(data);
			    })
			    .catch(error => {
				console.log(error);
			    });
		    }

		    // add all artist's albums
		    Object.keys(playlist[artistID]["albums"]).forEach((albumID) => {
			//
		    });
		}
	    });

	    // make the playlist
	}
    };

    return (
        <div className="submit">
            <div className="submit-checkbox">
                <input
                    type="checkbox"
                    checked={checked}
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
