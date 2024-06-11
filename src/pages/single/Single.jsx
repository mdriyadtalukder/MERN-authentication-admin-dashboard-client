
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery, useUpdateSingleUserMutation, useGetUsersQuery, useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../../RTK/features/user/userApi';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useCurrentUser from '../../utils/useCurrentUser';
import { LinearProgress, Stack } from '@mui/material';


const image_hosting_key = 'c3b628c1be0620877686ba821b3c2092';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Singe = () => {
  const { userId } = useParams();
  const [file, setFile] = useState();
  const { data, isLoading, error } = useGetSingleUserQuery(userId);
  const [updateSingleUser,] = useUpdateSingleUserMutation();
  const { data: users, isLoading: userLoading } = useGetUsersQuery();

  const [currentUser] = useCurrentUser();
  const { data: currentEmail, isLoading: loadd, error: errorr } = useGetCurrentUserQuery() || null;
  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  console.log(currentUser)
  //const imageName = data?.image?.split('/').pop();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
    const image = forms.get('image');
    let photo;
    if (image?.name) {
      const data = new FormData();
      data.append('image', image)
      const res = await axios.post(image_hosting_api, data);
      photo = res?.data?.data?.display_url;
    }
    else {
      photo = data?.image;
    }

    const form = e.target;
    const name = form.name?.value;
    const email = form.email?.value;
    const password = form.password?.value;
    const number = form.number?.value;

    const isAdminPresent = users?.some(user => user.email === email);
    if (email === data?.email || !isAdminPresent) {
      updateSingleUser({
        id: data?._id,
        data: {
          name: name,
          email: email,
          image: photo,
          password: password,
          phoneNumber: number,
          isEmailVerified: data?.isEmailVerified,
          isPhoneNumberVerified: data?.isPhoneNumberVerified,
          role: data?.role,
        }
      })
      if (currentUser?.email === data?.email) {
        updateCurrentUser({
          id: currentEmail?._id,
          data: {
            email: email,
          }
        });
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User updated successfully!",
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

      {(isLoading || userLoading || loadd) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
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
                      : data?.image
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form onSubmit={handleUpdate} >
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlined className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      name='image'

                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>


                  <div className="formInput">
                    <label>Name</label>
                    <input name='name' defaultValue={data?.name} type='text' placeholder='write name' required />
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input type='email' name='email' defaultValue={data?.email} placeholder='write email' required />
                  </div>
                  <div className="formInput">
                    <label>Password</label>
                    <input type='text' name='password' defaultValue={data?.password} placeholder='write password' required />
                  </div>

                  <div className="formInput" style={{ width: '100%', paddingLeft: '35px', paddingRight: '33px' }}>
                    <label>Phone Number</label>
                    <input name='number' type='text' defaultValue={data?.phoneNumber} placeholder='write phone no' required />
                  </div>

                  <button type='submit'>Send</button>
                </form>
                {(error || errorr) && <span className='spn'>Wrong email or password!</span>}
              </div>

            </div>
          </div>

        </div>}
    </>

  );
};

export default Singe;