import React from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import Image from 'next/image';

interface Student {
  id: number;
  username?: string;
  email: string;
  phone?: string;
  enrollNumber?: string;
  dateOfAdmission?: string;
}

interface StudentTableProps {
  students: Student[];
  onDelete: (studentId: Student) => void
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5', padding: '20px'}}>
      <Table sx={{ border: 'none' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: 'none' }}></TableCell>
            <TableCell sx={{ border: 'none' }}>Name</TableCell>
            <TableCell sx={{ border: 'none' }}>Email</TableCell>
            <TableCell sx={{ border: 'none' }}>Phone</TableCell>
            <TableCell sx={{ border: 'none' }}>Enroll Number</TableCell>
            <TableCell sx={{ border: 'none' }}>Date of Admission</TableCell>
            <TableCell sx={{ border: 'none' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: '#ffff'
              }}
            >
              <TableCell sx={{ border: 'none', padding: '8px' }}>
                <Image
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Profile"
                  width={50}
                  height={50}
                  style={{ borderRadius: '10%', marginBottom: '10px' }}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', padding: '8px' }}>{student.username}</TableCell>
              <TableCell sx={{ border: 'none', padding: '8px' }}>{student.email}</TableCell>
              <TableCell sx={{ border: 'none', padding: '8px' }}>{student.phone}</TableCell>
              <TableCell sx={{ border: 'none', padding: '8px' }}>{student.enrollNumber}</TableCell>
              <TableCell sx={{ border: 'none', padding: '8px' }}>{student.dateOfAdmission}</TableCell>
              <TableCell sx={{ border: 'none', padding: '8px' }}>
                <IconButton>
                  <Link href={`/dashboard/detail/${student.id}`}>
                    <EditIcon />
                  </Link>
                </IconButton>
                <IconButton onClick={() => onDelete(student)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
