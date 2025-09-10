import React, { useState } from 'react';
import { Box, Typography, TextField, Divider } from '@mui/material';
import { faker } from '@faker-js/faker';

import Layout from "@/components/Layout/Layout";
import StudentTable from "@/components/StudentTable";

import { areFieldsFilled, validateEmail } from '@/utils/validation';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { CustomDialogTitle as DialogTitle } from '@/components/Dialog/DialogTitle'
import { CustomDialogContent as DialogContent } from '@/components/Dialog/DialogContent'
import { CustomDialogActions as DialogActions } from '@/components/Dialog/DialogActions'
import { CustomDialog as Dialog } from '@/components/Dialog';
import ConfirmDialog from '@/components/ConfirmDialog';
// import { useAddStudentMutation, useDeleteStudentMutation, useGetStudentsQuery } from '@/redux/studentApi';
import { withAuth } from '@/hoc/widthAuth';
import { Student } from '@/type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addUser, removeUser } from '@/redux/studentSlice';

const DashboardPage: React.FC = () => {

    const students = useSelector((state: RootState) => state.user.users)

    const [searchItem, setSearchItem] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);
    const [studentToDelete, setStudentToDelete] = useState<Student>();
    const [newStudent, setNewStudent] = useState({
        email: '',
        password: '',
        username: '',
    })
    const [createError, setCreateError] = useState('');

    const dispatch = useDispatch()

    // const { data: students = [], isLoading, isError } = useGetStudentsQuery();
    // const [ addStudent, { isLoading: addLoading, isError: addError } ] = useAddStudentMutation();
    // const [ deleteStudent, { isLoading: deleteLoading, isError: deleteError }] = useDeleteStudentMutation();



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openDelModal = () => setIsDelModalOpen(true);
    const closeDelModal = () =>  setIsDelModalOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleDeletClick = (student: Student) => {
        setStudentToDelete(student);
        openDelModal();
    }

    const handleDeleteConfirm = async () => {
        console.log("delete: ", studentToDelete)
        if (studentToDelete) {
            await dispatch(removeUser(studentToDelete.id.toString()))
            setIsDelModalOpen(false);
        }
    } 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!areFieldsFilled(newStudent)) {
            setCreateError('All fields are required')
            return;
        }

        if (!validateEmail(newStudent.email)) {
            setCreateError('Please enter a valid email address');
            return;
        }

        try {
            // const result = await addStudent(newStudent);

            const studentToAdd = {
                ...newStudent,
                id: Math.random(),
                phone: faker.phone.number(),
                dateOfAdmission:  faker.date.past().toDateString()
            }

            dispatch(addUser(studentToAdd))
            closeModal();
            setNewStudent({
                email: '',
                password: '',
                username: '',
            })            

        } catch (error) {
            console.log("Add error: ", error)
            closeModal();
        }

    }


    const handleSearch = () => {
        if (searchItem) {
            const filterdStudents = students.filter((student) => 
                student.username?.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()) 
            )

            return filterdStudents;
        }

        return students;
    }

    const filteredStudents = handleSearch();

    return (
        <Layout>            
            <Box sx={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center'
                }}
            >
                <TextField
                    label="Search..."
                    variant="outlined"
                    size="small"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    sx={{ width: '200px' }}
                />
            </Box>
            <Box sx={{  backgroundColor: '#f5f5f5ff'}}>
                <Box  sx={{
                        display: 'flex',    
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        paddingBottom: '20px',
                    }}
                >
                    <Typography sx={{fontSize: '22px', fontWeight: 'bold'}}>Students list</Typography>
                    <Box>
                        <Button
                            label='ADD NEW STUDENT'
                            onClick={openModal}
                        /> 
                    </Box>

                </Box>
                
                <Divider sx={{ margin: '0 20px', borderColor: '#E5E5E5', height: '0px' }} />

                {/* {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <CircularProgress />
                    </Box>
                )}
                
                {isError && (
                    <Typography color="error" sx={{ textAlign: 'center', padding: '20px' }}>
                        {"Failed to get students list"}
                    </Typography>
                )} */}

                 <StudentTable students={filteredStudents} onDelete={handleDeletClick} />
            </Box>

            <Dialog open={isModalOpen}>
                <DialogTitle title='Create a new student' />
                <DialogContent error={createError}>                    
                    <form onSubmit={handleSubmit}>                        
                        <TextInput
                            label="Email"
                            name="email"
                            value={newStudent.email}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            label="password"
                            name="password"
                            value={newStudent.password}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            label="username"
                            name="username"
                            value={newStudent.username}
                            onChange={handleInputChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        label='SAVE'
                        onClick={handleSubmit}
                        // disabled={addLoading}
                    />
                </DialogActions>
            </Dialog>
            {/* {addError && (
                <Typography color="error" sx={{ textAlign: 'center', padding: '20px' }}>
                    {addError}
                </Typography>
            )} */}

            <ConfirmDialog
                open={isDelModalOpen}
                onClose={closeDelModal}
                onConfirm={handleDeleteConfirm}
                title="Delete Student?"
                content={studentToDelete? `Are you sure want to delete ${studentToDelete.email}` : ''}
            />

        </Layout>
    )
}

export default withAuth(DashboardPage);