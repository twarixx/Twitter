import { useParams } from "react-router-dom";
import { getAccounts } from "../data/accounts";
import { UnknownPage } from "./UnknownPage";

export const ProfilePage = () => {
    const { username } = useParams();

    const user = getAccounts().find((account) => account.username === username);
    if (!user) return <UnknownPage />;

    return (
        <div>
            <p className="text-green-500">{user.username}</p>
        </div>
    );
};
