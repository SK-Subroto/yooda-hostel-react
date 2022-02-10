import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import './PageNotFound.css';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('./');
    }
    return (
        <Container className="mt-3" style={{ height: '80vh' }}>
            <div className="page-not-found-container">
                <h2>Page Not Found</h2>
                <h1 style={{ fontSize: '8rem' }}>404</h1>
                <Button variant="light" className="primary-background" onClick={handleGoHome}> <BsFillHouseDoorFill className="mb-1" /> Go to homepage</Button>
            </div>
        </Container>
    );
};

export default PageNotFound;