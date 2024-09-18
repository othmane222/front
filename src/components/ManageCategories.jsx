import {Button, Checkbox, Label, TextInput, Textarea, Spinner, Alert} from "flowbite-react";
import {useEffect, useState} from "react";
import AdminRequests from "../services/AdminRequests";
import {Card} from "flowbite-react";
import AdminCardCategory from "./AdminCardCategory";

const ManageCategories = () => {
    const[categories, setCategories] = useState([]);
    const [SearchName, setSearchName] = useState("");
    const [alertType, setAlertType] = useState("");
    const [alertCreated, setAlertCreated] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [isSearching, setIsSearching] = useState(false);



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
                setAlertType("failure");
            });
    };




    useEffect(() => {
        handleLoadingCategories();

    }, []);
    return (
        <div className="space-y-6">
            <div><h3 className="text-lg font-medium">Categories</h3><p
                className="text-sm text-muted-foreground">here, you can manage categories, create, update and view
                them.</p>
            </div>
            <div data-orientation="horizontal" role="none"
                 className="shrink-0 bg-border h-[1px] w-full"></div>
            <div className={"space-y-10"}>
                <h3 className={"text-lg font-medium"}>
                    Create Category
                </h3>
                <form>
                    <div className="space-y-10">
                        <div className={"space-y-6"}>
                            <Label htmlFor="category" value="Category Name" className={""}/>
                            <TextInput id="category" placeholder="Enter category name" required/>
                        </div>
                        <div className={"space-y-6"}>
                            <Label htmlFor="description" value="Description"/>
                            <Textarea id="description" placeholder="Enter category description" required/>
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

                                const category = {
                                    name: document.getElementById("category").value,
                                    description: document.getElementById("description").value
                                }

                                console.log("want to create this category")
                                console.log(category)

                                console.log(AdminRequests)
                                AdminRequests.createCategory(category).then(
                                    (response) => {
                                        setResponseMessage("category created successfully");
                                       setAlertCreated("success");
                                    }).catch((error) => {
                                    setResponseMessage("Signup error: " + (error.response?.data?.message || error.message));
                                    setAlertCreated("failure");

                                });
                                setTimeout(() => setIsCreated(false), 1000);
                            }

                        }>
                            Create!
                        </Button>
                    </div>
                </form>


            </div>

            <div>
                <div>
                    here goes search, update with delete
                </div>

                <form className=" max-w-full mx-auto py-4 space-y-10">
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className={"pb-10 hover:w-full m-auto w-11/12 transition-all duration-500 focus-within:w-full p4 ps-10 text-sm rounded-lg border border-gray-300 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-500 focus-within:ring-opacity-50 dark:focus-within:ring-opacity-50 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-within:outline-none space-y-4"}>
                        <div className="flex flex-row flex-nowrap justify-center align-middle items-center">
                            <div>
                                {
                                    isSearching ? <Spinner aria-label="Default status example"/> :

                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>

                                }
                            </div>
                            <input  type="search" id="default-search" onChange={(e) => {

                                setIsSearching(true);
                                setSearchName(e.target.value);
                                setTimeout(() => {setIsSearching(false);}, 1000);
                            }}

                                    onSubmit={(e) => e.preventDefault()}
                                    onBlur={(e) => e.preventDefault()}
                                    className="py-4 focus:ring-0 ring-0 block w-full p4 ps-10 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:outline-none"
                                    placeholder="Search Mockups, Logos..." required/>
                        </div>

                        <div className={"container grid  grid-cols-1  gap-4  mx-auto space-y-6"}>
                            {
                                categories
                                    .filter(category => SearchName.length === 0 ? true : category.name.includes(SearchName))
                                    .map(
                                        (category) => {
                                            console.log("console login category : ")
                                            console.log(category.id);
                                            return (
                                                <AdminCardCategory something={category.id} name={category.name} description={category.description} />
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

export default ManageCategories;
