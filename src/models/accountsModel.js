<<<<<<< HEAD
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
=======
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
>>>>>>> 4ea3bc37cb7782b8d0521903075ba434bf4d2410
import { firestore } from "../config/firebase";

export const accountsModel = ({ queryType, whereField, whereValue }) => {

    switch (queryType) {
        case "getAll":
            return getAllAccounts();

        case "getAllByWhere":
            return getAllAccountsByWhere({ whereField, whereValue });

        case "getOneById":
            return getOneAccountsById({ whereValue });

<<<<<<< HEAD
        case "removeOneById":
            return removeOneAccountsById({ whereValue });

=======
>>>>>>> 4ea3bc37cb7782b8d0521903075ba434bf4d2410
        default:
            break;
    }
}

const getAllAccounts = () => {

    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(collection(firestore, "accounts"));
            onSnapshot(q, (querySnapshot) => {
                let result = [];
                querySnapshot.forEach((doc) => {
                    result.push({ id: doc.id, ...doc.data() });
                });

                resolve(result);
            });
        } catch (error) {
            reject(error)
        }

    });

    return execute;

}


const getAllAccountsByWhere = ({ whereField, whereValue }) => {

    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(collection(firestore, "accounts"), where(whereField, "==", whereValue));
<<<<<<< HEAD

=======
>>>>>>> 4ea3bc37cb7782b8d0521903075ba434bf4d2410
            onSnapshot(q, (querySnapshot) => {
                let result = [];
                querySnapshot.forEach((doc) => {
                    result.push({ id: doc.id, ...doc.data() });
                });
<<<<<<< HEAD
                resolve(result);
            });

=======

                resolve(result);
            });
>>>>>>> 4ea3bc37cb7782b8d0521903075ba434bf4d2410
        } catch (error) {
            reject(error)
        }

    });

    return execute;

}


const getOneAccountsById = ({ whereValue }) => {

    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(doc(firestore, "accounts", whereValue));
            onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.exists()) {
                    resolve(querySnapshot.data());
                } else {
                    resolve({});
                }
            });
        } catch (error) {
            reject(error)
        }

    });

    return execute;

<<<<<<< HEAD
}


const removeOneAccountsById = ({ whereValue }) => {

    const execute = new Promise((resolve, reject) => {
        try {
            deleteDoc(doc(firestore, "accounts", whereValue));
            resolve(true);
        } catch (error) {
            reject(error);
        }

    });

    return execute;

=======
>>>>>>> 4ea3bc37cb7782b8d0521903075ba434bf4d2410
}