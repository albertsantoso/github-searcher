// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import GithubMark from "../assets/github-mark.svg"
import RepoMark from "../assets/repos-mark.svg"

const UserCardContainer = styled.div`
    border: 1px solid #8c8c8c;
    border-radius: 8px;
    padding: 16px;
    display: flex;
`

const Avatar = styled.div`
    border-radius: 50%;
    border: 1px solid #8c8c8c;
    display: inline-block;
    margin-top: 4px;
    margin-right: 16px;
    overflow: hidden;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
`

const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
`

const Bio = styled.p`
    color: #636c76;
    font-size: 14px;
    margin: 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const NameLink = styled.a`
    text-decoration: none;
    color: #0969da;
    font-weight: 500;
    margin-right: 4px;

    &:hover {
        text-decoration: underline;
    }
`

const LoginLink = styled.a`
    text-decoration: none;
    color: ${(props) => (props.noName ? "#0969da" : "#636c76")};
    font-weight: ${(props) => (props.noName ? 500 : "normal")};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        text-decoration: underline;
    }
`

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 4px;
`

const InfoText = styled.p`
    color: #636c76;
    font-size: 12px;
    margin: 0;
`

const InfoItem = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
    }

    span {
        color: #636c76;
        font-size: 12px;
    }
`

const UserCard = ({ user }) => {
    const { avatar_url, login, html_url, name, bio, followers, public_repos, location } = user

    return (
        <UserCardContainer>
            <Avatar>
                <AvatarImg src={avatar_url} alt={`Avatar of ${login}`} />
            </Avatar>
            <div style={{ overflow: "hidden" }}>
                <div>
                    {name && <NameLink href={html_url}>{name}</NameLink>}
                    <LoginLink href={html_url} noName={!name}>
                        {login}
                    </LoginLink>
                </div>
                <Bio>{bio || "No bio available"}</Bio>
                <InfoContainer>
                    <InfoText>{location || "Anywhere"}</InfoText>
                    <span style={{ margin: "0px 6px" }}>·</span>
                    <InfoItem>
                        <img src={RepoMark} alt="Stars" />
                        <span>{public_repos}</span>
                    </InfoItem>
                    <span style={{ margin: "0px 6px" }}>·</span>
                    <InfoItem>
                        <img src={GithubMark} alt="Forks" />
                        <span>{followers}</span>
                    </InfoItem>
                </InfoContainer>
            </div>
        </UserCardContainer>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        name: PropTypes.string,
        bio: PropTypes.string,
        followers: PropTypes.number.isRequired,
        public_repos: PropTypes.number.isRequired,
        location: PropTypes.string,
    }).isRequired,
}

export default UserCard
