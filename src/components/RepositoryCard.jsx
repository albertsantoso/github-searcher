// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import GithubMark from "../assets/github-mark.svg"
import { formatDistanceToNow } from "date-fns"

const RepositoryCardContainer = styled.div`
    border: 1px solid #8c8c8c;
    border-radius: 8px;
    padding: 16px;
`

const RepoLink = styled.a`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    text-decoration: none;
    color: #0969da;

    &:hover {
        text-decoration: underline;
    }
`

const OwnerAvatar = styled.div`
    border-radius: 8px;
    border: 1px solid #8c8c8c;
    display: inline-block;
    margin-right: 8px;
    overflow: hidden;
`

const AvatarImg = styled.img`
    width: 28px;
    height: 28px;
`

const Description = styled.p`
    font-size: 14px;
    color: #8c8c8c;
    margin-bottom: 8px;
`

const Tag = styled.a`
    color: #0969da;
    background-color: #ddf4ff;
    padding: 2px 10px;
    text-decoration: none;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
`

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
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

const RepositoryCard = ({ repository }) => {
    const { owner, name, html_url, description, language, stargazers_count, updated_at, topics } = repository

    const updateAgo = formatDistanceToNow(new Date(updated_at), { addSuffix: true })

    const displayedTopics = topics ? topics.slice(0, 5) : []

    return (
        <RepositoryCardContainer>
            <RepoLink href={html_url}>
                <OwnerAvatar>
                    <AvatarImg src={owner.avatar_url} alt={`Avatar of ${owner.login}`} />
                </OwnerAvatar>
                <p>
                    {owner.login}/<b>{name}</b>
                </p>
            </RepoLink>
            <Description>{description}</Description>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                {displayedTopics.map((topic, index) => (
                    <div key={index}>
                        <Tag href={`https://github.com/topics/${topic}`}>{topic}</Tag>
                    </div>
                ))}
            </div>
            <InfoContainer>
                <InfoText>{language}</InfoText>
                <span>·</span>
                <InfoItem>
                    <img src={GithubMark} alt="Stars" />
                    <span>{stargazers_count.toLocaleString()}</span>
                </InfoItem>
                <span>·</span>
                <InfoItem>
                    <img src={GithubMark} alt="Forks" />
                    <span>{stargazers_count.toLocaleString()}</span>
                </InfoItem>
                <span>·</span>
                <InfoText>Updated {updateAgo}</InfoText>
            </InfoContainer>
        </RepositoryCardContainer>
    )
}

RepositoryCard.propTypes = {
    repository: PropTypes.shape({
        owner: PropTypes.shape({
            avatar_url: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
        }).isRequired,
        name: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        description: PropTypes.string,
        language: PropTypes.string,
        stargazers_count: PropTypes.number.isRequired,
        updated_at: PropTypes.string.isRequired,
        topics: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
}

export default RepositoryCard
