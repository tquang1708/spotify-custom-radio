import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Callback(props) {
    const { setHasError, setAuthorized } = props;

    const response = new URLSearchParams(window.location.hash.substring(2));

    const spotifyState = sessionStorage.getItem("spt_auth_state");
    const access_token = response.get("access_token");
    const error = response.get("error");
    const responseState = response.get("state");

    const valid = access_token && (spotifyState === responseState);
    // const valid = false;

    useEffect (() => {
        if (valid) {
            sessionStorage.setItem("authorized", "true");
            sessionStorage.setItem("access_token", access_token);
            sessionStorage.setItem("access_token_timestamp", Date.now());
            sessionStorage.removeItem("spt_auth_state");
            setAuthorized(true);
        } else {
            console.log(error);
            setHasError(true);
        }
    });

    if (valid) {
        return <Redirect to="/"/>
    } else {
        return <Redirect to="/error/"/>
    };
};

export default Callback;