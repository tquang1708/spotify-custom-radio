# Spotify Custom Radio

Custom playlist generator for self-made "radio station" through Spotify API. The app allows user to create playlists through adding artists' entire discography, top tracks or specific albums.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local Build

### I) Create options.js

0) Create a new file `src/options.js` with these default parameters:

```javascript
export const options = {
    "client_id": "",
    "redirect_uri": "http://localhost:3000/callback",
    "playlist_description": "Your custom radio station, created from <insert url here>",
    "enable_rate_limit": true,
    "entry_count_limit": 50,
    "album_count_limit": 200,
}
```

### I) Set up Spotify Developer app and callback

1) Go to the Spotify Developer dashboard at https://developer.spotify.com/dashboard/, then Log In with your Spotify account.

2) On the Dashboard, click "Create An App", then name/describe it however you prefer. Remember to agree with Spotify's ToS.

3) On the app's overview screen, copy the app's Client ID, then put it in the `client_id` field in the `src/options.js` file.

4) Still on the app's overview screen, click "Edit Settings", then in the "Redirect URIs" field, type `http://localhost:3000/callback`, click "Add", then "Save".

### II) Launch the app

5) Run `npm install` to install all dependencies, then `npm start` in the root directory, or yarn, depending on the day of the week (in other words I am not sure of the differences myself). Aside from React and React Router, this app doesn't have any other dependencies.

6) The app should now be available for usage at `http://localhost:3000`

7) There are settings you could change in the `src/options.js` file.

    - `client_id`: This is your app's client ID, as set in earlier steps.
    - `redirect_uri`: The URI Spotify redirects to after authorizing the user. I am currently using the `/callback` route to handle callback.
    - `playlist_description`: The default description given to playlists created through this app.
    - `enable_rate_limit`: Enables whether the app will reject requests to create playlists that are too large.
    - `entry_count_limit`: If rate limiting is enabled, prevents the user from creating playlists with more than 50 separate artist counts.
    - `album_count_limit`: If rate limiting is enabled, prevents the user from creating playlists with more than 200 albums in total,

## Notes and Disclaimer

- There currently is no testing on this app, and I do not plan to write tests for the app at least for the foreseeable future. I definitely would look into it if others add more features to the app, and test coverage becomes necessary, but for now I do not plan to add any extra feature to the app.

- The "Discography" option only includes albums, EPs and singles from the artist. This does not include compilations or other releases that an artist appears on, as including those will inflate the album count by too many.