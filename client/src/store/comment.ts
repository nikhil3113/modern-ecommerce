import { atom } from "recoil";
interface User{
    username:string;
    }
interface Comments {
    id: string;
    content: string;
    createdAt: string;
    headline: string;
    user: User
}


export const comments = atom<Comments>({
    key: "comments",
    default: [],
})