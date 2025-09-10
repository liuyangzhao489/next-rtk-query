import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

import { setCredentials, logOut } from './authSlice';
import { AuthResponse, LoginCredentials, SignupCredentials } from "@/type";
import { RootState } from "./store";
 
export interface Student {
    id: number,
    name: {
        firstname: string;
        lastname: string;
    },
    email: string,
    phone: string,
    enrollNumber: string;
    dateOfAdmission: string;
    username: string;
    password?: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
    prepareHeaders: (headers, { getState }) => {

        if (typeof window !== 'undefined') {
            const token = Cookies.get('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
        return headers
    },
});

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery,
    tagTypes: ['Students'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginCredentials> ({
            query: (credentials) => ({
                url: '/users',
                method: 'POST',
                body: credentials,
            }),
            // async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled;
            //         dispatch(setCredentials(data));
            //         Cookies.set('token', data.token, { expires: 7 });
            //     } catch (error) {
            //         console.error('Login failed', error);
            //     }
            // },
        }),
        signup: builder.mutation<AuthResponse, SignupCredentials>({
            query: (credentials) => ({
                url: '/users',
                method: 'POST',
                body: credentials,
            }),
            // async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled;
            //         dispatch(setCredentials(data));
            //         Cookies.set('token', data.token, { expires: 7 });
            //     } catch (error) {
            //         console.error('Sign-up failed', error);
            //     }
            // },
        }),
        
        getStudents: builder.query<Student[], void>({
            query: () => 'users',
            providesTags: ['Students']
        }),
        getStudentById: builder.query<Student, string>({
            query: (id) => `/users/${id}`,
        }),
        addStudent: builder.mutation<Student, Partial<Student>>({
            query: (newStudent) => ({
                url: 'users',
                method: 'POST',
                body: newStudent
            }),
            invalidatesTags: ['Students']
        }),
        updateStudent: builder.mutation<Student, {id: number; data: Partial<Student>}>({
            query: ({id, data}) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Students']
        }),
        deleteStudent: builder.mutation<Student, {id: number}>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'Delete',
            }),
            invalidatesTags: ['Students']
        })
    })
})


export const {
    useLoginMutation,
    useSignupMutation,
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} = studentApi;