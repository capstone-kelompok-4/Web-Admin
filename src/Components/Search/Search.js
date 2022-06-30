import React from 'react'
import SearchIcon from "../../Assets/Icons/search.svg";

const Search = ({className, placeholder, onChange}) => {
  return (
    <div className={className}>
      <img src={SearchIcon} alt="searchLogo" width="30px" height="30px"/>
      <input type="text" placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}

export default Search