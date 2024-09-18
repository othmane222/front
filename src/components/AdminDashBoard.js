import {BrowserRouter as Router, Routes, Route, Link, Outlet, redirect} from "react-router-dom";

import ManageUsers from "./ManageStudents";
import ManageCategories from "./ManageCategories";
import ManageTeachers from "./ManageTeachers";

const AdminDashBoard = () => {
    return (

        <div className={"max-w-1xl sm:max-w-3xl md:max-w-7xl mx-auto"}>
            <div className=" space-y-6 p-6 pb-16 md:block">
                <div className="space-y-0.5"><h2 className="text-2xl font-bold tracking-tight">Admin DashBoard</h2><p
                    className="text-muted-foreground">Manage your Users and platform.</p></div>
                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ">
                            <div className={" flex flex-col space-y-2 hover:bg-muted px-2 py-4 justify-start"}>
                                <Link to="/admin/manage-categories">
                                    <h3 className="text-lg font-semibold inline-flex items-center whitespace-nowrap rounded-md  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted hover:underline justify-start">
                                        Categories
                                    </h3>
                                </Link>
                                <p className="text-muted-foreground px-4">Manage course categories.</p>
                            </div>
                            <div className={" flex flex-col space-y-2 hover:bg-muted px-2 py-4 justify-start"}>
                                <Link to="/admin/manage-users">
                                    <h3 className="text-lg font-semibold inline-flex items-center whitespace-nowrap rounded-md  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted hover:underline justify-start">
                                        Students
                                    </h3>
                                </Link>
                                <p className="text-muted-foreground px-4">Manage platform Students.</p>
                            </div>

                            <div className={" flex flex-col space-y-2 hover:bg-muted px-2 py-4 justify-start"}>
                                <Link to="/admin/manage-courses">
                                    <h3 className="text-lg font-semibold inline-flex items-center whitespace-nowrap rounded-md  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted hover:underline justify-start">
                                       Teachers
                                    </h3>
                                </Link>
                                <p className="text-muted-foreground px-4">Manage platform Teachers.</p>
                            </div>
                        </nav>
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;