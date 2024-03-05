import React from 'react';
import './style.css';
const SearchComponents = ({searchValue, setSearchValue, typeValue, setTypeValue, filterData})=>{
    
    const changeSearchHandle = (e)=>{
        setSearchValue(e.target.value)
    }
    const chagneValueHandler = (e)=>{
        setTypeValue(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        filterData()
    }
    return (
        <>
            <div className='searchBox'>
                <div className="container">
                    <h6>Type movie name to find it</h6>
                    <form onSubmit={handleSubmit}>
                        <input type="search" value={searchValue} onChange={changeSearchHandle} placeholder="Search here" />
                        <input type="submit"  value="FIND" /><input type="button" onClick={()=>{ window.location.reload()}} value="All" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchComponents;