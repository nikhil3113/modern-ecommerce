import { atom } from "recoil";
interface CartItemProps {
    id: number; // cart item ID
    product: {
      id: number;
      name: string;
      price: number;
      imageUrl: string;
    };
    quantity: number;
  }
  
export const itemsState = atom<CartItemProps[]>({
    key: "itemsState",
    default: [],  
})