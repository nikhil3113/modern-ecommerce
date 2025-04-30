import { atom } from "recoil";

interface User {
    username: string;
}

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    headline: string;
    user: User;
}

export const comments = atom<Comment[]>({
    key: "comments",
    default: [],
});