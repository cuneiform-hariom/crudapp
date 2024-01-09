import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Navbar from './Navbar';
import { deleteUser } from '../features/UserDetailSlice'
import { useNavigate } from 'react-router-dom'


export default function SingleUser() {
    const allUsers = useSelector((state) => state.app.users)
    const params = useParams();
    const userId = params.id
    const singleUser = allUsers.filter((data) => data.id === userId)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className='container w-50 m-auto'>
            <h2 className='my-4'>User Data</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name='name' className="form-control" readonly value={singleUser[0].name} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name='email' className="form-control" readonly value={singleUser[0].email} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input type="text" name='age' className="form-control" readonly value={singleUser[0].age} />
                    </div>
                    <div className="d-flex gap-3 mb-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="male"
                                id="male"
                                checked={singleUser[0].gender === 'male'}
                            />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="female"
                                id="female"
                                checked={singleUser[0].gender === 'female'}
                            />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to={`/update/${singleUser[0].id}`} className="btn btn-primary">Edit</Link>
                        <button className='btn btn-sm btn-danger' type="button" onClick={() => [dispatch(deleteUser(singleUser[0].id)), navigate('/read')]}>Delete</button>
                    </div>
                </form>
            </div>
        </>
    )
}
