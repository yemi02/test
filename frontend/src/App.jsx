import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";

function App() {
  const { authCheck, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, []);
  console.log("Auth user is here: ", user);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}

export default App;
