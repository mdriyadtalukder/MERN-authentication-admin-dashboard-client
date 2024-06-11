import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import './dataTable.scss'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteUserMutation } from "../../RTK/features/user/userApi";
import useCurrentUser from "../../utils/useCurrentUser";

const DataTable = ({ rows }) => {
    const [deleteUser, { isLoading }] = useDeleteUserMutation();
    const [currentUser] = useCurrentUser();

    let count = 1;

    const handleDeleting = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                deleteUser(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "The user has deleted.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <TableContainer className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">Tracking ID</TableCell>
                            <TableCell className="tableCell">Name</TableCell>
                            <TableCell className="tableCell">Email</TableCell>
                            <TableCell className="tableCell">Phone Number</TableCell>
                            <TableCell className="tableCell">Role</TableCell>
                            <TableCell className="tableCell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="tableCell">{count++}</TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        <img src={row.image} alt="" className="image" />
                                        {row.name}
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">{row.email}</TableCell>
                                <TableCell className="tableCell">{row.phoneNumber}</TableCell>
                                <TableCell className="tableCell">{row.role}</TableCell>
                                <TableCell className="tableCell">
                                    <Link to={`/users/${row?._id}`}><button className="viewButton">View</button></Link>
                                    <button disabled={currentUser?.email === row?.email} onClick={() => handleDeleting(row?._id)} className="deleteButton">Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataTable;