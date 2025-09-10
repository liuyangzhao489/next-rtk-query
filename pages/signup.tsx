import React, { useState, useEffect } from 'react';
import { TextField, Container, Box, Typography, Link } from '@mui/material';
import { useRouter } from 'next/router';

import Card from '@/components/Card';
import CustomButton from '@/components/Button';
import { useSignupMutation } from '@/redux/studentApi';
import { generatePersonName } from '@/utils/generateRandomName';
import { areFieldsFilled, validateEmail, validatePasswordsMatch } from '@/utils/validation';
import { authenticateUser } from '@/services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch()
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const token = useSelector((state: RootState) => state.auth.token)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const fields = { username, email, password, confirmPassword };

    if (!areFieldsFilled(fields)) {
        setError('All fields are required.');
        return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePasswordsMatch(password, confirmPassword)) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await signup({ username, email, password }).unwrap();

      if (response) {
        const user = {
          id: Math.random(),
          username: username,
          email: email,
          password: password,
        }
        const token = authenticateUser(user, dispatch)
        if (token) {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.log("error", error)
      setError('Faild to create account');
    }
  };

   useEffect(() => {
    const personName = generatePersonName();
    setUsername(personName);
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/dashboard")
    }
  })


  return (
    <Box sx={{height: "100vh", display: "flex", alignItems: "center", background: 'linear-gradient(to left, #f9d423, #ec926bff)'}}> 
        <Container maxWidth="xs">
        <Card
          title="CRUD OPERATION"
          subtitle="Sign Up"
          detail="Enter  your credentials to create your account"
        >

            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
                  {error}
              </Typography>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
              {isLoading ? <CustomButton label='REGISTER...' type='submit' /> : <CustomButton label='REGISTER' type='submit' />}
              
            </form>

            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="body2">
                Already have an account?{' '}
                <Link href="/login" underline="hover" sx={{ color: '#0073e6' }}>
                Sign In
                </Link>
            </Typography>
            </Box>
        </Card>
        </Container>
    </Box>

  );
};

export default SignUpPage;
