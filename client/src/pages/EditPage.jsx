import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { load, makeRequest } from "../axios";
import Puff from "../components/loading/Puff";
import { BiArrowBack } from "react-icons/bi";
import { Tab } from "@headlessui/react";
import { ProfileEdit } from "../components/user/edit/ProfileEdit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "evergreen-ui";
import { AccountEdit } from "../components/user/edit/AccountEdit";
import { AdminEdit } from "../components/user/edit/AdminEdit";
import { UnknownPage } from "./UnknownPage";

export const EditPage = () => {
    const { currentUser, logout } = useContext(AuthContext);
    let { username } = useParams();

    if (!currentUser.admin) username = currentUser.username;

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (data) => {
            return makeRequest.put(`/api/user/${user.id}`, data);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["user", user.username]);
                toaster.success("Edited user successfully!", {
                    hasCloseButton: true,
                    duration: 3,
                    id: "edit-successful",
                });
            },

            onError: (error) => {
                toaster.danger(error.response.data.message, {
                    hasCloseButton: true,
                    duration: 3,
                    id: error.message.replace(" ", "-"),
                });
            },
        }
    );

    const { data, isLoading, error } = load(
        ["user", username],
        `/api/user/${username}/${currentUser.token}}`
    );

    if (isLoading)
        return (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <Puff width="66" height="66" stroke="#e5e5e5" />
            </div>
        );

    if (error) return <UnknownPage />;

    let user = data.data;
    let editingUser = {};

    const save = (e) => {
        e.preventDefault();

        const data = { ...editingUser, token: currentUser.token };
        console.log(data);
        mutation.mutate(data);
    };
    // Email, Password, confirm password, username, display_name, bio, banner, profile picture

    return (
        <div>
            <Link to={`/${user.username}`}>
                <div className="bg-stone-800 bg-opacity-60 h-20 flex p-6 items-center justify-between text-twitter-text">
                    <div className="flex gap-2">
                        <BiArrowBack className="w-8 h-8" />
                        <h1 className="text-xl">Back to {user.display_name}</h1>
                    </div>

                    <div>
                        {currentUser.id === user.id && (
                            <button
                                onClick={logout}
                                className="bg-twitter-secondary px-2 py-1 rounded-lg text-white"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </Link>

            <div>
                <h1 className="text-center text-xl mt-2">Edit User</h1>
            </div>

            <div className="mt-2 flex flex-col">
                <Tab.Group>
                    <div className="flex justify-center">
                        <Tab.List className="space-x-1.5 bg-stone-800 outline-none rounded-md">
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? "bg-twitter-secondary p-2 rounded-md outline-none"
                                        : "bg-stone-800 p-2 rounded-md outline-none"
                                }
                            >
                                Profile
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? "bg-twitter-secondary p-2 rounded-md outline-none"
                                        : "bg-stone-800 p-2 rounded-md outline-none"
                                }
                            >
                                Account
                            </Tab>
                            {currentUser.admin ? (
                                <Tab
                                    className={({ selected }) =>
                                        selected
                                            ? "bg-twitter-secondary p-2 rounded-md outline-none"
                                            : "bg-stone-800 p-2 rounded-md outline-none"
                                    }
                                >
                                    Admin
                                </Tab>
                            ) : (
                                ""
                            )}
                        </Tab.List>
                    </div>
                    <div className="">
                        <form className="flex flex-col">
                            <Tab.Panels>
                                <Tab.Panel>
                                    <ProfileEdit
                                        setUser={user}
                                        user={editingUser}
                                    />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <AccountEdit
                                        setUser={user}
                                        user={editingUser}
                                    ></AccountEdit>
                                </Tab.Panel>
                                {currentUser.admin ? (
                                    <Tab.Panel>
                                        <AdminEdit
                                            setUser={user}
                                            user={editingUser}
                                        ></AdminEdit>
                                    </Tab.Panel>
                                ) : (
                                    ""
                                )}
                            </Tab.Panels>

                            <button
                                onClick={save}
                                className="bg-twitter-secondary px-2 h-12 rounded-lg m-2 text-center text-xl"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </Tab.Group>
            </div>
        </div>
    );
};
