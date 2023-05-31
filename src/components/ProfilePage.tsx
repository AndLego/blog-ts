import React from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../utils/blogAPI";

const ProfilePage = () => {
  const { user, getUserPosts } = useAPI();
  const [posts, setPosts] = React.useState<string[] | null>(null);

  const loadUserPosts = async () => {
    try {
      const userPosts = await getUserPosts(user!.username);
      setPosts(userPosts)
    } catch (error) {
      console.error("Error getting user posts:", error);
    }
  };

  React.useEffect(() => {
    loadUserPosts();
  }, [user]);

  return (
    <>
      <section className="LogIn">
        <h1>Profile</h1>
        {user?.username === "Anonimo" && (
          <p>This is an Anonymous Account, Enjoy!</p>
        )}
        {user ? (
          <div className="profile">
            <h5>Welcome! {user.username}</h5>

            {user.rol.permissions.write === false && (
              <p>You are a visitor</p>
            )}

            {user.rol.permissions.write && (
              <>
                {posts?.length === 0 ? (
                  <>
                    <p>You have 0 posts</p>
                    <Link to="/createPost" className="btnProfile">Create one</Link>
                  </>
                ) : (
                  <div>
                    <h3>Check your posts:</h3>
                    {posts?.map((post) => (
                      <Link to={`/blog/${post}`} key={post}>
                        {post?.split("-")?.join(" ")}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

        ) : (
          <p>Loading...</p>
        )}
      </section>

    </>
  );
};

export default ProfilePage;
