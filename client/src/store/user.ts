import { atom } from "recoil";


export const userId = atom({
    key: "userId",
    default: "",
})

export const userAuth = atom({
    key: "userAuth",
    default: false,
})