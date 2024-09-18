//import React from "react";
//import BannerBackground from "../components/Assets/home-banner-background.png";
//import BannerImage from "../components/Assets/home-banner-image.png";

import { FaCheckCircle } from "react-icons/fa";

import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import {useAuth} from "../hooks/AuthProvider";
import {Link} from "react-router-dom";
import {Card} from "flowbite-react";
import { useEffect, useState } from 'react'
import coursesData from "../fake_data/courses.json";
import img1 from "../fake_data/course_images/course-1.png";
import img2 from "../fake_data/course_images/course-2.png";
import img3 from "../fake_data/course_images/course-3.png";
import img4 from "../fake_data/course_images/course-4.png";
import img5 from "../fake_data/course_images/course-5.png";
import CourseRequests from '../services/CourseRequests'


const DashBoard = () => {
    const auth = useAuth();

    const [courses, setCourses] = useState(coursesData);
    const [continuewatching, watched, upcoming, ...bookmark] = courses;
    const images = [img1, img2, img3, img4, img5];
    const [continuewatching_img, watched_img, upcoming_img, ...bookmark_img] = images;


    useEffect(() => {

        CourseRequests.getAllSubscribedCourses(auth.user.id).then((response)=> {
                auth.setOwnedCourses(response)
                console.log(response);
            }
        )
            .catch((err) => console.log(err))
    }, [])

    return (
        <Layout>

            <h1 className={"font-bold text-3xl text-center py-12 "}>
                Welcome Back {auth.user.username}!
            </h1>
            <div className={"my-10 "}>
                <div className={"grid grid-cols-1 w-screen mx-20 sm:max-w-sm md:max-w-6xl md:mx-auto sm:grid-cols-2 gap-2 bg-gray-50 px-10 py-10"}>
                    <div id={"column-1"} className={" sm:border-r-4 border-r-black grid grid-rows-layout4"}>
                        <div id={"continue-watching"}  className={"py-10"}>
                            <h1 className={"font-semibold text-2xl px-2 py-2"}>
                                continue watching...
                            </h1>

                            <Link className={""} to={`/courses/${continuewatching.title}`}>
                                <div className={"grid grid-rows-layout4"}>
                                    <div>
                                    <img src={continuewatching_img} alt={"course"} className={"px-2 py-4 w-7/12"}/>
                                    </div>
                                    <div>

                                    <h2 className={"font-semibold text-xl px-2 py-1"}>
                                        {continuewatching.title}
                                    </h2>
                                    <p className={"font-light px-2 py-0  text-md"}>
                                        by {continuewatching.teacher.username}
                                    </p>
                                    </div>

                                </div>
                            </Link>
                        </div>

                        <div id={"previously-watched"} className={"font-semibold text-2xl px-2 py-4"}>
                            <h1>
                                previously watched
                            </h1>

                            <Link to={`/courses/${watched.title}`}>

                                <div
                                    className={"grid grid-cols-layout3  grid-rows-2 cursor-pointer text-gray-600 hover:bg-gray-100  grid-row-1 max-h-10 my-2 gap-0"}>
                                    <img className={"row-span-2 h-10"} src={watched_img} alt={watched.description} />
                                    <div>

                                    <h1
                                        className="text-base ml-0 pl-0 font-semibold ">{watched.title}</h1>
                                    <div className={"grid grid-cols-layout2 "}>
                                                    <span
                                                        className={"text-sm underline hover:no-underline ml-0"}>{watched.teacher.username}</span>
                                        <span
                                            className={"text-sm underline hover:no-underline"}>{watched.category.name}</span>

                                    </div>

                                    </div>
                                    <div className={"rounded-[999999px] bg-gray-100 mx-auto h-10 w-10"}>

                                        <FaCheckCircle />

                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>

                    <div id={"column-2"} className={" grid grid-rows-layout4"}>
                        <div id={"upcoming"}  className={"py-10"}>
                            <h1 className={"font-semibold text-2xl px-2 py-2"}>
                                upcoming...
                            </h1>

                            <Link className={""} to={`/courses/${upcoming.title}`}>
                                <div className={"grid grid-rows-layout4"}>
                                    <div>
                                        <img src={upcoming_img} alt={"course"} className={"px-2 py-4 w-7/12"}/>
                                    </div>
                                    <div>

                                        <h2 className={"font-semibold text-xl px-2 py-1"}>
                                            {upcoming.title}
                                        </h2>
                                        <p className={"font-light px-2 py-0  text-md"}>
                                            by {upcoming.teacher.username}
                                        </p>
                                    </div>

                                </div>
                            </Link>
                        </div>

                        <div id={"bookmarked"}>
                            <h1 className={"font-semibold text-2xl px-2 py-4"}>
                                bookmarked
                            </h1>

                            <div>
                                {
                                    bookmark.map((course, index) => {
                                        return (
                                            <Link to={`/courses/${watched.title}`}>

                                                <div
                                                    className={"grid grid-cols-layout3  grid-rows-2 cursor-pointer text-gray-600 hover:bg-gray-100  grid-row-1 max-h-10 my-2 gap-0"}>
                                                    <img className={"row-span-2 h-10"} src={bookmark_img[index]} alt={bookmark[index].description} />
                                                    <div>

                                                        <h1
                                                            className="text-base ml-0 pl-0 font-semibold ">{course.title}</h1>
                                                        <div className={"grid grid-cols-layout2 "}>
                                                    <span
                                                        className={"text-sm underline hover:no-underline ml-0"}>{course.teacher.username}</span>
                                                            <span
                                                                className={"text-sm underline hover:no-underline"}>{course.category.name}</span>

                                                        </div>

                                                    </div>
                                                    <div className={"rounded-[999999px] bg-gray-100 mx-auto h-10 w-10"}>

                                                        <svg

                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className={`w-9 h-8 mx-auto mt-0 cursor-pointer stroke-current text-gray-L400 fill-amber-300`}
                                                            data-testid="course-not-bookmarked"
                                                        >
                                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                                        </svg>

                                                    </div>
                                                </div>
                                            </Link>

                                        );
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </Layout>
);
};

export default DashBoard;
