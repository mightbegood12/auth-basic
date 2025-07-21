import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../queries/api";

const Profile = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  const user = data?.userDetails;

  return (
    <div className="home-container">
      <div className="profile-container">
        <div className="profile-title">
          User Profile
          <img
            src="/profile_icon.png"
            alt="Profile"
            width="40px"
            height="40px"
          />
        </div>
        {isPending && <p>Loading...</p>}
        {error && <p>Failed to load profile.</p>}
        {user && (
          <div className="profile-content">
            <div>
              <strong>Name:</strong> {data.user_name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
