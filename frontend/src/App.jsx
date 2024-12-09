import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { RedirectToSignIn, SignedIn } from "@clerk/clerk-react";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path={`/:userId/dashboard`}
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route path="/sign-in/*" element={<RedirectToSignIn />} />
          <Route path="/sign-up/*" element={<RedirectToSignIn />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
