// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setQuery, setType } from "../redux/searchSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { debounce } from "lodash"
import { setPage } from "../redux/searchSlice"

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const query = new URLSearchParams(location.search).get("query") || ""
    const type = new URLSearchParams(location.search).get("type") || "users"
    const [inputValue, setInputValue] = useState(query)

    useEffect(() => {
        setInputValue(query)
    }, [query])

    const debouncedSearch = useCallback(
        debounce((value) => {
            dispatch(setQuery(value))
            dispatch(setPage(1))
            navigate(`?query=${value}&type=${type}&page=1`)
        }, 500),
        [dispatch, navigate, type] // dependencies for useCallback
    )

    const handleSearchChange = (e) => {
        const value = e.target.value
        setInputValue(value)
        debouncedSearch(value)
    }

    const handleTypeChange = (e) => {
        const newType = e.target.value
        dispatch(setType(newType))
        dispatch(setPage(1))
        navigate(`?query=${inputValue}&type=${newType}&page=1`)
    }

    const inputStyle = { width: "40%", padding: "8px", fontSize: "14px", borderRadius: "8px", border: "1px solid #8C8C8C", marginRight: "8px" }
    const selectStyle = { padding: "8px", fontSize: "14px", borderRadius: "8px", border: "1px solid #8C8C8C" }

    return (
        <section>
            <input type="text" placeholder="Type to search users or repositories" value={inputValue} onChange={handleSearchChange} style={inputStyle} />
            <select name="filter" id="filter" value={type} onChange={handleTypeChange} style={selectStyle}>
                <option value="users">Users</option>
                <option value="repositories">Repositories</option>
            </select>
        </section>
    )
}

export default SearchBar
