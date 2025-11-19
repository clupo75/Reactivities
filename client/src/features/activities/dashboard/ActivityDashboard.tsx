import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

// Defining the type for the props that ActivityDashboard will receive
type Props = {
    activities: Activity[];
    // use method signature for function prop
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    // prop for optional curerently selected activity, could be undefined
    selectedActivity?: Activity;
    // boolean prop to indicate if we are in edit mode
    editMode: boolean;
    // function to open the form for creating or editing an activity, needs an id parameter
    openForm: (id: string) => void;
    closeForm: () => void;
}

// destructuring activities from property type Props, then using it in the component
export default function ActivityDashboard({ activities, selectActivity, cancelSelectActivity,
    selectedActivity,
    editMode,
    openForm,
    closeForm
}: Props) {
    return (
        // This will be the outer grid container
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}                />
            </Grid2>
            <Grid2 size={5}>
                {/* display the activity detail if selectedActivity and editMode is not enabled */}
                {
                    selectedActivity && !editMode && <ActivityDetails
                        selectedActivity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {/* display the activity form if editMode is enabled and show the current activity values */}
                {
                    editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                    />
                }
            </Grid2>
        </Grid2>
    )
}