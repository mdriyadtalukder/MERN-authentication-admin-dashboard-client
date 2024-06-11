import { LinearProgress, Stack } from '@mui/material';
import { useGetUsersQuery } from '../../RTK/features/user/userApi';
import DataTable from '../../components/dataTable/DataTable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './list.scss';

const List = () => {
    const { data, isLoading, error } = useGetUsersQuery() || null;
    return (
        <>
            {
                isLoading ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />

                </Stack> : <div className='list'>
                    <Sidebar></Sidebar>
                    <div className="listContainer">
                        <Navbar></Navbar>

                        <DataTable rows={data}></DataTable>
                        {error && <span className='spn'>Something wrong!!</span>}
                    </div>
                </div>
            }

        </>


    );
};

export default List;