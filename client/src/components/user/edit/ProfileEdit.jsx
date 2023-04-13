import { useState } from "react";

export const ProfileEdit = ({ setUser, user }) => {
    const [editingUser, setEditingUser] = useState(setUser);

    const handleChange = (e) => {
        const { id, value } = e.target;

        setEditingUser({ ...editingUser, [id]: value });
        user[id] = value;
        setUser[id] = value;
    };

    return (
        <div className="m-2">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col w-[35%]">
                        <label
                            className="text-stone-400"
                            htmlFor="profile_picture"
                        >
                            Profile Picture
                        </label>

                        <input
                            onChange={handleChange}
                            value={editingUser.profile_picture || ""}
                            className="bg-stone-600 p-2 rounded-lg outline-none ring-0"
                            type="text"
                            id="profile_picture"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            className="text-stone-400"
                            htmlFor="display_name"
                        >
                            Display Name
                        </label>

                        <input
                            onChange={handleChange}
                            value={editingUser.display_name || ""}
                            className="bg-stone-600 p-2 rounded-lg outline-none ring-0"
                            type="text"
                            id="display_name"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-stone-400" htmlFor="bio">
                        Bio
                    </label>

                    <textarea
                        onChange={handleChange}
                        value={editingUser.bio || ""}
                        className="bg-stone-600 p-2 rounded-lg w-full outline-none ring-0"
                        type="text"
                        limit="255"
                        id="bio"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-stone-400" htmlFor="bio">
                        Banner
                    </label>

                    <input
                        onChange={handleChange}
                        value={editingUser.banner || ""}
                        className="bg-stone-600 p-2 rounded-lg w-full outline-none ring-0"
                        type="text"
                        id="banner"
                    />
                </div>
            </div>
        </div>
    );
};
