import img1 from "../fake_data/course_images/course-1.png";
import img2 from "../fake_data/course_images/course-2.png";
import img3 from "../fake_data/course_images/course-3.png";
import img4 from "../fake_data/course_images/course-4.png";
import img5 from "../fake_data/course_images/course-5.png";

import Layout from "../components/Layout";
import {useAuth} from "../hooks/AuthProvider";
import {useEffect, useState} from "react";
import { Button, Modal } from 'flowbite-react'
import axios from 'axios'
import CourseRequests from '../services/CourseRequests'

const Cart = () => {
    const auth = useAuth();
    const [total, setTotal] = useState(0);
    const images = [img1, img2, img3, img4, img5];
    const [bookmarked, setBookmarked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalPlacement, setModalPlacement] = useState('center')
    const [response, setResponse ] = useState("");

    useEffect(() => {
        CourseRequests.getAllSubscribedCourses(auth.user.id).then((response)=> {
            auth.setOwnedCourses(response)
            console.log(response);
        }
        )
            .catch((err) => console.log(err))
    const total = auth.cart.reduce((total, course) => total + course.price, 0);
    setTotal(total);
}, [auth.cart]);
    return (
        <Layout>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {
                                auth.cart.map(((course,index) => {

                                    return (<div
                                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                        <div
                                            className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <a href="#" className="shrink-0 md:order-1">
                                                <img className="h-20 w-30"
                                                     src={images[index % images.length]}
                                                     alt={course.description}/>
                                            </a>

                                            <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                            <div
                                                className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold text-gray-900 dark:text-white">${course.price}</p>
                                                </div>
                                            </div>

                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <a href="#"
                                                   className="text-base font-medium text-gray-900 hover:underline dark:text-white">{course.title}</a>

                                                <div className="flex items-center gap-4">
                                                    <button type="button"
                                                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
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
                                                        Add to bookmarks
                                                    </button>

                                                    <button type="button"
                                                            onClick={() => auth.removeFromCart(course.id)}
                                                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                        <svg className="me-1.5 h-5 w-5" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                             fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" stroke-linecap="round"
                                                                  stroke-linejoin="round" stroke-width="2"
                                                                  d="M6 18 17.94 6M18 18 6.06 6"/>
                                                        </svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)


                            }))
                            }
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div
                            className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                            <div className="space-y-4">

                                <dl className="flex flex-col gap-2 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    {
                                        auth.cart.map(course => {
                                                return (
                                                    <div key={course.id} className={"grid grid-cols-layout4 gap-2"}>
                                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 ml-0 ">{course.title}</dt>
                                                        <dd className="text-base font-medium text-gray-900 dark:text-white mr-0">${course.price}</dd>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                    <div className={"grid grid-cols-layout4 gap-2 pt-4 border-t-2 border-t-gray-200"}>
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">${total}</dd>
                                    </div>
                                </dl>

                            </div>

                            <button
                                onClick={() => {

                                    auth.cart.map((course) => {

                                            CourseRequests.subscribeToCourse(auth.user.id, course.id).then(
                                                (response) => {setResponse(response);
                                                    auth.setCart([]);
                                                    localStorage.setItem('cart', JSON.stringify([]));
                                                }

                                            ).catch((err)=> setResponse(err))

                                        }

                                    )
                                    console.log(response);
                                    setOpenModal(true)
                                }
                                }
                               className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed
                                to Checkout</button>
                            <Modal
                                show={openModal}
                                position={modalPlacement}
                                onClose={() => setOpenModal(false)}
                            >
                                <Modal.Header>purchase Done successfully</Modal.Header>
                                <Modal.Body>
                                    <div className="space-y-6 p-6">
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            for this demo app, purchases are done successfully because we don't have access to a payment gateway such as stripe or paypal.
                                        </p>
                                        {response.data}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => {
                                        setOpenModal(false)}}>I accept</Button>
                                    <Button color="gray" onClick={() => setOpenModal(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                <a href="#" title=""
                                   className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                    Continue Shopping
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        </Layout>
    );
}
export default Cart;