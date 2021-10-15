function Footer(props) {
    const footerText = props.footerText;

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
            }}>
            {footerText}
        </div>
    );
}

export default Footer;