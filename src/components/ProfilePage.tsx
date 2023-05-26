import React from "react";
import { useAuth } from "../utils/auth";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, userState } = useAuth();

  const currentUser = userState.find(item => item.username === user?.username)
  console.log("current User", currentUser)

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
            {currentUser?.posts?.length === 0 ? (
              <p>You have 0 posts</p>
            ) : (
              <div>
                <h3> Check your posts:</h3>
                {
                  currentUser?.posts?.map(post => (
                    <Link to={`/blog/${post.slug}`} key={post.id}>{
                      post.slug.split("-").join(" ")
                    }</Link>
                  ))
                }
              </div>
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
