import {Dropdown} from "flowbite-react";
import {useEffect, useState} from "react";
import AdminRequests from "../services/AdminRequests";
import coursesData from "../fake_data/courses.json"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from "react-router-dom";

import { Card } from "flowbite-react";
import img1 from "../fake_data/course_images/course-1.png";
import img2 from "../fake_data/course_images/course-2.png";
import img3 from "../fake_data/course_images/course-3.png";
import img4 from "../fake_data/course_images/course-4.png";
import img5 from "../fake_data/course_images/course-5.png";

import cat2 from "../fake_data/categories/category-2.png";
import cat3 from "../fake_data/categories/category-3.png";
import cat4 from "../fake_data/categories/category-4.png";
import cat5 from "../fake_data/categories/category-5.png";
import {useAuth} from "../hooks/AuthProvider";
const ComplexSearch = () => {

    const [courses, setCourses] = useState(coursesData);
    const images = [img1, img2, img3, img4, img5];
    const category_images = [[cat2, "Design"], [cat3,"Development"], [cat4,"machine learning and statistics"], [cat5,"Self Improvements"]];
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [alertType, setAlertType] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [search, setSearch] = useState("");
    const [focus, setFocus] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [numElements, setNumElements] = useState(1);

    const auth = useAuth();

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % courses.length);
    }
    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + courses.length) % courses.length);
    }
    const getSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 5; // for large screens
    if (width >= 768) return 3; // for small screens
    if (width >= 640) return 2; // for mobile
    return 1;
    };

    const handleLoadingCategories = () => {

        debugger;
        AdminRequests.getAllCategories().then(
            (response) => {
                setResponseMessage("Categories loaded successfully.");
                setAlertType("success");
                console.log(response.data)
                setCategories(response.data);
            }).catch((error) => {
            setResponseMessage("Signup error: " + (error.response?.data?.message || error.message));
            console.log("Signup error: " + (error.response?.data?.message || error.message));
            setAlertType("failure");
        });
    };




    useEffect(() => {
        handleLoadingCategories();
        setNumElements(getSlidesPerView());

    }, []);

    const getXgivenId = (id) => {
        return document.getElementById(id).getBoundingClientRect().left;
    }
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        }

    };
    const sliderImageUrl = [
        //First image url
        {
            url:
                "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1"
        },
        {
            url:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
        },
        //Second image url
        {
            url:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
        },
        //Third image url
        {
            url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
        }
        ];
    return (
        <div>

            <div className="mx-auto mt-5 w-screen max-w-screen-md py-20 my-9 leading-6">
                <form
                    className="relative flex w-full flex-col justify-between rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0">
                    <div className="flex">

                        <div className={"relative"}>

                            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                                    onClick={(e) => setOpen(!open)}
                                    className="text-white bg-secondary-3 rounded-md border-secondary-2 hover:bg-secondary-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-full"

                                    type="button">Filters <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                               viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
                            </svg>

                            </button>

                            <div id="dropdown"
                                 className={`w-screen max-w-screen-md  absolute left-0 top-20   z-10 ${!open ? "hidden" : "block"} bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700`}>


                                <form action="" className="flex border-t border-gray-200 lg:border-t-0">
                                    <fieldset className="w-full">
                                        <legend
                                            className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Category
                                        </legend>

                                        <div className="space-y-2 px-5 py-6">
                                            {
                                                categories.map((category) => {
                                                    console.log(category);
                                                    return (
                                                        <div className="flex items-center">
                                                            <input id={category.id} type="checkbox" name="category"
                                                                   className="h-5 w-5 rounded border-gray-300"/>

                                                            <label htmlFor={category.id}
                                                                   className="ml-3 text-sm font-medium"> {category.name} </label>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>

                                    </fieldset>

                                    <fieldset className="w-full">
                                        <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Price
                                        </legend>
                                        <div className="space-y-2 px-5 py-6">
                                            <div className="flex items-center">
                                                <input id="biggerThan" type="radio" name="Price" value="biggerThan"
                                                       className="h-5 w-5 rounded border-gray-300"/>
                                                <label htmlFor="biggerThan" className="ml-3 text-sm font-medium"> Bigger
                                                    than </label>
                                                <input type="number" className="ml-3 h-5 w-20 rounded border-gray-300"/>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="lessThan" type="radio" name="Price" value="lessThan"
                                                       className="h-5 w-5 rounded border-gray-300"/>
                                                <label htmlFor="lessThan" className="ml-3 text-sm font-medium"> Less
                                                    than </label>
                                                <input type="number" className="ml-3 h-5 w-20 rounded border-gray-300"/>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="between" type="radio" name="Price" value="between"
                                                       className="h-5 w-5 rounded border-gray-300"/>
                                                <label htmlFor="between"
                                                       className="ml-3 text-sm font-medium"> Between </label>
                                                <input type="number" className="ml-3 h-5 w-20 rounded border-gray-300"/>
                                                <label className="ml-3 text-sm font-medium"> and </label>
                                                <input type="number" className="ml-3 h-5 w-20 rounded border-gray-300"/>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset className="w-full">
                                        <legend
                                            className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Sorting
                                        </legend>
                                        <div className="space-y-2 px-5 py-6">
                                            <div className="flex items-center">
                                                <input id="ascending" type="radio" name="Sorting" value="ascending"
                                                       className="h-5 w-5 rounded border-gray-300"/>
                                                <label htmlFor="ascending"
                                                       className="ml-3 text-sm font-medium"> Ascending </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="descending" type="radio" name="Sorting" value="descending"
                                                       className="h-5 w-5 rounded border-gray-300"/>
                                                <label htmlFor="descending"
                                                       className="ml-3 text-sm font-medium"> Descending </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                                <div className="">
                                    <div className="flex justify-between border-t border-gray-200 px-5 py-3">
                                        <button name="reset" type="button"
                                                className="rounded text-xs font-medium text-gray-600 underline">Reset
                                            All
                                        </button>

                                        <button name="commit" type="button"
                                                onClick={(e) => {
                                                    setOpen(!open)
                                                }}
                                                className="rounded bg-secondary-3 px-5 py-3 text-xs font-medium text-white active:scale-95">Apply
                                            Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id={"search"} className={"relative"}>

                            <input type="name" name="search"
                                   onChange={(e) => {
                                       e.preventDefault();
                                       setSearch(e.target.value);

                                   }}
                                   onFocus={(e) => {
                                       setFocus(true)
                                   }}
                                   onBlur={(e) => {
                                       setFocus(false)
                                   }}
                                   className="ml-1 h-14 cursor-text rounded-md border py-4 w-screen outline-none ring-primary-900 sm:border-0 sm:pr-40 sm:pl-12 focus:ring max-w-lg"
                                   placeholder="Course name"/>


                        </div>
                        <div id={"results"}
                             className={`z-40  absolute top-32 sm:top-12  -left-6  w-screen max-w-screen-md ${focus ? "block " : "hidden"} `}


                        >

                            <div className="mt-4 divide-y rounded-b-xl border  shadow-lg sm:mr-32 sm:ml-28">
                                {
                                    courses.filter((course) => course.title.toLowerCase().includes(search.toLowerCase())).map((course) => {
                                            return (
                                                <div
                                                    className={"grid grid-cols-layout  grid-rows-2 cursor-pointer text-gray-600 hover:bg-secondary-3 hover:text-white grid-row-1  "}>
                                                    <img className={"row-span-2"} src={images[course.id - 1]}
                                                         alt={course.description}/>
                                                    <h1
                                                        className="mx-auto font-bold py-2">{course.title}</h1>
                                                    <div className={"grid grid-cols-layout2 "}>
                                                    <span
                                                        className={"underline hover:no-underline mx-auto"}>{course.teacher.username}</span>
                                                        <span
                                                            className={"underline hover:no-underline"}>{course.category.name}</span>

                                                    </div>
                                                </div>
                                            );
                                        }
                                    )
                                }
                            </div>

                        </div>

                    </div>
                    <button type="submit"
                            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-md bg-secondary-3 px-10 text-center align-middle text-base font-medium normal-case text-white outline-none ring-emerald-200 ring-offset-1 sm:absolute sm:right-0 sm:mt-0 sm:mr-1 sm:w-32 focus:ring">Search
                    </button>
                </form>


            </div>
            <div id={"popular-courses"} className="container mt-96 ">
                <div>
                    <h1 className={"text-xl font-bold"}>
                        Popular courses on Crafty!
                    </h1>
                </div>
                <Carousel
                    responsive={responsive}
                    autoPlay={true}
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    infinite={true}
                    partialVisible={false}
                    dotListClass="custom-dot-list-style"
                >
                    {courses.map((course, index) => {
                        console.log(index);

                        return (
                                <Card
                                    className="max-w-sm mx-2 my-6"
                                    key={index}
                                    imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                                    imgSrc={images[index]}
                                >
                                    <Link to={`/courses/${course.title}`}>
                                        <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white my-0 underline hover:no-underline">
                                            {course.title}
                                        </h5>
                                    </Link>
                                    <div className={"flex flex-col  sm:flex-row gap-2"}>

                                        <p className="mt-0.5 text-sm font-normal text-gray-700 dark:text-gray-400">
                                            {course.teacher.username} |</p>
                                        <div id={"categories"}
                                             className={"text-sm bg-blue-950 rounded-md text-white w-min text-nowrap inline-flex px-0.5 py-0.5"}>
                                            {course.category.name}

                                        </div>

                                    </div>
                                    <div className="my-0.5 flex items-center">
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span
                                            className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          5.0
        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                    <span
                                        className="text-sm font-bold text-gray-900 dark:text-white">${course.price}</span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                auth.addToCart(course);
                                            }}
                                            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </Card>
                        );
                    })}
                </Carousel>
            </div>

            <div id={"recommendation"} className="container my-20 ">
                <div>
                    <h1 className={"text-xl font-bold"}>
                        Recommanded courses for you!
                    </h1>
                </div>
                <Carousel
                    responsive={responsive}
                    autoPlay={true}
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    infinite={true}
                    partialVisible={false}
                    dotListClass="custom-dot-list-style"
                >
                    {courses.map((course, index) => {
                        console.log(index);

                        return (

                                <Card
                                    className="max-w-sm mx-2 my-6"
                                    key={index}
                                    imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                                    imgSrc={images[index]}
                                >
                                    <Link to={`/courses/${course.title}`}>
                                        <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white my-0">
                                            {course.title}
                                        </h5>
                                    </Link>
                                    <div className={"flex flex-col  sm:flex-row gap-2"}>

                                        <p className="mt-0.5 text-sm font-normal text-gray-700 dark:text-gray-400">
                                            {course.teacher.username} |</p>
                                        <div id={"categories"}
                                             className={"text-sm bg-blue-950 rounded-md text-white w-min text-nowrap inline-flex px-0.5 py-0.5"}>
                                            {course.category.name}

                                        </div>

                                    </div>
                                    <div className="my-0.5 flex items-center">
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span
                                            className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          5.0
        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                    <span
                                        className="text-sm font-bold text-gray-900 dark:text-white">${course.price}</span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                auth.addToCart(course);
                                            }}
                                            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </Card>
                        );
                    })}
                </Carousel>
            </div>


            <div id={"categories"}
                 className={" mx-auto max-w-[1300px]"}>
            <h1 className={"px-2 py-6 font-bold text-xl"}>
                Our popular Categories!
            </h1>
            <div id={"categories"}
                 className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mx-auto max-w-[1300px]"}>
                {
                    category_images.map((category, index) => {
                        const [img, name] = category;
                        return (
                            <Link to={`/course?category-name=${name}`}
                                  className="flex flex-col items-center transition-transform duration-200 hover:scale-110">
                                <img src={img} alt={name}/>
                                <p>{name}</p>
                            </Link>);
                    })
                }


            </div>
            </div>

        </div>
    );
}

export default ComplexSearch;