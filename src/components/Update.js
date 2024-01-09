import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../features/UserDetailSlice';
import Navbar from './Navbar';

export default function Update() {
    const { id } = useParams();
    console.log('params: ', id);
    const [updateData, setUpdateData] = useState()
    const { users, loading } = useSelector((state) => state.app)
    useEffect(() => {
        if (id) {
            const singleData = users.filter((data) => data.id === id)
            setUpdateData(singleData[0])
        }
    }, [])
    console.log("updateData: ", updateData)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const newData = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData));
        navigate("/read");
    };

    return (
        <>
        <Navbar/>
            <div className='container w-50 m-auto'>
                <h2 className='my-4'>Update User Data</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name='name' className="form-control" value={updateData && updateData.name} onChange={newData} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name='email' className="form-control" value={updateData && updateData.email} onChange={newData} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input type="text" name='age' className="form-control" value={updateData && updateData.age} onChange={newData} />
                    </div>
                    <div className="d-flex gap-3 mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="male" id="male" checked={updateData && updateData.gender === 'male'} onChange={newData} />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="female" id="female" checked={updateData && updateData.gender === 'female'} onChange={newData} />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </>
    )
}
