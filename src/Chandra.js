import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

 function FormDialog() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  const [receivedResetToken, setReceivedResetToken] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          whatsapp,
          imageBase64,
        }),
      });

      const data = await response.json();
      setMessage(data.message);
      // Refresh the user list after successful signup
      handleGetAllUsers();
    } catch (error) {
      console.error(error);
      setMessage('Error during signup. Please check the console for details.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();
      setLoginMessage(data.message);
    } catch (error) {
      console.error(error);
      setLoginMessage('Error during login. Please check the console for details.');
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/getAllUsers');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:4000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: resetEmail,
        }),
      });

      const data = await response.json();
      setResetMessage(data.message);

      // Log the reset token in the console
      console.log('Received Reset Token:', data.resetToken);
      setReceivedResetToken(data.resetToken);
    } catch (error) {
      console.error(error);
      setResetMessage('Error during forgot password. Please check the console for details.');
    }
  };

  const handleResetPassword = async () => {
    try {
      // Trim leading and trailing spaces from resetToken
      const trimmedResetToken = resetToken.trim();

      const response = await fetch(`http://localhost:4000/reset-password/${trimmedResetToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      const data = await response.json();
      setResetPasswordMessage(data.message);
    } catch (error) {
      console.error(error);
      setResetPasswordMessage('Error during reset password. Please check the console for details.');
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <h2>Signup</h2>
          {/* Your signup form JSX */}
          <button onClick={handleSignup}>Signup</button>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>

        {/* Your login form JSX */}
        <h2>Login</h2>
        {/* Your login form JSX */}
        <button onClick={handleLogin}>Login</button>
        <p>{loginMessage}</p>

        {/* Your forgot password form JSX */}
        <hr />
        <h2>Forgot Password</h2>
        {/* Your forgot password form JSX */}
        <button onClick={handleForgotPassword}>Send Reset Link</button>
        <p>{resetMessage}</p>

        {/* Your reset password form JSX */}
        <hr />
        <h2>Reset Password</h2>
        {/* Your reset password form JSX */}
        <button onClick={handleResetPassword}>Reset Password</button>
        <p>{resetPasswordMessage}</p>

        <hr />

        {receivedResetToken && (
          <div>
            <h2>Received Reset Token</h2>
            <p>{receivedResetToken}</p>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default Chandra