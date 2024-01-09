import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../features/UserDetailSlice'

export default function Navbar() {

    const count = useSelector((state) => state.app)
    const dispatch = useDispatch();

    const searchBox = useRef()

    const [showBox, setShowBox] = useState(false)

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchData(value);

        if (value.length > 0) {
            setShowBox(true);
        } else {
            setShowBox(false);
        }
    };
    const [searchData, setSearchData] = useState("");
    useEffect(() => {
        dispatch(searchUser(searchData));
    }, [searchData]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Phone Book</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Create User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/read">All Users({count.users.length})</Link>
                            </li>
                        </ul>
                        <form className="d-flex search-form" role="search">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                ref={searchBox}
                                onChange={handleSearch}
                            />
                            {
                                showBox && <div className={"dataBox"}>
                                    <ul className='searchList'>
                                        {count.users && count.users
                                            .filter((ele) => {
                                                return ele.name.toLowerCase().includes(searchData.toLowerCase());
                                            })
                                            .map((ele) => {
                                                return <li key={ele.id}>
                                                    <Link to={`/read/${ele.id}`}>{ele.name}</Link>
                                                    </li>;
                                            })}
                                    </ul>
                                </div>
                            }

                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
