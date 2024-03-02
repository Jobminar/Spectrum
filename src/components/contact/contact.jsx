import './contact.css';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'mobile' ? Number(value) : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handlesubmit= async()=>{
        console.log(formData)
        try{
            const response=await fetch("https://sgl-be.onrender.com/postcontact",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify(formData),
            })
            if (response.ok){
                console.log("Data posted succesfully")
                alert("Agent will reach you")
            }else{
                console.log("Error to send the data")
                alert("Falid to send Data")
            }
        }
        catch(error){
            console.log("Getting error",error)
        }
    }
    
//   console.log(formData)
    return (
        <>
            <h1>Contact us</h1>
            <div className="contact-con">
                <TextField
                    className='inputs'
                    id="outlined-multiline-flexible"
                    label="Name"
                    multiline
                    maxRows={4}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type='text'
                />
                <TextField
                    className='inputs'
                    id="outlined-multiline-flexible"
                    label="Email"
                    multiline
                    maxRows={4}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type='email'
                />
                <TextField
                    className='inputs'
                    id="outlined-multiline-flexible"
                    label="Mobile No"
                    multiline
                    maxRows={4}
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    type='number'
                />
                <TextField 
                    className='inputs'
                    id="outlined-multiline-flexible"
                    label="Message"
                    multiline
                    maxRows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    type='text'
                />
                 <Button  sx={{
                        background: "#F4821F",
                        borderRadius: "10px",
                        color: "white",
                        '&:hover': {
                        background: "#F4821F", // Maintaining the same background color on hover
                        // Add any other styles you want to maintain on hover
                        },
                    }} 
                    onClick={handlesubmit}
                     className='submit'>
                     submit
                </Button>
            </div>
            {/* <p>Entered Name: {formData.name}</p>
            <p>Entered Email: {formData.email}</p>
            <p>Entered Mobile No: {formData.mobileNo}</p>
            <p>Entered Message : {formData.message}</p> * */}
        </>
    );
};

export default Contact;
