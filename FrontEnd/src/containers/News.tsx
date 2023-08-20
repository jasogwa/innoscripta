import { Container, TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
import axiosClient from '../axios-client';
import { useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

const News = () => {
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    const [keyword, setKeyword] = useState('');
    const [news, setNews] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserData = async () => {
        if (!keyword) {
            setIsFormSubmitted(true);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axiosClient.get(`/news`, {
                params: {
                    keyword
                }
            });
            setNews(response.data.news);
            setIsFormSubmitted(true);
        } catch (error) {
            console.error('Error fetching news data', error);
            setIsFormSubmitted(true);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDateString = (dateString: any) => {
        const date = new Date(dateString);

        const monthAbbreviation = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        return `${monthAbbreviation}, ${year}`;
    };

    return (
        <Container
            sx={{ mt: { xs: 10, md: 15, lg: 10 } }}
            style={{
                height: '100vh'
            }}
        >
            <Typography component="h4" variant="h4" gutterBottom>
                News Headline
            </Typography>

            <TextField
                label="Enter keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                error={isFormSubmitted && !keyword}
                helperText={isFormSubmitted && !keyword ? 'Please enter a valid Enter keyword.' : ''}
                variant="outlined"
                fullWidth
                sx={{
                    backgroundColor: '#F6F8FA',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#F6F8FA'
                    }
                }}
            />

            <Button
                variant="contained"
                onClick={fetchUserData}
                size="large"
                sx={{
                    marginTop: '16px',
                    backgroundColor: '#28A745',
                    color: 'white',
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#218838'
                    }
                }}
            >
                Search
            </Button>

            {isLoading && <p>Loading...</p>}

            <Grid container spacing={4}>
                {/* Left */}
                <Grid item xs={12} md={4} style={{ marginTop: '10px' }}>
                    <Card
                        sx={{
                            borderRadius: '1px',
                            padding: '8px',
                            backgroundColor: '#fff',
                            minHeight: '150px',
                            maxHeight: '100%',
                            marginRight: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}
                        >
                            <div>
                                <CardContent>
                                    <div>User's Personalized Search</div>
                                    <Typography
                                        component={'span'}
                                        variant="body2"
                                        sx={{
                                            fontSize: 10
                                        }}
                                    ></Typography>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </Grid>

                {/* Right */}
                <Grid item xs={12} md={8} component="span">
                    <div
                        style={{
                            border: 'none',
                            borderRadius: '1px',
                            padding: '8px',
                            backgroundColor: '#fffcfc',
                            height: '700px',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                overflowY: 'auto',
                                marginTop: '5px'
                            }}
                        >
                            Top Headlines
                            <Divider />
                            {news && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    {news.map((x: any) => (
                                        <Card
                                            key={x.id}
                                            sx={{
                                                border: 'none',
                                                padding: '8px',
                                                minHeight: '100px',
                                                margin: '10px',
                                                miniWidth: { xs: '100%', md: '300px', lg: '320px' },
                                                maxWidth: { xs: '500px', md: '400px', lg: '320px' }
                                            }}
                                        >
                                            <img
                                                src={x.imageUrl}
                                                alt="Image"
                                                style={{ width: '100%', height: '150px' }}
                                            />
                                            <a href={x.url} target="_blank" rel="noopener noreferrer">
                                                {x.title}
                                            </a>
                                            <br />
                                            <Typography component={'span'} variant="body1">
                                                {x.description}
                                            </Typography>
                                            <Typography component={'div'} variant="body2" color="textSecondary">
                                                {formatDateString(x.publishedAt)}
                                            </Typography>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default News;
