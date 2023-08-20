import React, { useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';

const LoginSection: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);

    const validateForm = () => {
        const newErrors: {
            email?: string;
            password?: string;
        } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
    };

    const handleLogin = async () => {
        validateForm();
        setIsSubmitting(true);

        if (Object.keys(errors).length === 0) {
            try {
                axiosClient
                    .post(`/login`, {
                        email,
                        password
                    })
                    .then(({ data }) => {
                        setUser(data.user);
                        setToken(data.token);
                        navigate('/');
                    })
                    .catch((err) => {
                        const response = err.response;
                        if (response && response.status === 422) {
                            setMessage(response.data.message);
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        }

        setIsSubmitting(false);
    };

    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '100vh',
                marginTop: '160px'
            }}
        >
            <Paper style={{ padding: '20px', maxWidth: '500px', minWidth: '300px' }} elevation={3}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                {message}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div>{errors.email}</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div>{errors.password}</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginSection;
