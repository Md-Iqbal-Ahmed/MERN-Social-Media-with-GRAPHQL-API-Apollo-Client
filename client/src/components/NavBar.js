import React, { useState, useContext } from "react";
import { Menu, Popup, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../components/authContext/Auth";

const NavBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const { user, logout } = useContext(AuthContext);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div>
      {user ? (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Menu className="create__post__button" position="left">
            <Menu.Item
              name={user.username}
              active={activeItem === "home"}
              onClick={handleItemClick}
              as={Link}
              to="/"
            />

            <Menu.Item>
              <Modal />
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={logout}
              as={Link}
              to="/login"
            />
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Menu className="create__post__button" position="left">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={handleItemClick}
              as={Link}
              to="/"
            />
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
      )}{" "}
    </div>
  );
};

export default NavBar;
