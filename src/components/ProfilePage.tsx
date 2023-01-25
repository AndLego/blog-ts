import { useAuth } from "../utils/auth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Profile</h1>
      {user ? <p>Welcome!, {user.username}</p> : <p>Loading...</p>}
    </>
  );
};

export default ProfilePage;
