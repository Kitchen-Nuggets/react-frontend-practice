import React from 'react';
import ContactList from './ContactList';
import Form from './Form';

function Main() 
{
    const [user, setUser] = React.useState();
    const [users, setUsers] = React.useState();

    function UpdateUser(id)
    {
        fetch(`http://localhost:8080/api/users/${id}`)
        .then((res) => res.json())
        .then((json) => {
            setUser(json);
            console.log(json);
        });
    }

    function ReloadTable()
    {
        fetch("http://localhost:8080/api/users")
        .then((res) => res.json())
        .then((json) => {
            setUsers(json);
            console.log(json);
        });
    }
 
    return (
        <div>
            <Form user={user} ReloadTable={ReloadTable} />
            <ContactList UpdateUser={UpdateUser} users={users}/>
        </div>
    )
}

export default Main