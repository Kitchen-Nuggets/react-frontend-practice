import * as React from 'react';
import { useEffect } from "react";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import FormPractice from './FormTry';
import FormComponent from './Form';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
[`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
},
[`&.${tableCellClasses.body}`]: {
    fontSize: 14,
},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

const ContactList = (props) =>
{
    const [users, setUsers] = React.useState([]);
    const [goToView, setGoToView] = React.useState(false);
    const navigate = useNavigate();

    const [userName, addUserName] = React.useState('');
    const [userEmail, addUserEmail] = React.useState('');
    const [userContact, addUserContact] = React.useState('');

    const [id, setId] = React.useState('');

    const [isUpdating, setIsUpdating] = React.useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/users")
        .then((res) => res.json())
        .then((json) => {
            setUsers(json);
            console.log(json);
        });
    }, []);

    useEffect(() => 
    {
        //Table Reload
        if (props.users !== undefined)
        {
            setUsers(props.users); 
            console.log(props.users); 
        }
    }, [props.users])

    function ViewInfo(id)
    {
        navigate(`/view/${id}`);  
    }

    function DeleteUser(id)
    {
        fetch(`http://localhost:8080/api/delete/${id}`, {
        method: 'DELETE',
        })
        .then(res => {
            fetch("http://localhost:8080/api/users")
            .then((res) => res.json())
            .then((json) => {
                setUsers(json);
                console.log(json);
            });
        }) 
    }

    function CancelUpdate()
    {
        setIsUpdating(false);
        addUserName("");
        addUserEmail("");
        addUserContact("");
    }

    function AddUser()
    {
        setIsUpdating(false);

        let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (userEmail.match(validEmail) && userName.length != 0 && userContact != 0)
        {
            alert("Valid email address!");

            fetch("http://localhost:8080/api/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:userName, 
                email:userEmail,
                contact:userContact})
            }).then(response => {
                fetch("http://localhost:8080/api/users")
                .then((res) => res.json())
                .then((json) => {
                    setUsers(json);
                    console.log(json);
                });
            })
        }
        else if(userContact.length == 0 && userEmail.length == 0 && userName.length == 0)
        {
            alert("All fields are required!");
        }
        else if(userName.length == 0)
        {
            alert("Name is Required!");
        }
        else if(userEmail.length == 0)
        {
            alert("Email Address required!");
        }
        else if(!userEmail.match(validEmail))
        {
            alert("Invalid Email format!");
        }
        else if(userContact.length == 0)
        {
            alert("Contact is Required!");
        }
    }  

    function UpdateUser(id)
    {
        setIsUpdating(true);

        fetch(`http://localhost:8080/api/users/${id}`)
        .then((res) => res.json())
        .then((json) => {
            setId(json.id);
            addUserName(json.name);
            addUserEmail(json.email);
            addUserContact(json.contact);
            console.log(json);
        });
    }

    function ConfirmUpdate()
    {
        fetch(`http://localhost:8080/api/update/${id}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:userName, 
                email:userEmail,
                contact:userContact})
            }).then(response => {
                fetch("http://localhost:8080/api/users")
                .then((res) => res.json())
                .then((json) => {
                    setUsers(json);
                    console.log(json);
                });
            })
        alert("update");
    }

    const getData = (data, data2) =>
    {
        alert(data + " " + data2);
    }

    const addUser = (UserName, UserEmail, UserContact) =>
    {
        setIsUpdating(false);

        let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (UserEmail.match(validEmail) && UserName.length != 0 && UserContact != 0)
        {
            fetch("http://localhost:8080/api/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:UserName, 
                email:UserEmail,
                contact:UserContact})
            }).then(response => {
                fetch("http://localhost:8080/api/users")
                .then((res) => res.json())
                .then((json) => {
                    setUsers(json);
                    console.log(json);
                });
            })
        }
        else if(UserContact.length == 0 && UserEmail.length == 0 && UserName.length == 0)
        {
            alert("All fields are required!");
        }
        else if(UserName.length == 0)
        {
            alert("Name is Required!");
        }
        else if(UserEmail.length == 0)
        {
            alert("Email Address required!");
        }
        else if(!UserEmail.match(validEmail))
        {
            alert("Invalid Email format!");
        }
        else if(UserContact.length == 0)
        {
            alert("Contact is Required!");
        }
    }

    const updateUser = () =>
    {
        
    }

    const updateSubmit = (e) =>
    {
        setIsUpdating(e.target.value = true);
    }

    const handleBoolean = (e) =>
    {
        e.preventDefault();
        props.onSubmit(isUpdating);
        console.log(isUpdating);
    }

    return(
    <div>
       {/*  <FormPractice onSubmit={getData}/> */}

        {/* <FormComponent onSubmit={addUser}/> */}

        <Container
        justifyContent="center"
        display="flex"
        >
        <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="left">NAME</StyledTableCell>
                        <StyledTableCell align="left">EMAIL</StyledTableCell>
                        <StyledTableCell align="left">CONTACT</StyledTableCell>
                        <StyledTableCell align="left">ACTIONS</StyledTableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user) => ( 
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="user">
                                    {user.id}
                                </StyledTableCell>
                                <StyledTableCell align="left">{user.name}</StyledTableCell>
                                <StyledTableCell align="left">{user.email}</StyledTableCell>
                                <StyledTableCell align="left">{user.contact}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Stack direction="row" spacing={5}>
                                            <Button onClick={() => {ViewInfo(user.id, setGoToView(true));}} variant="contained" >VIEW</Button>
                                            <Button type="submit" onClick={() => {props.UpdateUser(user.id)}} color="success" variant="contained">UPDATE</Button>
                                            <Button onClick={() => {DeleteUser(user.id)}} color="error" variant="contained">DELETE</Button>
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </div>
    )
}

export default ContactList;