import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { LuLibrary } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineStarBorder } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { isAuthenticated } from '../Backend';

const SidebarA = () => {
    const sidebarIcon = { color: "white", fontSize: "2em" }
    const [collapsed, setCollapsed] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [broken, setBroken] = React.useState(false);
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    return (
        <div>
            <Sidebar
                backgroundColor="#181414"
                style={{
                    position: "fixed",
                    height: "100vh",
                }}
                collapsed={collapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                breakPoint="md"
            >
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0 || level === 1 ) {
                                return {
                                    color: disabled ? "#eee" : "white",
                                    backgroundColor: active ? 'rgb(46,46,46)' : "#181414 !important",
                                    borderRadius: '10px',
                                    margin: '10px',
                                    fontWeight: active ? 'bold' : '',
                                    "&:hover": {
                                        backgroundColor: active ? 'rgb(46,46,46)' : "rgb(46,46,46) !important",
                                        color: "white !important",
                                        borderRadius: '10px',
                                        margin: '10px',
                                    },
                                };
                            }
                        },
                    }}
                >
                    <MenuItem active={location.pathname === '/' } icon={<GoHome style={sidebarIcon} />} component={<Link to={"/"} style={{ margin: '40px 10px 0px' }} />}>Home</MenuItem>
                    <MenuItem active={location.pathname === '/search'} icon={<CiSearch style={sidebarIcon}/>} component={<Link to={"/search"} style={{ margin: '0px 10px' }}/>}>Search</MenuItem>
                    {/* <MenuItem icon={<LuLibrary style={sidebarIcon} /> }  component={<Link to={"/"} style={{ margin: '0px 10px' }}/>}>Library</MenuItem> */}
                    {authenticatedUser.user.user_type === 0 ? 
                    <MenuItem active={location.pathname === '/users' } icon={<FaUsers style={sidebarIcon} />} component={<Link to={"/users"} style={{ margin: '0px 10px' }} />}>Users</MenuItem>
                     : ''}
                </Menu>
            </Sidebar>
            <div>
                {broken && (
                    <button className='absolute top-6 px-4 py-1' onClick={() => setToggled(!toggled)}>
                        <RxHamburgerMenu style={{ color: 'white', fontSize: '20px' }} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SidebarA