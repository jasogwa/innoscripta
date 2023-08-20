import React from 'react';
import { AppBar, Typography, Button, Toolbar, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Navbar: React.FC = () => {
    return (
        <AppBar position="fixed" elevation={0}>
            <Container>
                <Toolbar>
                    <Typography component={'span'} variant="h6" sx={{ flexGrow: 1 }}>
                        <NewspaperIcon />
                    </Typography>
                    <Button variant="text" color="inherit" startIcon={<LoginIcon />}>
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="text" color="inherit" startIcon={<LogoutIcon />}>
                        <Link to="/register">Register</Link>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
