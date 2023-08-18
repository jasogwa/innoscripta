import { AppBar, Typography, Button, Toolbar, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Navbar = () => {
    return (
        <AppBar position="fixed" elevation={0}>
            <Container>
                <Toolbar>
                    <Typography component={'span'} variant="h6" flexGrow={1}>
                        <NewspaperIcon />
                    </Typography>
                    <Button variant="text" color="inherit" startIcon={<LoginIcon />}>
                        Login
                    </Button>
                    <Button variant="text" color="inherit" startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
