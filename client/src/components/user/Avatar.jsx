export const Avatar = ({ user, isLarge = false, hasBorder = false }) => {
    return (
        <div className={hasBorder ? "border-black border-2 rounded-full" : ""}>
            <img
                className={`${
                    isLarge ? "h-16 w-16" : "h-8 w-8"
                } rounded-full object-cover
                `}
                src={
                    user.profile_picture ||
                    "/images/default_profile_picture.svg"
                }
                alt={`Profile picture of ${user.display_name}`}
            />
        </div>
    );
};
