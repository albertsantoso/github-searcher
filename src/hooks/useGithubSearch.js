import { useQuery } from "@tanstack/react-query"
import { Octokit } from "octokit"
import { useDispatch, useSelector } from "react-redux"
import { setResults } from "../redux/searchSlice"

const octokit = new Octokit()

const queryGetGithubSearch = "get-github-search"

const fetchGithubSearch = async ({ queryKey }) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const [_, query, type, page] = queryKey

        const perPage = 12
        const pageNumber = page || 1

        const { data } = await octokit.request(`GET /search/${type}`, {
            q: query,
            per_page: perPage,
            page: pageNumber,
        })

        let detailedItems = []

        if (type === "users") {
            // Fetch detailed user data
            const detailedUserPromises = data.items.map(async (item) => {
                const userResponse = await octokit.request(`GET /users/${item.login}`)
                return userResponse.data
            })
            detailedItems = await Promise.all(detailedUserPromises)
        } else if (type === "repositories") {
            // Fetch detailed repository data
            const detailedRepoPromises = data.items.map(async (item) => {
                const repoResponse = await octokit.request(`GET /repos/${item.full_name}`)
                return repoResponse.data
            })
            detailedItems = await Promise.all(detailedRepoPromises)
        }

        return { items: detailedItems, totalCount: data.total_count } || []
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const useGithubSearch = (query, type, page) => {
    const dispatch = useDispatch()
    const results = useSelector((state) => state.search.results)

    return useQuery({
        queryKey: [queryGetGithubSearch, query, type, page],
        queryFn: fetchGithubSearch,
        enabled: !!query,
        initialData: results,
        onSuccess: (data) => {
            dispatch(setResults({ query, type, page, data }))
        },
        onError: (error) => {
            console.error("Query Error:", error)
        },
    })
}
