import React from "react";

const FormPractice = (props) => 
{
    const [data, setData] = React.useState('');
    const [data2, setData2] = React.useState('');

    const changeMessage = (e) =>
    {
        setData(e.target.value);
    };

    const changeMessage2 = (e) =>
    {
        setData2(e.target.value);
    };

    const handelSubmit = (e) =>
    {
        e.preventDefault();
        props.onSubmit(data, data2);
    };

    return (
        <div>
            FORM PRACTICE
            <form onSubmit={handelSubmit}>
                <input type="text" value={data} onChange={changeMessage}></input>
                <input type="text" value={data2} onChange={changeMessage2}></input>
                <button type="submit">SUMBIT</button>
            </form>
        </div>
    )
}

export default FormPractice;