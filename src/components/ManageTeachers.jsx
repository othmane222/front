import {Button, Checkbox, Label, TextInput, Textarea, Spinner, Alert} from "flowbite-react";
import {useEffect, useState} from "react";
import AdminRequests from "../services/AdminRequests";
import {Card} from "flowbite-react";
import AdminCardCategory from "./AdminCardCategory";
import AdminCardUser from "./AdminCardUser";
const ManageTeachers = () => {
    const[users, setUsers] = useState([]);
    const [SearchName, setSearchName] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [responseMessage, setResponseMessage] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [alertCreated, setAlertCreated] = useState("");




    const handleSearchUsers = (name) => {

        AdminRequests.searchUsersByNameAndRole(name,"TEACHER").then(
            (response) => {
                setResponseMessage("Categories loaded successfully.");
                setAlertType("success");
                console.log("this is data \n" + response.data);
                setUsers(response.data);
            }).catch((error) => {
            setResponseMessage("loading users failed : " + (error.response?.data?.message || error.message));
            setAlertType("error");
        });
    };





    return (
        <div className="space-y-6">
            <div><h3 className="text-lg font-medium">Teachers</h3><p
                className="text-sm text-muted-foreground">here, you can manage Teachers, update and delete
                them.</p>
            </div>
            <div className={"space-y-10"}>
                <h3 className={"text-lg font-medium"}>
                    Add Teacher
                </h3>
                <form>
                    <div className="space-y-4">
                        <div className={"space-y-6"}>
                            <Label htmlFor="category" value="Teacher's name" className={""}/>
                            <TextInput id="username" placeholder="Enter teacher's name" required/>
                        </div>
                        <div className={"space-y-6"}>
                            <Label htmlFor="description" value="Email"/>
                            <TextInput type="email" id="email" placeholder="teacher@gmail.com" required/>
                        </div>
                        <div className={"space-y-6"}>
                            <Label htmlFor="description" value="password"/>
                            <TextInput type="password" id="password" placeholder="****" required/>
                        </div>
                        <div className={"space-y-6"}>
                            <Label htmlFor="description" value="Repeat password"/>
                            <TextInput type="required-password" id="required-password" placeholder="*****" required/>
                        </div>


                        <div className={"px-2 py-4"}>

                            {alertCreated.length === 0 ? <></> :
                                <Alert color={alertType} onDismiss={(e) => {
                                    setAlertType("")
                                }}>
                                    <span className="font-medium">Info! </span>{responseMessage}
                                </Alert>
                            }
                        </div>
                        <Button size="xl" isProcessing={isCreated} outline onClick={
                            (e) => {
                                setIsCreated(true);

                                const user = {
                                    username: document.getElementById("username").value,
                                    email: document.getElementById("email").value,
                                    password : document.getElementById("password").value,
                                    role : "TEACHER"
                                }

                                console.log("want to create this user")
                                console.log(user)

                                console.log(AdminRequests)
                                if (user.password !== document.getElementById("required-password").value){
                                    console.log("passwords do not match")
                                    setResponseMessage("Passwords do not match");
                                    setAlertCreated("failure");
                                    setTimeout(() => setIsCreated(false), 1000);
                                }
                                else {

                                AdminRequests.createUser(user).then(
                                    (response) => {
                                        setResponseMessage("category created successfully");
                                        console.log(response)
                                        setAlertCreated("success");
                                    }).catch((error) => {
                                    console.log(error);
                                    setResponseMessage("user Creation failed: " + (error.response?.data?.message || error.message));
                                    setAlertCreated("failure");

                                });
                                setTimeout(() => setIsCreated(false), 1000);
                            }

                        }}>
                            Create!
                        </Button>
                    </div>
                </form>


            </div>

            <div data-orientation="horizontal" role="none"
                 className="shrink-0 bg-border h-[1px] w-full"></div>
            <div className={"space-y-10"}>
                <h3 className={"text-lg font-medium"}>
                    Update or Delete Teachers
                </h3>
                <form className=" max-w-full mx-auto py-10 space-y-10">
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div
                        className={"pb-10 hover:w-full m-auto w-11/12 transition-all duration-500 focus-within:w-full p4 ps-10 text-sm rounded-lg border border-gray-300 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-500 focus-within:ring-opacity-50 dark:focus-within:ring-opacity-50 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-within:outline-none space-y-4"}>
                        <div className="flex flex-row flex-nowrap justify-center align-middle items-center">
                            <div>
                                {
                                    isSearching ? <Spinner aria-label="Default status example"/> :

                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>

                                }
                            </div>
                            <input type="search" id="default-search" onChange={(e) => {

                                setIsSearching(true);
                                setSearchName(e.target.value);
                                handleSearchUsers(e.target.value);

                                setTimeout(() => {
                                    setIsSearching(false);
                                }, 1000);
                            }}

                                   onSubmit={(e) => {
                                       e.preventDefault()
                                       handleSearchUsers(SearchName);
                                   }}
                                   onBlur={(e) => e.preventDefault()}
                                   className="py-4 focus:ring-0 ring-0 block w-full p4 ps-10 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:outline-none"
                                   placeholder="Search Mockups, Logos..." required/>
                        </div>

                        <div className={"container grid  grid-cols-1  gap-4  mx-auto space-y-6"}>
                            {
                                users
                                    .filter((user) => user.role === "TEACHER")
                                    .map(
                                        (user) => {
                                            console.log(user);
                                            return (
                                                <AdminCardUser something={user.id} username={user.username}
                                                               email={user.email} role={user.role}/>
                                            )

                                        }
                                    )
                            }
                        </div>


                    </div>

                </form>

            </div>
        </div>
    )
}

export default ManageTeachers;
