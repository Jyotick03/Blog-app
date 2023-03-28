import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./user-routes/UserDashboard";
import ProfileInfo from "./user-routes/ProfileInfo";
import PostPage from "./user-routes/PostPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        toastStyle={{
          backgroundColor: "black",
          WebkitTextFillColor: "#fff",
        }}
        position="bottom-center"
      />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/services" Component={Services} />
        <Route path="/user" Component={PrivateRoute}>
          <Route path="dashboard" Component={UserDashboard} />
          <Route path="profile-info" Component={ProfileInfo} />
        </Route>
        <Route path="/posts/:postId" Component={PostPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
