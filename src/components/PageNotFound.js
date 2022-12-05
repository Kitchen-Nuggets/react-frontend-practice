import * as React from 'react';
import Link from '@mui/material/Link';
import { Navigate } from 'react-router-dom';

function PageError()
{
    const [goBack, setGoBack] = React.useState(false);

    if (goBack) 
    {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Page not Found!</h1>
            <Link href="#" underline="always" onClick={() => {setGoBack(true);}}>
            {'Click on this link'}
            </Link>
        </div>
    );
}

export default PageError;