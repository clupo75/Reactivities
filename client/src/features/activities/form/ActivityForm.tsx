import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm, type Resolver } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import type { Activity } from "../../../lib/types";


export default function ActivityForm() {
    // the useForm hook from react-hook-form to manage the form state and validation
    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema) as Resolver<ActivitySchema>,
    })

    // useNavigate hook to navigate between routes
    const navigate = useNavigate();

    const { id } = useParams();
    // use the custom hook to get the react-query updateActivity mutation
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

    // whenever the activity changes (i.e., when it is fetched), reset the form with the new activity data
    useEffect(() => {
        if (activity) reset({
            ...activity,
            location: {
                city: activity.city,
                venue: activity.venue,
                latitude: activity.latitude,
                longitude: activity.longitude,
            }
        });
    }, [activity, reset]);

    const onSubmit = (data: ActivitySchema) => {
        // flatten the location object into the main activity object for the server BaseActivityDTO
        // destructure location from the rest of the data
        const { location, ...rest } = data;
        // create a new object that combines the rest of the data with the flattened location fields
        const flattenedData = { ...rest, ...location };

        try {
            // if there is an original activity and we are updating it, overwrite with the flattened data
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenedData as Activity }, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                });
            } else {
                // creating a new activity
                createActivity.mutate(flattenedData as Activity, {
                    onSuccess: (id: string) => navigate(`/activities/${id}`)
                });
            }

        } catch (error) {
            console.log("Error submitting activity form:", error);
        }
    }

    if (isLoadingActivity) return <Typography variant="h6">...Loading Activity</Typography>;

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? "Edit Activity" : "Create Activity"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
                <TextInput label="Title" control={control} name="title" />
                <TextInput label="Description" control={control} name="description" multiline rows={3} />
                <Box display="flex" gap={3}>
                    <SelectInput
                        items={categoryOptions}
                        label="Category"
                        control={control}
                        name="category"
                    />
                    <DateTimeInput label="Date" control={control} name="date" />
                </Box>
                <LocationInput label="Enter the location" control={control} name="location" />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button color="inherit">
                        Cancel
                    </Button>
                    {/* setting the type submit, calls the onSubmit function in the "Box" form
                    where the button lives inside of. Here, when the nutton is clicked, the handleEvent 
                    function is triggered */}
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        // disable the button while the update mutation is pending
                        // or while the create mutation is pending
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}