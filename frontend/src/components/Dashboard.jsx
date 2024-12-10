import { useEffect, useState } from "react";
import { useAuth, SignOutButton } from "@clerk/clerk-react";

const Dashboard = () => {
  const { userId, signOut } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${userId}/dashboard`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }

    const handleBeforeUnload = async () => {
      if (userId) {
        try {
          await signOut();
        } catch (error) {
          console.error("Error logging out before unload:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userId, signOut]);

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-700 text-lg mb-4">{userDetails.message}</p>
        <div className="space-y-2">
          <p className="text-gray-600">
            <strong className="text-gray-800">User ID:</strong>{" "}
            {userDetails.userId}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Username:</strong>{" "}
            {userDetails.username}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Email:</strong>{" "}
            {userDetails.email}
          </p>
        </div>
        <SignOutButton>
          <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Dashboard;
