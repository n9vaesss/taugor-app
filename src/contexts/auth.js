/* eslint-enable quotes */

import { useState, createContext, useEffect } from "react"; // eslint-disable-line
import { auth, db } from "../services/firebaseConnection"; // eslint-disable-line
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // eslint-disable-line
import { doc, getDoc, setDoc } from 'firebase/firestore'; // eslint-disable-line
import { useNavigate } from 'react-router-dom'; // eslint-disable-line
import { toast } from "react-toastify"; // eslint-disable-line

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@ticketsPRO"); // eslint-disable-line
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function singIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid); // eslint-disable-line
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          name: docSnap.data().name,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Login realizado com sucesso!"); // eslint-disable-line
        navigate("/dashboard"); // eslint-disable-line
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Algo deu errado!"); // eslint-disable-line
      });
  }

  async function singUp(name, email, password) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), { // eslint-disable-line
          name: name,
          email: email,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success("Usuário cadastrado com sucesso!"); // eslint-disable-line
          navigate("/dashboard"); // eslint-disable-line
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Algo deu errado!"); // eslint-disable-line
      });
  }

  function storageUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data)); // eslint-disable-line
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("@ticketsPRO"); // eslint-disable-line
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        singIn,
        singUp,
        logout,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
