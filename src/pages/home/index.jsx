// eslint-disable-next-line no-unused-vars
import React from "react"

import Header from "../../components/Header"
import SearchBar from "../../components/SearchBar"
import ResultList from "../../components/ResultList"

const HomePage = () => {
    return (
        <main>
            <Header />
            <SearchBar />
            <ResultList />
        </main>
    )
}

export default HomePage
