// src/redux/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import { setupListeners } from "@reduxjs/toolkit/query/react"

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
    },
})

export const { setQuery, setType, setResults, setPage } = searchSlice.actions

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    search: searchSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
