import { useState } from "react";

export const AdminEdit = ({ setUser, user }) => {
    const [editingUser, setEditingUser] = useState(setUser);

    const handleChange = (e) => {
        let { id, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked ? (Date.now() / 1000).toString() : null;
        }

        setEditingUser({ ...editingUser, [id]: value });
        user[id] = value;
        setUser[id] = value;
    };

    return (
        <div className="m-2">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col w-full">
                        <label className="text-stone-400" htmlFor="verified_on">
                            Verified
                        </label>

                        <input
                            onChange={handleChange}
                            checked={editingUser.verified_on ? true : false}
                            className="bg-stone-600 p-2 rounded-lg outline-none ring-0"
                            type="checkbox"
                            id="verified_on"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-stone-400" htmlFor="banned_on">
                        Banned
                    </label>

                    <input
                        onChange={handleChange}
                        checked={editingUser.banned_on ? true : false}
                        className="bg-stone-600 p-2 rounded-lg w-full outline-none ring-0"
                        type="checkbox"
                        id="banned_on"
                    />
                </div>
            </div>
        </div>
    );
};
