import React, {useEffect, useState} from "react";
import {Container, Box, Typography,  Link } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "@/components/Button";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";

import { useLoginMutation } from "@/redux/studentApi";
import { authenticateUser } from "@/services/authService";
import { RootState } from "@/redux/store";

const SignInPage = () => {
    const [login, { isLoading }] = useLoginMutation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector((state: RootState) => state.auth.token)

    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Received")
        
        try {
            const response = await login({ email,  password }).unwrap();
            if (response) {
                const user = {
                    id:  Math.random(),
                    email: email,
                };
                authenticateUser(user, dispatch);
                router.push('/dashboard')
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }

    useEffect(() => {
        if (token) {
          router.push("/dashboard")
        }
      })

    return (
        <Box sx={{height: "100vh", display: "flex", alignItems: "center", background: 'linear-gradient(to left, #f9d423, #ec926bff)'}}>
            <Container
                maxWidth="xs"
            >
                <Card
                    title="CRUD OPERATION"
                    subtitle="Sign In"
                    detail="Enter Your credentials to access your account">
                    {/* {error && (
                        <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
                            {error}
                        </Typography>
                    )} */}

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextInput
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {isLoading ? <CustomButton label='LOGIN...' type='submit' /> : <CustomButton label='LOGIN' type='submit' />}
                        <Box>
                            <Typography variant="body2" sx={{marginTop: 2, display: "flex", justifyContent: "center"}}>
                                Don&apos;t have an account
                                <Link href="/signup" underline="hover">
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Card>
            </Container >    
        </Box>
    );
}

export default SignInPage;