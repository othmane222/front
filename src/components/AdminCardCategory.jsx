import { useState } from 'react';

import {Button, TextInput , Label} from "flowbite-react";
import AdminRequests from "../services/AdminRequests";
import {Alert} from "flowbite-react";
import { HiEye, HiInformationCircle } from "react-icons/hi";
const AdminCardCategory = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [id, setId] = useState(props.something);
    const [isProcessingEdit, setIsProcessingEdit] = useState(false);
    const [isProcessingDelete, setIsProcessingDelete] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isDeleteAlert, setIsDeleteAlert] = useState(false);
    const [isVisibility, setIsVisibility] = useState(true);



    const handleDelete = () => {
        setIsProcessingDelete(true);
        console.log(props)

        debugger;
        AdminRequests.deleteCategory(id).then(
            (response) => {
                setResponseMessage("User got Deleted successfully.");
                setAlertType("success");

                setTimeout(()=>setIsProcessingDelete(false), 1000);
                setIsDeleteAlert(false);
                setIsVisibility(false);

            }).catch((error) => {
            setResponseMessage("Deletion error: " + (error.response?.data?.message || error.message));
            setAlertType("failure");
            setIsDeleteAlert(false);

            setTimeout(()=>setIsProcessingDelete(false), 1000);
        });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        // Add your update logic here
        setIsProcessingEdit(true);

        setIsEditing(false);

        AdminRequests.updateCategory(id, {name, description}).then(
            (_response) => {
                setResponseMessage("Category got Updated successfully.");
                setAlertType("success");
                setTimeout(()=>setIsProcessingEdit(false), 1000);
            }).catch((error) => {

            setResponseMessage("Update error: " + (error.response?.data?.message || error.message));
            setAlertType("failure");

            setTimeout(()=>setIsProcessingEdit(false), 1000);
        });
    }


    return (
        <div>
        {isVisibility &&
        <form className={"flex flex-col space-y-3 group"}>
            <div data-orientation="horizontal" role="none"
                 className="shrink-0 bg-border h-[1px] w-full"></div>
            <div className="md:w-4/10 mt-4">
                {isEditing ? (
                    <TextInput
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-xl font-medium tracking-tight text-gray-900 dark:text-white my-2"
                    />
                ) : (
                    <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                        {name}
                    </h5>
                )}

                {isEditing ? (
                    <TextInput
                        type="text"
                        sizing={"lg"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="font-normal text-gray-700 dark:text-gray-400 my-2"
                    />
                ) : (
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            <div className={`text-sm text-${alertType} dark:text-${alertType} font-medium`}>
                {alertType.length === 0 ? <></> :
                    <Alert color={alertType} onDismiss={(e) => {
                        setAlertType("")
                    }}>
                        <span className="font-medium">Info! </span>{responseMessage}
                    </Alert>
                }
            </div>
            {isDeleteAlert &&
                <div>
                    <Alert additionalContent={<div>
                        <div className={"flex flex-row gap-2"}>
                            <Button color="red" size="xs" onClick={(e) => {
                                handleDelete(e);
                            }} isProcessing={isProcessingDelete}>

                                Delete
                            </Button>
                            <Button color="green" size="xs" onClick={(e) => setIsDeleteAlert(false)}>
                                Cancel
                            </Button>


                        </div>

                    </div>} color="warning" icon={HiInformationCircle}>
                        <span className="font-medium">Info alert!</span> Are you sure you want to delete this category?.
                    </Alert>
                </div>
            }
            {!isDeleteAlert &&
                <div className={`hidden  group-hover:flex flex-nowrap gap-2 ${isEditing ? "block" : ""}`}>
                    <Button size="xs" onClick={() => setIsEditing(!isEditing)} isProcessing={isProcessingEdit}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Button>

                    {isEditing && (
                        <Button color="green" size="xs" onClick={(e) => handleUpdate(e)}>
                            Submit
                        </Button>
                    )}

                    <Button color="red" size={"xs"} onClick={() => setIsDeleteAlert(true)}
                            isProcessing={isProcessingDelete}>
                        Delete
                    </Button>
                </div>}
        </form>
            }
        </div>
    );
};

export default AdminCardCategory;
