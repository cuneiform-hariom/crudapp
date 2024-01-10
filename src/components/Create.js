import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../features/UserDetailSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import pimage from '../assets/profile.webp'

export default function Create() {

    const [users, setUsers] = useState({})

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const getUserData = (e) => {
        if (e.target.type === 'file') {
            handleImageChange(e);
        } else {
            setUsers({ ...users, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createUser(users))
        navigate('/read')
    }
    const [profileImage, setProfileImage] = useState(pimage)
    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];
        setProfileImage(URL.createObjectURL(selectedFile));
        setUsers({ ...users, image: URL.createObjectURL(selectedFile) });
    };

    return (
        <>
            <Navbar />
            <div className='container w-50 m-auto'>
                <h2 className='my-4'>Enter User Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name='name' className="form-control" onChange={getUserData} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name='email' className="form-control" onChange={getUserData} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" name='phone' className="form-control" onChange={getUserData} required />
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
                        </div>
                        <div className="col-md-5">
                            <div className="p_image" style={{ backgroundImage: `url(${profileImage})` }}>
                                <label htmlFor="image"></label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept=".jpg, .jpeg, .png, webp"
                                    className='d-none'
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </>
    )
}
