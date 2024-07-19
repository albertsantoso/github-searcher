// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import UserCard from "./UserCard"
import RepositoryCard from "./RepositoryCard"
import { useLocation, useNavigate } from "react-router-dom"
import { useGithubSearch } from "../hooks/useGithubSearch"
import { resetResults, setPage } from "../redux/searchSlice"

const ResultList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const query = useSelector((state) => state.search.query)
    const type = useSelector((state) => state.search.type)
    const page = useSelector((state) => state.search.page)

    const queryParams = new URLSearchParams(location.search)

    const searchQueryParams = queryParams.get("query")
    const typeParams = queryParams.get("type")
    const pageParams = parseInt(queryParams.get("page"), 10)

    const { data = [], isFetching, error } = useGithubSearch(query, type, page)

    const renderContent = () => {
        if (data.length === 0) {
            return <h1>Search for the results</h1>
        }

        if (isFetching) {
            return <h1>LOADING...</h1>
        }

        if (error) {
            return <div>Error: {error.message}</div>
        }

        return data?.items?.map((item) => (type === "users" ? <UserCard key={item.id} user={item} /> : <RepositoryCard key={item.id} repository={item} />))
    }

    const handlePageChange = (newPage) => {
        if (newPage < 1) return
        navigate(`?query=${searchQueryParams}&type=${typeParams}&page=${newPage}`)
        dispatch(setPage(newPage))
    }

    useEffect(() => {
        if (!searchQueryParams && !typeParams && !pageParams) {
            dispatch(resetResults())
            navigate("/")
        }
    }, [searchQueryParams, typeParams, pageParams, dispatch, navigate])

    return (
        <section style={{ padding: "16px 0px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px" }}>
            {renderContent()}
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", marginTop: "16px" }}>
                <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                    Previous
                </button>
                {page && <span style={{ margin: "0 8px" }}>Page {page}</span>}
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </section>
    )
}

export default ResultList
