import { atom } from "recoil";

interface Products{
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}

export const productIdState = atom<number | string>({
    key: "productIdState",
    default: "",
})

export const productState = atom<Products []>({
    key: "productState",
    default: [],  
})

export const ProductNamState = atom<string>({
    key: "ProductNamState",
    default: "",
})

export const ProductDescriptionState = atom<string>({
    key: "ProductDescriptionState",
    default: "",
})

export const ProductImageUrlState = atom<string>({
    key: "ProductImageUrlState",
    default: "",
})

export const ProductPriceState = atom<number>({
    key: "ProductPriceState",
    default: 0,
})