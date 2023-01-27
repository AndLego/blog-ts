import { useAuth } from "../utils/auth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="LogIn">
        <h1>Profile</h1>
        {user?.username === "Anonimo" && (
          <p>This is an Anonimous Account, Enjoy!</p>
        )}
        {user ? <p>Welcome! {user.username}</p> : <p>Loading...</p>}
      </section>
    </>
  );
};

export default ProfilePage;
