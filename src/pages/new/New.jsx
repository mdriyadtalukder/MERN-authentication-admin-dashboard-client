/* eslint-disable react/prop-types */
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import './new.scss';
import { useState } from "react";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useAddUsersMutation, useGetUsersQuery } from '../../RTK/features/user/userApi';
import axios from 'axios';
import Swal from 'sweetalert2';
import useCurrentUser from '../../utils/useCurrentUser';
import { LinearProgress, Stack } from '@mui/material';

const image_hosting_key = 'c3b628c1be0620877686ba821b3c2092';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const New = () => {
    const [file, setFile] = useState("");
    const [addUsers] = useAddUsersMutation();
    const { data: users, isLoading: userLoading } = useGetUsersQuery();
    const [data, isLoading, isError, error, loading, err] = useCurrentUser()


    const handleAddingToFirebase = async (e) => {
        e.preventDefault();

        const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
        const image = forms.get('image');
        const datas = new FormData();
        datas.append('image', image)
        const res = await axios.post(image_hosting_api, datas);

        const form = e.target;
        const name = form.name?.value;
        const email = form.email?.value;
        const password = form.password?.value;
        const number = form.number?.value;
        const photo = res?.data?.data?.display_url;

        const isAdminPresent = users?.some(user => user.email === email);

        if (!isAdminPresent || data?._id) {
            addUsers({
                name: name,
                email: email,
                image: photo,
                password: password,
                phoneNumber: number,
                isEmailVerified: true,
                isPhoneNumberVerified: true,
                role: "user"
            });
            e.target.reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User added successfully!",
                showConfirmButton: false,
                timer: 1500
            });

        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something wrong try again!!",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <>
            {
                (isLoading || userLoading || loading) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />

                </Stack> :
                    <div className="new">
                        <Sidebar />
                        <div className="newContainer">
                            <Navbar />
                            <div className="top">
                                <h1>Add new user</h1>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <img
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="right">
                                    <form onSubmit={handleAddingToFirebase}>
                                        <div className="formInput">
                                            <label htmlFor="file">
                                                Image: <DriveFolderUploadOutlined className="icon" />
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                name='image'
                                                required
                                                onChange={(e) => setFile(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>


                                        <div className="formInput">
                                            <label>Name</label>
                                            <input name='name' type='text' placeholder='write name' required />
                                        </div>
                                        <div className="formInput">
                                            <label>Email</label>
                                            <input type='email' name='email' placeholder='write email' required />
                                        </div>
                                        <div className="formInput">
                                            <label>Password</label>
                                            <input type='password' name='password' placeholder='write password' required />
                                        </div>

                                        <div className="formInput" style={{ width: '100%', paddingLeft: '35px', paddingRight: '33px' }}>
                                            <label>Phone Number</label>
                                            <input name='number' type='text' placeholder='write phone no' required />
                                        </div>

                                        <button type='submit'>Send</button>
                                    </form>
                                </div>

                            </div>
                            {(err || error) && <div className="spn">Something wrong!!</div>}
                        </div>
                    </div>
            }
        </>
    );
};

export default New;


//mdriyadtalukder69
//vWbsiUZCELd29VOQ