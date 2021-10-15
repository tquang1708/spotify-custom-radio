export default function handleTokenExpiry() {
    const accessTokenTimestamp = sessionStorage.getItem("access_token_timestamp");
    if (Date.now() - accessTokenTimestamp > 3300000) {
        window.sessionStorage.removeItem("authorized");
        window.sessionStorage.removeItem("access_token");
        window.sessionStorage.removeItem("access_token_timestamp");
        alert("Your login token has expired. Please login again.");
        window.location.reload()
    }
};