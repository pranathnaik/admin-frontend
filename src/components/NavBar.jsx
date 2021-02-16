import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Button,
  useColorMode,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SettingsIcon } from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import AdminContext from "../context/AdminContext";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const themeicon = useColorModeValue(MoonIcon, SunIcon);
  const { admin, setadmin } = useContext(AdminContext);
  const history = useHistory();
  const logout = () => {
    setadmin({
      id: undefined,
      admin: undefined,
    });
    localStorage.setItem("x-auth-id", "");
    history.push("/login");
  };
  return (
    <>
      <Box w="100%" p={4}>
        <HStack spacing="24px">
          <IconButton
            size="md"
            fontSize="lg"
            onClick={toggleColorMode}
            icon={<Icon as={themeicon} />}
          />
          {admin.admin ? (
            <>
              <Button leftIcon={<FaHome />} variant="link" size="md">
                <Link to="/">Orders</Link>
              </Button>

              <Button variant="link" size="md">
                <Link to="/prebuild">Prebuild</Link>
              </Button>

              <Button variant="link" size="md">
                <Link to="/laptop">Laptop</Link>
              </Button>

              <Menu>
                <MenuButton as={Button}>Components</MenuButton>
                <MenuList>
                  <Link to="/Processor">
                    <MenuItem>Processor</MenuItem>
                  </Link>

                  <Link to="/graphicscard">
                    <MenuItem>Graphics Card </MenuItem>
                  </Link>

                  <Link to="/Motherboard">
                    <MenuItem>Motherboard </MenuItem>
                  </Link>

                  <Link to="/admin-frontend/ram">
                    <MenuItem>Ram </MenuItem>
                  </Link>

                  <Link to="/cabinet">
                    <MenuItem>Cabinet </MenuItem>
                  </Link>

                  <Link to="/psu">
                    <MenuItem>Psu </MenuItem>
                  </Link>
                  <Link to="/storage">
                    <MenuItem>Storage </MenuItem>
                  </Link>
                  <Link to="/accesories">
                    <MenuItem>accesories </MenuItem>
                  </Link>
                  <Link to="/cooler">
                    <MenuItem>Cooler </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
              <Link to="/settings">
                <IconButton
                  size="md"
                  fontSize="lg"
                  icon={<Icon as={SettingsIcon} />}
                />
              </Link>
              <Link>
                <IconButton
                  onClick={logout}
                  size="md"
                  fontSize="lg"
                  icon={<Icon as={AiOutlineLogout} />}
                />
              </Link>
            </>
          ) : (
            <Button variant="link" size="md">
              <Link to="/login">login</Link>
            </Button>
          )}
        </HStack>
      </Box>
    </>
  );
};

export default NavBar;
