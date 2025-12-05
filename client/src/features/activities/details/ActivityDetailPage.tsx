import { Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";


export default function ActivityDetailPage() {
    // get the id param from the route. 
    // It needs to match the name of the param used in the route path
    const { id } = useParams();

    // get the activity details using the custom hook and pass in the id param
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) return <Typography variant="h6">...Loading</Typography>;

    if (!activity) return <Typography variant="h6">Activity Not Found!!!</Typography>;

    return (
        // a container has 12 columns by default
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat />
            </Grid2>
            <Grid2 size={4}>
                <ActivityDetailsSidebar />
            </Grid2>
        </Grid2>
    )
}