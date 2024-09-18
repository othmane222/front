import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import ManageUsers from "./ManageStudents";
import ManageCategories from "./ManageCategories";
import ManageTeachers from "./ManageTeachers";
import {useState} from "react";

const AdminSettings = () => {
    const [tab, setTab] = useState("profile");
    return (

        <div className={"container"}>
            <div className=" space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5"><h2 className="text-2xl font-bold tracking-tight">Settings</h2><p
                    className="text-muted-foreground">Manage your Users and platform.</p></div>
                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <section id={"categories"} className={"flex-row space-x-1"}>


                        <div>
                            <h3 className="text-lg font-semibold">Categories</h3>
                            <p className="text-muted-foreground">Manage course categories.</p>
                        </div>
                        <div>

                            <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
                            <section className="py-20 mx-auto space-y-8 sm:py-20">
                            <div style={{width: '800px'}} className="container flex flex-row items-stretch justify-center w-full max-w-4xl space-x-12">
                            <div className="flex flex-col justify-start w-1/4 space-y-4">
                                <a className={`px-4 py-2 text-sm ${tab === 1 ? 'z-20 border-l-2 transform translate-x-2 border-blue-500 font-bold' : 'transform -translate-x-2'}`} href="#" onClick={(e) => { e.preventDefault(); setTab(1); }}>
                                    BATMAN & ROBIN
                                </a>
                                {/* Repeat for other tabs */}
                            </div>
                            <div className="w-3/4">
                                {tab === 1 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold leading-tight">
                                            BATMAN & ROBIN
                                        </h3>
                                        {/* Other content */}
                                    </div>
                                )}
                                {/* Repeat for other tabs */}
                            </div>
                        </div>
                    </section>
                </div>

                        </div>


                    </section>

                </div>
            </div>
        </div>
    );
}

export default AdminSettings;
