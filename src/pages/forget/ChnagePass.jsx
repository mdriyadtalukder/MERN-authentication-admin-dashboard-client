import Swal from "sweetalert2";
import { useGetCodeQuery, useUpdateCodeMutation, useUpdatePassMutation } from "../../RTK/features/user/userApi";
import useCurrentUser from "../../utils/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Stack } from "@mui/material";

const ChnagePass = () => {
    const { data: codes, isLoading: load, error: erro } = useGetCodeQuery() || null;
    const [updateCode] = useUpdateCodeMutation();
    const [data, isLoading, error, loadings, err] = useCurrentUser();
    const [updatePass] = useUpdatePassMutation();
    const navigate = useNavigate();

    const handlePass = (e) => {
        e.preventDefault();

        const form = e.target;
        const pass = form.passowrd?.value;
        if (data?._id && data?.password !== pass) {
            updatePass({
                id: data?._id,
                data: {
                    password: pass
                }
            });

            if (codes?._id) {
                updateCode({
                    id: codes?._id,
                    data: {
                        code: '',
                    }
                });
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Changed password successfully!!",
                showConfirmButton: false,
                timer: 1500
            });


            setTimeout(() => {
                navigate('/login');
            }, 0);
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
            {(isLoading || loadings || load) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />

            </Stack> :
                <div className="pass">
                    <form onSubmit={handlePass}>
                        <input
                            type="text"
                            placeholder="write passowrd"
                            name="passowrd"
                            required


                        />

                        <button type="submit">Change</button>
                    </form>
                    {(error || err || erro) && <span>Wrong Code!!</span>}
                </div>}

        </>
    );
};

export default ChnagePass;