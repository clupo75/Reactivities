import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";



export default function ActivityDashboard() {
    return (
        // This will be the outer grid container
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList />
            </Grid2>
            <Grid2 size={5}>
                Activity Filters Go Here!
            </Grid2>
        </Grid2>
    )
}