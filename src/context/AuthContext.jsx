import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      //? yeni kullanıcı oluşturmak için kullanılan metod
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      // console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Registered successfully!");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
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
      // console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };

  const userObserver = () => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        // user is signed out
        setCurrentUser(false);
      }
    });
  };

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully");
  };

  const values = { createUser, signIn, logOut, currentUser };
  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  );
};

export default AuthContextProvider;
