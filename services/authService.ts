import { setCredentials } from "@/redux/authSlice";
import { AppDispatch } from "@/redux/store";
import { Student } from "@/type";


const FAKE_API_URL = 'https://fakestoreapi.com/users';

export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${FAKE_API_URL}`);
    const users = await response.json();

    const user = users.find((user: Student) => user.email === email);
    if (user && password === password) {
        return { user: {id: user.id, name: user.name}, token: 'fake-jwt-token'}
    }

    throw new Error('Invalid email or password')
};

export const signUpUser = async (name: string, email: string, password: string) => {
    const newUser = {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        password,
    }

    return { user: { id: newUser.id, name: newUser.name }, token: 'fake-jwt-token' };

}


export const authenticateUser = (
    user: Student,
    dispatch: AppDispatch
): string => {

    const fakeToken = "fake-jwt-token-for-now";
 
    dispatch(setCredentials({ user, token: fakeToken }));

  return fakeToken;
};
