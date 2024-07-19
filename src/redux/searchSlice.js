import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        type: "users",
        page: 1,
        results: {},
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload
        },
        setType: (state, action) => {
            state.type = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setResults: (state, action) => {
            const { query, type, page, data } = action.payload
            if (!state.results[query]) {
                state.results[query] = {}
            }
            state.results[query][type] = {
                [page]: data,
            }
        },
        resetResults: (state) => {
            state.query = ""
            state.type = "users"
            state.page = 1
            state.results = {}
        },
    },
})

export const { setQuery, setType, setPage, setResults, resetResults } = searchSlice.actions

export default searchSlice.reducer
