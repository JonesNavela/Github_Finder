import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = 'https://api.github.com'

export const GithubProvider = ({ children }) => {
  // global context for UserResults
  const initialState = {
    users: [],
    loading: true
  }

  const [ state, dispatch ] = useReducer(githubReducer, initialState)

  // set loaiding finction since we will use this in more than 1 place
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users`)

    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data
    })
  }

  

  return <GithubContext.Provider value={{
    users: state.users,
    fetchUsers,
  }}>
    {children}
  </GithubContext.Provider>

}

export default GithubContext