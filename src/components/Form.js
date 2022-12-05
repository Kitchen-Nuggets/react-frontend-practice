import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import Button from '@mui/material/Button';
import React from "react";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const FormComponent = (props) =>
{
    const [isFormUpdating, setFormIsUpdating] = React.useState(false);

    const [nameR, setNameR] = React.useState(false);
    const [emailR, setEmailR] = React.useState(false);
    const [contactR, setContactR] = React.useState(false);

    const [userName, addUserName] = React.useState('');
    const [userEmail, addUserEmail] = React.useState('');
    const [userContact, addUserContact] = React.useState('');

    useEffect(() => 
    {
        if (props.user !== undefined)
        {
            setFormIsUpdating(true);

            addUserName(props.user.name);
            addUserEmail(props.user.email);
            addUserContact(props.user.contact);
        }
    }, [props.user])

    function CancelUpdate()
    {
        setFormIsUpdating(false);
        addUserName("");
        addUserEmail("");
        addUserContact("");

        setNameR(false);
        setEmailR(false);
        setContactR(false);
    }

    function ClearFields()
    {
        addUserName("");
        addUserEmail("");
        addUserContact("");

        setNameR(false);
        setEmailR(false);
        setContactR(false);
    }
    
    function ConfirmUpdate()
    {
        let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (userEmail.match(validEmail) && userName.length != 0 && userContact != 0)
        {
            fetch(`http://localhost:8080/api/update/${props.user.id}`,
            {
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
                props.ReloadTable();
                addUserName("");
                addUserEmail("");
                addUserContact("");

                setFormIsUpdating(false);
            })

            alert("Updated");
        }

        if(userName.length == 0)
        {
            setNameR(true);
        }
        else
        {
            setNameR(false);
        }

        if(userContact.length == 0)
        {
            setContactR(true);
        }
        else
        {
            setContactR(false);
        }

        if(userEmail.length == 0)
        {
            setEmailR(true);
        }
        else if(!userEmail.match(validEmail))
        {
            setEmailR(false);
            alert("Invalid Email format!");
        }
        else
        {
            setEmailR(false);
        }
    }

    function AddUser()
    {
        setFormIsUpdating(false);

        let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (userEmail.match(validEmail) && userName.length != 0 && userContact != 0)
        {
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
                props.ReloadTable();
                addUserName("");
                addUserEmail("");
                addUserContact("");
            })
        } 

        if(userName.length == 0)
        {
            setNameR(true);
        }
        else
        {
            setNameR(false);
        }

        if(userContact.length == 0)
        {
            setContactR(true);
        }
        else
        {
            setContactR(false);
        }

        if(userEmail.length == 0)
        {
            setEmailR(true);
        }
        else if(!userEmail.match(validEmail))
        {
            setEmailR(false);
            alert("Invalid Email format!");
        }
        else
        {
            setEmailR(false);
        }
    }  

    const addName = (e) =>
    {
        addUserName(e.target.value);
    };

    const addEmail = (e) =>
    {
        addUserEmail(e.target.value);
    };

    const addContact = (e) =>
    {
        addUserContact(e.target.value);
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        props.onSubmit(userName, userEmail, userContact);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Container
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '90%' },
                }}
                noValidate
                autoComplete="off"

                display="flex"
                justifyContent="left"
                alignItems="center"
                minHeight="100vh"
                paddingLeft="250px"
                paddingRight="250px"
                >
                    { nameR
                    ? <TextField label="Name" variant="filled" value={userName} onChange={addName} required helperText="This field is required." error></TextField>
                    : <TextField label="Name" variant="filled" value={userName} onChange={addName} required></TextField>
                    }
            </Container>

            <Container
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '90%' },
                }}
                noValidate
                autoComplete="off"

                display="flex"
                justifyContent="left"
                alignItems="center"
                minHeight="100vh"
                paddingLeft="250px"
                paddingRight="250px"
                >
                    { emailR
                    ? <TextField label="Email" variant="filled" value={userEmail} onChange={addEmail} required helperText="This field is required." error></TextField>
                    : <TextField label="Email" variant="filled" value={userEmail} onChange={addEmail} required></TextField>
                    }
            </Container>

            <Container
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '90%' },
                }}
                noValidate
                autoComplete="off"

                display="flex"
                justifyContent="left"
                alignItems="center"
                minHeight="100vh"
                paddingLeft="250px"
                paddingRight="250px"
                >
                    { contactR
                    ? <TextField label="Contact" variant="filled" value={userContact} onChange={addContact} required helperText="This field is required." error></TextField>
                    : <TextField label="Contact" variant="filled" value={userContact} onChange={addContact} required></TextField>
                    }
            </Container>

                <Stack direction="row" spacing={2} display="flex" justifyContent="center" marginBottom={2} marginTop={2}>
                    { isFormUpdating
                    ? <><Button color="success" variant="contained" onClick={() => {ConfirmUpdate()}}>UPDATE</Button><Button onClick={() => {CancelUpdate()}} color="error" variant="contained">CANCEL</Button></> 
                    : <><Button color="success" variant="contained" onClick={() => {AddUser()}} >ADD</Button><Button onClick={() => {ClearFields()}} variant="contained">CLEAR</Button></> 
                    }
                </Stack>
            </form>

            {/* <ContactList/> */}
        </div>
    )
}

export default FormComponent;