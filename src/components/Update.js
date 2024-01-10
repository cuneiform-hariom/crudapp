import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../features/UserDetailSlice';
import Navbar from './Navbar';
import pimage from '../assets/profile.webp'


export default function Update() {
    const { id } = useParams();
    const [updateData, setUpdateData] = useState();
    const { users, loading } = useSelector((state) => state.app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const oldImage = updateData && updateData.image

    const [newImage, setNewImage] = useState(null)

    useEffect(() => {
        if (id) {
            const singleData = users.filter((data) => data.id === id);
            setUpdateData(singleData[0]);
        }
    }, [id, users]);

    const newData = (e) => {
        // setUpdateData({ ...updateData, [e.target.name]: e.target.value });
        if (e.target.type === 'file') {
            handleUpdateImage(e);
        } else {
            setUpdateData({ ...updateData, [e.target.name]: e.target.value });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData));
        navigate('/read');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!updateData) {
        return <p>User data not found.</p>;
    }

    const handleUpdateImage = async (event) => {
        const selectedFile = event.target.files[0];
        setNewImage(URL.createObjectURL(selectedFile));
        setUpdateData({ ...updateData, image: URL.createObjectURL(selectedFile) });
    };

    return (
        <>
            <Navbar />
            <div className='container w-50 m-auto'>
                <h2 className='my-4'>Update User Data</h2>
                <form onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name='name' className="form-control" value={updateData && updateData.name} onChange={newData} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name='email' className="form-control" value={updateData && updateData.email} onChange={newData} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" name='phone' className="form-control" value={updateData && updateData.phone} onChange={newData} />
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
                        </div>
                        <div className="col-md-5">
                            <div className="p_image" style={{ backgroundImage: `url(${newImage || oldImage })` }}>
                                <label htmlFor="image"></label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept=".jpg, .jpeg, .png, webp"
                                    className='d-none'
                                    onChange={handleUpdateImage}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Update</button>
                </form>
            </div>
        </>
    )
}