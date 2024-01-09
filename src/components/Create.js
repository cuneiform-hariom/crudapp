import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../features/UserDetailSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function Create() {

    const [users, setUsers] = useState({})

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const getUserData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("users: ", users)
        dispatch(createUser(users))
        navigate('/read')
    }
    console.log(users)

    return (
        <>
        <Navbar/>
            <div className='container w-50 m-auto'>
                <h2 className='my-4'>Enter User Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name='name' className="form-control" onChange={getUserData} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name='email' className="form-control" onChange={getUserData} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input type="text" name='age' className="form-control" onChange={getUserData} required/>
                    </div>
                    <div className="d-flex gap-3 mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="male" id="male" onChange={getUserData} />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="female" id="female" onChange={getUserData} />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
