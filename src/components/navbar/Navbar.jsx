import { ChatBubbleOutlineOutlined, DarkModeOutlined, FullscreenExitOutlined, LanguageOutlined, ListOutlined, NotificationsNoneOutlined, SearchOutlined } from '@mui/icons-material';
import './navbar.scss';
import { useDispatch } from 'react-redux';
import { getMode2 } from '../../RTK/features/mode/modeSlice';
import useCurrentUser from '../../utils/useCurrentUser';

const Navbar = () => {
    const dispatch = useDispatch();
    const [data, isLoading, isError, error, loading, err] = useCurrentUser();
    console.log(data)

    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='Search...' />
                    <SearchOutlined className='icon'></SearchOutlined>
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlined className='icon'></LanguageOutlined>
                        English
                    </div>
                    <div onClick={() => dispatch(getMode2('dark'))} className="item">
                        <DarkModeOutlined className='icon'></DarkModeOutlined>
                    </div>
                    <div className="item">
                        <FullscreenExitOutlined className='icon'></FullscreenExitOutlined>
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlined className='icon'></NotificationsNoneOutlined>
                        <div className="counter">1</div>

                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlined className='icon'></ChatBubbleOutlineOutlined>
                        <div className="counter">2</div>

                    </div>
                    <div className="item">
                        <ListOutlined className='icon'></ListOutlined>
                    </div>
                    <div className="item">
                        <p>{data?.name}</p>
                    </div>

                    <div className="item">
                        <img
                            src={data?.image}
                            alt=""
                            className='avatar'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;