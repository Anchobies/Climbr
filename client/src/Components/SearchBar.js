import React, { useState }from 'react'
import { useHistory } from "react-router-dom"

const SearchBar = ({ setValue }) => {
    const history = useHistory()
    const [query, setQuery] = useState("")
    const [type, setType] = useState("users")

    const handleQuery = e => {
        setQuery(e.target.value)
     }

    return (
        <form
               onSubmit={e => {
                  e.preventDefault()
                  setQuery("");
                  setValue(null);
                  if (!query) {
                     history.push(`/search/${type}/All`)
                  } else {
                     history.push(`/search/${type}/${query.toLowerCase()}`)
                  }
               }}>
               <select
                  onChange={e => {
                     setType(e.target.value)
                  }}
                  className="searchInput">
                  <option value="users">Users</option>
                  <option value="gyms">Gyms</option>
                  <option value="problems">Problems</option>
               </select>
               &nbsp;
               <input
                  className="searchInput"
                  name="query"
                  value={query}
                  onChange={handleQuery}
                  type="text"
                  placeholder={type === "all" ? "Search Climbr" : (type === "users" ? "Search users..." : 
                  (type === "gyms" ? "Search gyms..." : "Search problems..."))}
               />
            </form>
    )
}

export default SearchBar;
