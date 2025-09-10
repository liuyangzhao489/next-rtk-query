import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Grid } from '@mui/material';
import { School, Person, Email } from "@mui/icons-material";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import { useGetStudentByIdQuery } from "@/redux/studentApi";
import DetailCard from "@/components/DetailCard";
import Layout from "@/components/Layout/Layout";


const Detail = () => {
    const router = useRouter();
    const { id } = router.query
    const {
        data: student,
        isLoading: studentLoading,
    } = useGetStudentByIdQuery(id as string);



    const studentData = [
        {
            icon: <School sx={{ fontSize: "30px", color: "#74C1ED"}}/>,
            subtitle: student? student.id : '',
            title: "ID",
            color: "#F0F9FF"
        },
        {
            icon: <Email sx={{ fontSize: "30px", color: "#EE95C5"}}/>,
            subtitle: student ? student.email : '',
            title: "Email",
            color: "#FEF6FB"
        },
        {
            icon: <Person sx={{ fontSize: "30px", color: "#FFFF"}}/>,
            subtitle: student ? student.username : '',
            title: "USER NAME",
            color: "#FEAF00"
        },
    ]

    return (
        <Layout>
            <Box sx={{ padding: "20px"}}>
                <Link href="/dashboard">
                    <ArrowCircleLeftOutlinedIcon sx={{ fontSize: "25px" }} />
                </Link>                
            </Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginLeft: "50px" }}>
            {
                studentData.map((data, index) => (
                    <DetailCard
                        key={index}
                        loading={studentLoading}
                        icon={data.icon}
                        subtitle={String(data.subtitle)}
                        title={data.title}
                        color={data.color}
                    />
                ))
            }
            </Grid>
        </Layout>
       
    )
}

export default Detail;