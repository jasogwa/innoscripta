import React from 'react';
import { AppBar, Typography, Button, Toolbar, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';

const Navbar: React.FC = () => {
    const { token } = useStateContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            axiosClient
                .post(`/logout`)
                .then(({ data }) => {
                    console.log(data.message);
                    localStorage.removeItem('ACCESS_TOKEN');
                    navigate('/login');
                })
                .catch((err) => {
                    console.error(err.response);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AppBar position="fixed" elevation={0}>
            <Container>
                <Toolbar>
                    <Typography component={'span'} variant="h6" sx={{ flexGrow: 1 }}>
                        <NewspaperIcon />
                    </Typography>
                    {token ? (
                        <>
                            <Button variant="text" color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="text" color="inherit" startIcon={<LoginIcon />}>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button variant="text" color="inherit" startIcon={<AppRegistrationIcon />}>
                                <Link to="/register">Register</Link>
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
