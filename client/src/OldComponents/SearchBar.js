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
                  <option value="hives">Hives</option>
               </select>
               &nbsp;
               <input
                  className="searchInput"
                  name="query"
                  value={query}
                  onChange={handleQuery}
                  type="text"
                  placeholder={type === "all" ? "Search HiveFive" : ("users" ? "Search users..." : type === "Search hives...")}
               />
            </form>
    )
}

export default SearchBar;
