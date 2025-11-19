import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    closeForm: () => void
    activity?: Activity
}

export default function ActivityForm({ closeForm, activity }: Props) {
    // use the custom hook to get the react-query updateActivity mutation
    const { updateActivity, createActivity } = useActivities();

    const handleEvent = async (event: FormEvent<HTMLFormElement>) => {
        // prevent the default form submission behavior
        event.preventDefault();
        // get form data from the event current target
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // check if we are editing an existing activity and preserve its id
        if (activity) {
            data.id = activity.id;
            // call the updateActivity mutation to update the activity on the server
            await updateActivity.mutateAsync(data as unknown as Activity);
            // close the form after submission
            closeForm();
        } else {
            // if there is no existing activity, we are creating a new one
            // call the createActivity mutation to create a new activity on the server
            await createActivity.mutateAsync(data as unknown as Activity);
            // close the form after submission
            closeForm();
        }
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
            </Typography>
            <Box component="form" onSubmit={handleEvent} display="flex" flexDirection="column" gap={3}>
                <TextField name="title" label="Title" defaultValue={activity?.title} />
                <TextField name="description" label="Description" defaultValue={activity?.description} multiline rows={3} />
                <TextField name="category" label="Category" defaultValue={activity?.category} />
                <TextField name="date" label="Date" type="date"
                    defaultValue={activity?.date
                        ? new Date(activity.date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]} />
                <TextField name="city" label="City" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button onClick={closeForm} color="inherit">
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