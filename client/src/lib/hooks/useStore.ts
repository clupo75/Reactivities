// hook to use a storeContext in a React component
import { useContext } from "react";
import { StoreContext } from "../stores/store";

// using this hook will give access to the global store
export function useStore() {
    return useContext(StoreContext);
}