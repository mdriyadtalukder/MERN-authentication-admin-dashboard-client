import './sidebar.scss';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMode } from '../../RTK/features/mode/modeSlice';
import { getUser } from '../../RTK/features/user/userSlice';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../../RTK/features/user/userApi';
const Sidebar = () => {
    const dispatch = useDispatch();
    const { data, isLoading: loading, error: err } = useGetCurrentUserQuery() || null;
    const [updateCurrentUser, { isLoading }] = useUpdateCurrentUserMutation();

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(getUser(null));
        localStorage.clear();
        updateCurrentUser({
            id: data?._id,
            data: {
                email: '',
            }
        });
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to='/' style={{ textDecoration: 'none' }}> <span className='logo'>Booking app</span></Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <ul>
                        <p className="title">MAIN</p>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                        <p className="title">LIST</p>
                        <Link to='/users' style={{ textDecoration: 'none' }}><li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                        </Link>


                        <Link to='/profile' style={{ textDecoration: 'none' }}>
                            <li>
                                <StoreIcon className="icon" />
                                <span>User profile</span>
                            </li>
                        </Link>

                        <li>
                            <CreditCardIcon className="icon" />
                            <span>Orders</span>
                        </li>
                        <li>
                            <LocalShippingIcon className="icon" />
                            <span>Delivery</span>
                        </li>
                        <p className="title">USEFUL</p>

                        <li>
                            <InsertChartIcon className="icon" />
                            <span>Stats</span>
                        </li>
                        <li>
                            <NotificationsNoneIcon className="icon" />
                            <span>Notifications</span>
                        </li>
                        <p className="title">SERVIES</p>

                        <li>
                            <SettingsSystemDaydreamOutlinedIcon className="icon" />
                            <span>System Health</span>
                        </li>
                        <li>
                            <PsychologyOutlinedIcon className="icon" />
                            <span>Logs</span>
                        </li>
                        <li>
                            <SettingsApplicationsIcon className="icon" />
                            <span>Settings</span>
                        </li>
                        <p className="title">USER</p>

                        <li>
                            <AccountCircleOutlinedIcon className="icon" />
                            <span>Profile</span>
                        </li>
                        <li onClick={handleLogOut}>
                            <ExitToAppIcon className="icon" />
                            <span>Logout</span>
                        </li>
                    </ul>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch(getMode("light"))}></div>
                <div className="colorOption" onClick={() => dispatch(getMode("dark"))}></div>

            </div>
        </div>
    );
};

export default Sidebar;