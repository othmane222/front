import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom";
import Layout from "./Layout";
import CourseDetailsData from "../fake_data/detailed_course.json";
import {useState} from "react";
import img1 from "../fake_data/course_images/course-2.png";
import {Image} from "lucide-react";
const CourseDetails = () => {
    const { courseName } = useParams()
    const [course, setcourse]  = useState(CourseDetailsData)
    console.log(course);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <Layout>

        <div
            id="course-homepage-header"
            className="relative flex w-full justify-center border-0 border-solid bg-secondary-3  sm:bg-right-bottom sm:bg-no-repeat sm:px-10  lg:px-6 mt-0 pt-0"
        >
            <div className="flex w-full max-w-6xl flex-col pb-0 pt-6 sm:flex-row sm:pb-8 sm:pt-8">
                <div className="static flex w-full flex-col border-0 border-solid !bg-transparent bg-blue-1100 !bg-none bg-right-bottom bg-no-repeat px-4  ray-D1200 ray-D1300 sm:w-full sm:!border-l-0 sm:p-0 sm:pr-14 lg:pr-32">
                    <div className=" sm:flex sm:flex-wrap">
                        <div className="flex flex-wrap">
                            <div className="flex items-center">
                                <Link
                                    className="bg-transparent p-0 py-1 outline-none caption-text text-gray-200 hover:text-gray-50 underline hover:no-underline cursor-pointer"
                                    to="/courses"
                                >
                                    Home
                                </Link>
                                <span className="p-0 px-6 py-1 text-gray-200 hover:text-gray-L400">
                                    &gt;
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Link className="bg-transparent p-0 py-1 outline-none caption-text text-gray-200 hover:text-gray-50 underline hover:no-underline cursor-pointer"
                                    to={`/courses/${courseName}`}>
                                    {courseName}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="m-0 pt-0 sm:pt-6">
                        <h1
                            className="heading-four m-0 mr-3 inline-block p-0 text-2xl text-gray-200 sm:text-[28px] sm:leading-9"
                            id="collection-title"
                        >
                            {courseName}
                            <div className="logged-in group relative ml-2 mr-1 !inline-block">
                                <div className="">
                                    <svg
                                        onClick={() => setBookmarked(!bookmarked)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`h-5 w-5 cursor-pointer stroke-current text-gray-L400 ${bookmarked ? 'fill-amber-300' : 'text-gray-200'}`}
                                        data-testid="course-not-bookmarked"
                                    >
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="logged-in mr-2 !inline-block">
                                <div className="logged-in flex"></div>
                            </div>
                            <div className="logged-in -mt-3 !inline-block"></div>
                        </h1>
                    </div>
                    <div>
                        <p className="body-medium mb-0 mt-3 block text-gray-200 sm:hidden">
                            {course.description}
                        </p>
                        <div className="relative flex w-full justify-center text-indigo-100 lg:static my-3">
                            <div className="w-full">
                                <div className="body-small flex flex-wrap gap-y-2.5">
                                    <div className="flex space-x-2 fill-current mr-4">
                                        By {course.teacher.username}
                                    </div>
                                    <div className="flex space-x-2 fill-current mr-4">

                                        category : {course.category.name}
                                    </div>
                                    <div className="flex space-x-2 fill-current mr-4 ">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="current"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M10 1.7a5 5 0 100 10 5 5 0 000-10zm-6.7 5a6.7 6.7 0 1113.4 0 6.7 6.7 0 01-13.4 0z"
                                                fill="current"
                                            ></path>
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M13 10.7c.5 0 1 .3 1 .8l1 7.6a.8.8 0 01-1.3.8L10 17.6 6.3 20A.8.8 0 015 19l1-7.6a.8.8 0 011.7.2l-.8 5.9L9.6 16c.2-.2.6-.2.8 0l2.7 1.6-.8-6c0-.4.3-.8.7-.9z"
                                                fill="current"
                                            ></path>
                                        </svg>
                                        <p className="body-small mb-0 ">
                                            Certificate of Completion
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="body-medium tailwind-hidden mb-0 text-gray-200 sm:block">
                            {course.description}
                        </p>
                    </div>
                    <div className="lg:mb-0 my-8 sm:mb-0 sm:mt-9">
                        <div className="flex flex-wrap gap-y-4">
                            <button
                                className="
                hidden w-full rounded border p-0 sm:w-48"
                            >
                                <span className="navigation-text px-2 py-2.5">
                                    Continue Learning
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="tailwind-hidden static h-full flex-col bg-transparent pt-0 sm:relative sm:flex sm:pt-7 lg:pt-10 lg:top-0 sm:mb-0 sm:w-[264px] sm:shrink-0 sm:transform-none">
                    <div className="sm:pb:9 relative w-full bg-primary-900 px-6 pb-0 pt-9 ray-D1500 sm:absolute sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-0 sm:ransparent ">
                        <div className="flex flex-col rounded-lg">
                            <div className="rounded-lg shadow-md">
                                <div
                                    className="rounded-lg flex flex-col border-0 bg-white ray-D1300  olid ray-D1000">
                                    <div className="flex w-full flex-col">
                                        <div className="max-h-full overflow-hidden rounded-b-xl">
                                            <div className="flex w-full flex-col bg-white ray-D1300">
                                                <div className="flex flex-col-reverse lg:flex-col px-6">
                                                    <div className="flex flex-col space-y-2 pt-6 pb-4 lg:pb-6  w-full">
                                                        <div className="flex flex-col space-y-2">
                                                                    <div>


                                                                        <img src={img1} className={""}
                                                                               alt={course.description}/>
                                                                    </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="m-0 w-full border border-gray-L200 ray-D1300" />
                                                <div className="flex w-full justify-center p-4 text-gray-L600 ray-D200">
                                                            <button className="outlined-primary m-0 w-full bg-primary-900 rounded-md px-2 py-4 border-primary-900 text-white">
                                                                Add a
                                                                certificate for
                                                                $19
                                                            </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tailwind-hidden sm:flex">
                                <div id="train-team-sm"></div>
                            </div>
                            <div className="tailwind-hidden sm:block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default CourseDetails
