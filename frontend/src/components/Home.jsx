import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate(`/${userId}/dashboard`);
    }
  }, [userId, useNavigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome</h1>

      <div className="space-y-4">
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition-all">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-green-600 transition-all">
            Sign Up
          </button>
        </SignUpButton>
      </div>
    </div>
  );
};

export default Home;
