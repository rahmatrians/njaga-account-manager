import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";

export const categoriesModel = ({ queryType, whereField, whereValue }) => {

    switch (queryType) {
        case "getAll":
            return getAllCategories();

        case "getAllByWhere":
            return getAllCategoriesByWhere({ whereField, whereValue });

        case "getOneById":
            return getOneCategoriesById({ whereValue });

        default:
            break;
    }
}

const getAllCategories = () => {

    // realtime query
    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(collection(firestore, "categories"));
            onSnapshot(q, (querySnapshot) => {
                let tempCategories = [];
                querySnapshot.forEach((doc) => {
                    tempCategories.push({ id: doc.id, ...doc.data() });
                });

                resolve(tempCategories);
            });
        } catch (error) {
            reject(error)
        }

    });

    return execute;

    // non-realtime query
    // const categoriesQuery = await getDocs(collection(firestore, "categories"))
    // let tempCategories = [];
    // categoriesQuery.forEach(doc => {
    //     // doc.data() is never undefined for query doc snapshots
    //     tempCategories.push(doc.data());
    // });

    // setCategories(tempCategories);
}


const getAllCategoriesByWhere = ({ whereField, whereValue }) => {

    // realtime query
    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(collection(firestore, "categories"), where(whereField, "==", whereValue));
            onSnapshot(q, (querySnapshot) => {
                let tempCategories = [];
                querySnapshot.forEach((doc) => {
                    tempCategories.push({ id: doc.id, ...doc.data() });
                });

                resolve(tempCategories);
            });
        } catch (error) {
            reject(error)
        }

    });

    return execute;
}


const getOneCategoriesById = ({ whereValue }) => {
    // non-realtime query
    // const docSnap = await getDoc(doc(firestore, "categories", id));

    // realtime query
    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(doc(firestore, "categories", whereValue));
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
}