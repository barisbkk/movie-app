import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const createUser = async (email, password) => {
    try {
      //? yeni kullanıcı oluşturmak için kullanılan metod
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      //? mevcut kullanıcının giriş yapması için kullanılan metod
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const values = { createUser, signIn };
  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  );
};

export default AuthContextProvider;
