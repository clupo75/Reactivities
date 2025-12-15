// axios configuration for making API calls to the backend server
import axios from "axios";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// add interceptor to handle requests globally
// set the isLoading state to true before making a request
agent.interceptors.request.use(config => {
  store.uiStore.isBusy();
  return config;  
});

// add interceptor to handle requests and responses globally
agent.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log("Error in response:", error);
    return Promise.reject(error);
  } finally {
    // set the isLoading state to false after receiving a response
    store.uiStore.isIdle();
  }
});


export default agent;