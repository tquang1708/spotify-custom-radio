import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Main from './main/Main';
import Intro from './intro/Intro';
import Callback from './intro/Callback';
import Error from './intro/Error';

function App() {
    const [ hasError, setHasError ] = useState(false);
    const [ authorized, setAuthorized ] = useState(false);
    const authorizedSession = sessionStorage.getItem('authorized');

    return (
        <Switch>
            <Route exact path="/">
                {authorized || authorizedSession === "true" ? <Main /> : <Intro />}
            </Route>
            <Route path="/error">
                {hasError ? <Error /> : <Redirect to="/" />}
            </Route>
            <Route path="/callback">
                <Callback
                    setAuthorized={setAuthorized}
                    setHasError={setHasError}
                />
            </Route>
        </Switch>
    );
}

export default App;
