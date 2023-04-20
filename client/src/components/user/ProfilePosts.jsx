export const ProfilePosts = ({ user }) => {
    return (
        <div className="mt-2 px-2 pt-1">
            <h1 className="text-center mb-2 text-lg">
                {user.posts.length === 0 ? "Doesn't have any posts" : "Posts"}
            </h1>
            <div className="flex w-full flex-col gap-4">
                {/* {!posts ? (
                    <div className="flex justify-center text-stone-300 mt-4">
                        <p>This user hasn't posted anything!</p>
                    </div>
                ) : (
                    <div>
                        {posts.map((post, i) => (
                            <Post key={i} post={post} hasBorder />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
};
