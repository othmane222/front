//import React from "react";
//import BannerBackground from "../components/Assets/home-banner-background.png";
//import BannerImage from "../components/Assets/home-banner-image.png";


import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import {useAuth} from "../hooks/AuthProvider";
import ComplexSearch from "../components/complexSearch";
import { useEffect } from 'react'
import CourseRequests from '../services/CourseRequests'



const Courses = () => {
    const auth = useAuth();

    useEffect(() => {

        CourseRequests.getAllSubscribedCourses(auth.user.id).then((response)=> {
                auth.setOwnedCourses(response)
                console.log(response);
            }
        )
            .catch((err) => console.log(err))
    }, [])

    if (!auth.user) {
        return <div> loading ...</div>;

    }

    return (
        <Layout>

            <h1 className={"font-bold text-3xl text-center py-12 "}>
                Welcome Back {auth.user.username}!
            </h1>
            <div id={"search-element"}>
                <ComplexSearch />


            </div>



        </Layout>
    );
};

export default Courses;
