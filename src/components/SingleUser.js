import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { deleteUser, showUser } from '../features/UserDetailSlice';
import { useNavigate } from 'react-router-dom';
import pimage from '../assets/profile.webp'


export default function SingleUser() {
    const allUsers = useSelector((state) => state.app.users);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = params.id;

    // Fetch user data when the component mounts or userId changes
    useEffect(() => {
        dispatch(showUser());
    }, []);

    // Filter the user based on userId
    const singleUser = allUsers.filter((data) => data.id === userId);
    console.log('singleUser: ', singleUser);

    // Display loading state if user data is still being fetched
    if (singleUser.length === 0) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Navbar />
            <div className="container w-50 m-auto">
                <h2 className="my-4">User Data</h2>
                <form>
                    {singleUser.length > 0 && (
                        <div className='row'>
                            <div className="col-md-7">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" name="name" className="form-control" readOnly value={singleUser[0].name} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name='email' className="form-control" readOnly value={singleUser[0].email} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" name='phone' className="form-control" readOnly value={singleUser[0].phone} />
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
                                            readOnly
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
                                            readOnly
                                        />
                                        <label className="form-check-label" htmlFor="female">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="p_image" style={{ backgroundImage: `url(${singleUser[0].image || pimage})` }}></div>
                            </div>

                        </div>
                    )}
                    <div className="d-flex justify-content-between mt-2">
                        <Link to={`/update/${singleUser[0].id}`} className="btn btn-primary">
                            Edit
                        </Link>
                        <button
                            className="btn btn-sm btn-danger"
                            type="button"
                            onClick={() => {
                                dispatch(deleteUser(singleUser[0].id));
                                navigate('/read');
                            }}
                        >
                            Delete Contact
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
