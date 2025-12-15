// global store that will hold all the stores
import { createContext } from "react";
import CounterStore from "./counterStore";
import { UIStore } from "./uiStore";

interface Store {
    // javascript classes can be used as types as well as classes
    counterStore: CounterStore
    uiStore: UIStore
}

export const store: Store = {
    // initialize the instance of the store
    counterStore: new CounterStore(),
    uiStore: new UIStore()
};

// create a context for the store, where we can store state globally
export const StoreContext = createContext(store);
