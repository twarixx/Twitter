import { Dialog } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const SearchModal = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible);

    useEffect(() => {
        setIsVisible(!!visible);

        if (visible) {
            console.log("visible");

            const inputElement = document.getElementById("search");
            inputElement.focus();
        }
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!visible) {
        return null;
    }

    return (
        <div className="transition duration-300 z-50 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div
                    className={`${
                        isVisible ? "scale-100" : "scale-0"
                    } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
                >
                    <div className="relative">
                        <div className="p-6 flex flex-col gap-1 items-center">
                            <h1 className="text-2xl font-semibold">Search</h1>
                            <input
                                id="search"
                                type="text"
                                placeholder="Search"
                            />
                        </div>

                        <div
                            onClick={handleClose}
                            className="cursor-pointer absolute top-1 right-1 rounded-full flex items-center justify-center"
                        >
                            <AiOutlineClose className="text-white h-6 w-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
