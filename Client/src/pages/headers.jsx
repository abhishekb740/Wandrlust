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

export default function Header() {

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
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, paddingBottom: '1rem' }}>
            <AppBar position="sticky" sx={{
                padding: ".5rem 0",
                backgroundColor: "black",
                color: "#f94566",
            }}>
                <Toolbar>
                    <Link to="/">
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', fontWeight: "bold" } }}
                        >
                            WandrLust
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '4rem' }}>
                        <Link to="/locations" >
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Locations
                            </Typography>
                        </Link>
                        <Link to="/feeds" >
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Feeds
                            </Typography>
                        </Link>
                        <Link to="/flights">
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Flights
                            </Typography>
                        </Link>
                        <Link to="/about-us">
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                About Us
                            </Typography>
                        </Link>
                        <Link to="/contact-us">
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Contact Us
                            </Typography>
                        </Link>
                    </Box>
                    <Link to="/profile">
                        <Box
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'flex'
                                },
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}
                        >
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle fontSize='medium' />
                            </IconButton>
                            <Typography
                                component="div"
                                variant='body1'
                                fontWeight={500}
                            >
                                Profile
                            </Typography>
                        </Box>
                    </Link>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}