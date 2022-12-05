import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link, Navigate, useParams } from 'react-router-dom';
import * as React from 'react';
import { Component, useEffect } from "react";

function ViewContact()
{
    const [goBack, setGoBack] = React.useState(false);
    const [users, setUsers] = React.useState();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${id}`)
        .then((res) => res.json())
        .then((json) => {
            setUsers(json);
            console.log(json);
        });
    }, []);

    if (goBack) 
    {
        return <Navigate to="/" />;
    }

    return(
        <div>
            <Container>
                <h2>ID: {users?.id}</h2>
                <h2>NAME: {users?.name}</h2>
                <h2>EMAIL: {users?.email}</h2>
                <h2>CONTACT: {users?.contact}</h2>
                <Button onClick={() => {setGoBack(true);}} variant="contained">BACK</Button>
            </Container>
        </div>
    )
}

export default ViewContact;