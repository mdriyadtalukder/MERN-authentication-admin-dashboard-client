import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useCurrentUser from "../../utils/useCurrentUser";
import './profile.scss';
import { useState } from "react";
import axios from "axios";
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation, useUpdateEmailMutation, useUpdateNameMutation, useUpdatePassMutation, useUpdatePhotoMutation } from "../../RTK/features/user/userApi";
import Swal from "sweetalert2";
import { LinearProgress, Stack } from "@mui/material";

const image_hosting_key = 'c3b628c1be0620877686ba821b3c2092';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
    const [file, setFile] = useState();
    const [names, setName] = useState(false);
    const [emails, setEmail] = useState(false);
    const [pass, setPass] = useState(false);
    const [data, isLoading, isError, error, loading, err] = useCurrentUser();
    const [updatePhoto] = useUpdatePhotoMutation();
    const [updateName] = useUpdateNameMutation();
    const [updatePass] = useUpdatePassMutation();
    const [updateEmail] = useUpdateEmailMutation();

    const { data: currentEmail, isLoading: loadd, error: errorr } = useGetCurrentUserQuery() || null;
    const [updateCurrentUser,] = useUpdateCurrentUserMutation();

    const handleImage = async (e) => {

        e.preventDefault();
        const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
        const image = forms.get('image');
        const datas = new FormData();
        datas.append('image', image)
        const res = await axios.post(image_hosting_api, datas);
        const photo = res?.data?.data?.display_url;
        if (data?._id) {
            updatePhoto({
                id: data?._id,
                data: {
                    image: photo,
                }
            });
            setFile(null);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile picture updated sucessfully!!",
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

    const handleName = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name?.value;
        if (data?._id) {
            updateName({
                id: data?._id,
                data: {
                    name: name,
                }
            });
            setName(false);
            e.target.reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile name updated sucessfully!!",
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

    const handlePassword = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password?.value;
        if (data?._id) {
            updatePass({
                id: data?._id,
                data: {
                    password: password,
                }
            });
            setPass(false);
            e.target.reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Password updated sucessfully!!",
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

    const handleEmail = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        if (data?._id) {
            updateEmail({
                id: data?._id,
                data: {
                    email: email,
                }
            });
            updateCurrentUser({
                id: currentEmail?._id,
                data: {
                    email: email,
                }
            });
            setEmail(false);
            e.target.reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Email updated sucessfully!!",
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
    console.log(data)

    return (
        <>

            {(isLoading || loading || loadd) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />

            </Stack> : <div className='list parent'>
                <Sidebar></Sidebar>
                <div className="listContainer profile">
                    <Navbar></Navbar>
                    <div className="myProfile">
                        <div className="img">
                            <img src={file ? URL.createObjectURL(file) : data?.image} alt="" />
                        </div>
                        <form onSubmit={handleImage}>

                            <div className="formInput icons">
                                <label htmlFor="file">
                                    <DriveFolderUploadOutlined className="icon" />
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
                            <button type="submit" style={{ display: `${file ? 'block' : 'none'}` }} className="btn">Save</button>
                        </form>
                        <div className="info">

                            <div className="infoChild">
                                <p><span>Name: </span>{data?.name}</p>
                                <div className="updated">
                                    <button onClick={() => setName(!names)} className="submitButton">Change name</button>
                                    <form onSubmit={handleName} style={{ display: `${names ? 'flex' : 'none'}` }} className="hiddenForm">
                                        <input defaultValue={data?.name} className="hiddeninput" name="name" type="text" /><br />
                                        <button type="submit" className="hiddenbtn">Save</button>
                                    </form>
                                </div>
                            </div>
                            <hr />
                            <div className="infoChild">
                                <p><span>Password: </span>{data?.password}</p>
                                <div className="updated">
                                    <button onClick={() => setPass(!pass)} className="submitButton">Change password</button>
                                    <form onSubmit={handlePassword} style={{ display: `${pass ? 'flex' : 'none'}` }} className="hiddenForm">
                                        <input defaultValue={data?.password} className="hiddeninput" name="password" type="text" /><br />
                                        <button type="submit" className="hiddenbtn">Save</button>
                                    </form>
                                </div>
                            </div>
                            <hr />
                            <div className="infoChild">
                                <p><span>Email: </span>{data?.email}</p>
                                <div className="updated">
                                    <button onClick={() => setEmail(!emails)} className="submitButton">Change email</button>
                                    <form onSubmit={handleEmail} style={{ display: `${emails ? 'flex' : 'none'}` }} className="hiddenForm">
                                        <input defaultValue={data?.email} className="hiddeninput" name="email" type="text" /><br />
                                        <button type="submit" className="hiddenbtn">Save</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                        {(error || errorr || err) && <span className="spn">Wrong email or password!</span>}

                    </div>
                </div>
            </div>
            }</>

    );
};

export default Profile;