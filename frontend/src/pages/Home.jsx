import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { LuLibrary } from "react-icons/lu";
import { RxBorderStyle, RxHamburgerMenu } from "react-icons/rx";

const Home = () => {
  const homeIcon = { color: "white", fontSize: "2em" }
  const searchIcon = { color: "white", fontSize: "2em" }
  const libraryIcon = { color: "white", fontSize: "2em" }
  const profileStyle = { color: 'white', backgroundColor: '#000000', padding: '12px 16px', cursor: 'pointer', borderRadius: '20px', }
  const headerStyle = { color: 'white',}
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  return (
    <div style={{ background: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)' }}>
      <Sidebar
        backgroundColor="#000000"
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
                  backgroundColor: active ? undefined : "#000000",
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
            <MenuItem style={{ background: "#0D0C0C", color: "white" }}>Create Playlist</MenuItem>
            <MenuItem style={{ background: "#0D0C0C", color: "white" }}>Liked Albums</MenuItem>
            <MenuItem style={{ background: "#0D0C0C", color: "white" }}>Liked Artist</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div>
        {broken && (
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            <RxHamburgerMenu />
          </button>
        )}
      </div>
      <div style={{ marginLeft: "280px", marginRight: '20px', height: "100vh" }}>
        <div style={headerStyle}>
        Playlists
        Pocasts
        Artist
        Albums
        </div>
        <select className="float-right" style={profileStyle}>
          <option disabled selected value> Profile name </option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>

  )
}

export default Home