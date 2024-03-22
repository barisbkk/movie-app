import React from "react";
import AppRouter from "./router/AppRouter";
import AuthContextProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthContextProvider>
      <AppRouter />
      <ToastContainer />
    </AuthContextProvider>
  );
};

export default App;
