import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";

export const router = createBrowserRouter([
    {
        path: "/",
        // this is the root route
        element: <App />,
        children: [
            {
                // when root route is hit, show HomePage component
                path: "/",
                element: <HomePage />
            },
            {
                path: "activities",
                element: <ActivityDashboard />
            },
            {
                path: "activities/:id",
                element: <ActivityDetailPage />
            },
            {
                path: "createActivity",
                element: <ActivityForm key="create" />
            },
            {
                path: "manage/:id",
                element: <ActivityForm />
            }
        ]
    }
])