import { useEffect } from 'react';
import Charts from '../../components/charts/Charts';
import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TableList from '../../components/table/TableList';
import Widget from '../../components/widget/Widget';
import './home.scss'
import toast from 'react-hot-toast';
const Home = () => {
    useEffect(() => {
        toast.success("Admin email: admin@gmail.com and password: 12345");

    }, []);
    return (
        <div className='home'>
            <Sidebar></Sidebar>
            <div className="homeContainer">
                <Navbar></Navbar>
                <div className="widgets">
                    <Widget type='user'></Widget>
                    <Widget type='order'></Widget>
                    <Widget type='earning'></Widget>
                    <Widget type='pending'></Widget>
                </div>
                <div className="charts">
                    <Featured></Featured>
                    <Charts></Charts>
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <TableList></TableList>
                </div>
            </div>
        </div>
    );
};

export default Home;