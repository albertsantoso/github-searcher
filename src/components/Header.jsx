// eslint-disable-next-line no-unused-vars
import React from "react"
import GithubLogo from "../assets/github-mark.svg"

const Header = () => {
    return (
        <section style={{ display: "flex", alignItems: "center", gap: "8px", padding: "16px 0px", marginBottom: "16px" }}>
            <img src={GithubLogo} alt="Github Mark" style={{ width: "54px" }} />
            <div>
                <h1 style={{ fontSize: "19px", lineHeight: "24px" }}>Github Searcher</h1>
                <p style={{ fontSize: "14px", color: "#8C8C8C" }}>Search users or repositories below</p>
            </div>
        </section>
    )
}

export default Header
