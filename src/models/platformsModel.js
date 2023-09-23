import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";

export const platformsModel = ({ queryType, whereField, whereValue }) => {

    switch (queryType) {
        case "getAll":
            return getAllPlatforms();

        case "getAllByWhere":
            return getAllPlatformsByWhere({ whereField, whereValue });

        case "getOneById":
            return getOnePlatformsById({ whereValue });

        default:
            break;
    }
}

const getAllPlatforms = () => {

    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(collection(firestore, "platforms"));
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


const getAllPlatformsByWhere = ({ whereField, whereValue }) => {

    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(collection(firestore, "platforms"), where(whereField, "==", whereValue));
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


const getOnePlatformsById = ({ whereValue }) => {

    const execute = new Promise((resolve, reject) => {
        try {
            const q = query(doc(firestore, "platforms", whereValue));
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