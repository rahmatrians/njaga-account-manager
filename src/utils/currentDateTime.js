import moment from "moment";

export const currentDateTime = () => {
    return moment().format();
}