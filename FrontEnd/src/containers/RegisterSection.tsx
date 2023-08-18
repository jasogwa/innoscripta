import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';

const RegisterSection: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        password_confirmation?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const baseURL = 'http://127.0.0.1:8000';

    const validateForm = () => {
        const newErrors: {
            username?: string;
            email?: string;
            password?: string;
            password_confirmation?: string;
        } = {};
        if (!name) {
            newErrors.username = 'Username is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        if (!password_confirmation) {
            newErrors.password_confirmation = 'Password confirmation is required';
        } else if (password !== password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        setErrors(newErrors);
    };

    const handleRegister = async () => {
        validateForm();
        setIsSubmitting(true);

        if (Object.keys(errors).length === 0) {
            try {
                await axios.post(`${baseURL}/api/v1/register`, {
                    name,
                    email,
                    password,
                    password_confirmation
                });
                navigate('/login');
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
                    Register
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {errors.username && <div>{errors.username}</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                required
                            />
                            {errors.password && <div>{errors.password}</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                fullWidth
                                type="password"
                                value={password_confirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                            {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}
                                disabled={isSubmitting}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterSection;
