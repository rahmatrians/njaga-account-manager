import { useContext, createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { storeItem } from '../utils/storeItem';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { nanoID } from '../utils/nanoID';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const fillUserId = storeItem((state) => state.fillUserId);
    const fillFullname = storeItem((state) => state.fillFullname);
    const fillEmail = storeItem((state) => state.fillEmail);
    const fillAvatar = storeItem((state) => state.fillAvatar);
    const resetAll = storeItem((state) => state.resetAll);
    // const fillToastMessage = storeItem((state) => state.fillToastMessage);
    // const { userToken } = storeItem();
    // const fillUserToken = storeItem((state) => state.fillUserToken);
    // const removeUserToken = storeItem((state) => state.removeUserToken);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (res) => {
            fillFullname(res.user.displayName);
            fillEmail(res.user.email);
            fillAvatar(res.user.photoURL);

            try {
                const usersData = await getDocs(query(collection(firestore, "users"), where("authId", "==", res.user.uid)));

                let userID = null;
                if (usersData.empty) {
                    userID = nanoID();
                    setDoc(doc(firestore, "users", userID), {
                        // add using auto-generated ID
                        // const setCategory = await addDoc(collection(firestore, "categories"), {
                        id: userID,
                        authId: res.user.uid,
                        fullname: res.user.displayName,
                        avatar: res.user.photoURL,
                        lastLoginAt: res.user.metadata.lastLoginAt,
                        createdAt: res.user.metadata.createdAt,
                        providerId: res.providerId,
                    })

                } else {
                    userID = usersData.docs[0].id;
                }

                fillUserId(userID);
                // fillToastMessage(['success', 'Submit success!']);
                // navigate("/dashboard");
            } catch (err) {
                throw new Error(err);
            }
        })
        // signInWithRedirect(auth, provider)
    };

    const logOut = () => {
        signOut(auth);
        resetAll();
        // localStorage.clear();
        // sessionStorage.clear();
        // navigate("/auth/login")
        // removeUserToken();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // fillUserToken(currentUser.accessToken);
            setUser(currentUser);
            console.log('User', currentUser)
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    console.log('userAuth: ', AuthContext, useContext(AuthContext));
    return useContext(AuthContext);
};