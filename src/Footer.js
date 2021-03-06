function Footer(props) {
    const { footerText, selfAdvertising } = props;

    let text;
    if (selfAdvertising) {
        const githubURL = "https://github.com/tquang1708/spotify-custom-radio/issues";
        text =
        <div>
            Created by Quang Tran, October 2021. Utilizing the Spotify API in developement mode, so only email addresses added through the dashboard can actually use the app. Forward all your bug reports and/or suggestions to <a href={githubURL}>here.</a>
        </div>
    } else {
        text = <div>{footerText}</div>;
    }

    return (
        <div
            style={{
                color: "var(--text-color-dim)",
                position: "fixed",
                zIndex: "-1",
                bottom: "5px",
                right: "5px",
                fontSize: "0.7em",
                textAlign: "right"
            }} >
            {text}
        </div>
    );
}

export default Footer;
