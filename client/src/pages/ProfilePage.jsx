import { useParams } from "react-router-dom";
import { UserHero } from "../components/user/UserHero";
import { getAccounts } from "../data/accounts";
import { UnknownPage } from "./UnknownPage";

export const ProfilePage = () => {
    const { username } = useParams();

    const user = getAccounts().find((account) => account.username === username);
    if (!user) return <UnknownPage />;

    return <UserHero user={user} />;
};
