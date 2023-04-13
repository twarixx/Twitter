import { useState } from "react";

export const AccountEdit = ({ setUser, user }) => {
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
                    <div className="flex flex-col w-full">
                        <label className="text-stone-400" htmlFor="username">
                            Username
                        </label>

                        <input
                            onChange={handleChange}
                            value={editingUser.username || ""}
                            className="bg-stone-600 p-2 rounded-lg outline-none ring-0"
                            type="text"
                            id="username"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-stone-400" htmlFor="email">
                        Email
                    </label>

                    <input
                        onChange={handleChange}
                        value={editingUser.email || ""}
                        className="bg-stone-600 p-2 rounded-lg w-full outline-none ring-0"
                        type="email"
                        limit="255"
                        id="email"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-stone-400" htmlFor="old_password">
                        Old Password
                    </label>

                    <input
                        onChange={handleChange}
                        value={editingUser.old_password || ""}
                        className="bg-stone-600 p-2 rounded-lg w-full outline-none ring-0"
                        type="password"
                        id="old_password"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-stone-400" htmlFor="password">
                        New Password
                    </label>

                    <input
                        onChange={handleChange}
                        value={editingUser.password || ""}
                        className="bg-stone-600 p-2 rounded-lg w-full outline-none ring-0"
                        type="password"
                        id="password"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label
                        className="text-stone-400"
                        htmlFor="confirm_password"
                    >
                        Repeat New Password
                    </label>

                    <input
                        onChange={handleChange}
                        value={editingUser.confirm_password || ""}
                        className="bg-stone-600 p-2 rounded-lg w-full outline-none ring-0"
                        type="password"
                        id="confirm_password"
                    />
                </div>
            </div>
        </div>
    );
};
