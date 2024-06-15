import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { LuLibrary } from "react-icons/lu";
import { RxBorderStyle, RxHamburgerMenu } from "react-icons/rx";

const SidebarA = () => {
    const homeIcon = { color: "white", fontSize: "2em" }
    const searchIcon = { color: "white", fontSize: "2em" }
    const libraryIcon = { color: "white", fontSize: "2em" }
    const [collapsed, setCollapsed] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [broken, setBroken] = React.useState(false);
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
                            if (level === 0) {
                                return {
                                    color: disabled ? "#eee" : "white",
                                    backgroundColor: active ? undefined : "#181414",
                                    "&:hover": {
                                        backgroundColor: "#141212 !important",
                                        color: "white !important",
                                    },
                                };
                            }
                        },
                    }}
                >
                    <MenuItem active icon={<GoHome style={homeIcon} />} component={<Link to={"/"} style={{ marginTop: "40px", }} />}>Home</MenuItem>
                    <MenuItem icon={<CiSearch style={searchIcon} />}>Search</MenuItem>
                    <MenuItem icon={<LuLibrary style={libraryIcon} />}>Library</MenuItem>
                    <SubMenu defaultOpen label="Playlists">
                        <MenuItem style={{ background: "#181414", color: "white" }}>Create Playlist</MenuItem>
                        <MenuItem style={{ background: "#181414", color: "white" }}>Liked Albums</MenuItem>
                        <MenuItem style={{ background: "#181414", color: "white" }}>Liked Artist</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
            <div>
                {broken && (
                    <button className="sb-button" onClick={() => setToggled(!toggled)}>
                        <RxHamburgerMenu style={{ color: 'white' }} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SidebarA