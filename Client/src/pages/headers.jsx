import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from "../assets/images/profile.png"
import { useState, useEffect } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/react";

export default function Header() {
    const [count, setCount] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:5173/signup";
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <img src={ProfileImage} width="50px" height="50px" ></img>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    useEffect(() => {
        const getToken = async () => {
            const token = localStorage.getItem('token')
            if (token !== null) {
                setCount(true);
            }
        }
        getToken();
        // window.addEventListener('storage', getToken)
    }, []);

    return (
        <Box sx={{ flexGrow: 1, paddingBottom: '6rem' }}>
            <AppBar position="fixed" sx={{
                padding: ".5rem 0",
                backgroundColor: "black",
            }}>
                <Toolbar>
                    <Link to="/">
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', fontWeight: "bold", color: "#f94566", } }}
                        >
                            WandrLust
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '4rem' }}>
                        {/* <Link to={count ? "/locations" : "/signup"}>
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Locations
                            </Typography>
                        </Link> */}
                        <Link to={count ? "/feeds" : "/signup"} >
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Feeds
                            </Typography>
                        </Link>
                        <Link to={count ? "/flights" : "/signup"}>
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Flights
                            </Typography>
                        </Link>
                        <Link to={count ? "/about-us" : "/signup"}>
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                About Us
                            </Typography>
                        </Link>
                        <Link to={"/contact-us"}>
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Contact Us
                            </Typography>
                        </Link>
                        <Link to={count ? "/agencyForm" : "/signup"}>
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Create Agency
                            </Typography>
                        </Link>
                        <Link to={count ? "/agency" : "/signup"}>
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Agency
                            </Typography>
                        </Link>
                    </Box>
                    {count ? (
                        <Dropdown>
                            <DropdownTrigger>
                                <Box
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            md: 'flex'
                                        },
                                        alignItems: "center",
                                        gap: "12px",
                                        justifyContent: "center",
                                        cursor: "pointer"
                                    }}
                                >
                                    <img src={ProfileImage} width="35px" height="35px" style={{ border: '1px solid white', borderRadius: '50%' }}></img>
                                </Box>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="new">
                                    <Link to="/profile">
                                        Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="copy">
                                    <Link to="/admin" >
                                        Admin
                                    </Link>
                                </DropdownItem>
                                <DropdownItem onClick={handleLogout} color='danger' key="logout">Logout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Link to="/signup">
                            <Box
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'flex'
                                    },
                                    alignItems: "center",
                                    gap: "12px",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}
                            >
                                <LockOpenIcon />
                                <Typography
                                    component="div"
                                    variant='body1'
                                    fontWeight={500}
                                >
                                    SignIn/SignUp
                                </Typography>
                            </Box>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}