import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/UserDetailSlice'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Read() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showUser());
    }, []);

    const { users, loading } = useSelector((state) => state.app);
    console.log('users: ', users);

    if (loading) {
        return <h2 className='container'>Loading...</h2>
    }

    return (
        <>
        <Navbar/>
            <div className='container'>
                <h2 className='my-4'>All Users</h2>
                <div className="row">
                    {users &&
                        users.map((ele) => (
                            <div className="col-md-4 mb-4" key={ele.id}>
                                <div className="card p-2">
                                    <h5>{ele.name}</h5>
                                    <p className='mb-0'>{ele.email}</p>
                                    <p className='mb-0'>Age: {ele.age}</p>
                                    <p className='mb-0'>Gender: {ele.gender}</p>
                                    <div className="d-flex gap-3 my-2">
                                        <Link to={`/read/${ele.id}`} className='btn btn-sm btn-primary'>View</Link>
                                        <Link to={`/update/${ele.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                                        <button className='btn btn-sm btn-danger' onClick={() => dispatch(deleteUser(ele.id))}>Delete</button>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
