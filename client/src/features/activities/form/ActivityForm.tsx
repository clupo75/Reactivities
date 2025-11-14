import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
    closeForm: () => void
    activity?: Activity
    submitForm: (activity: Activity) => void
}

export default function ActivityForm({ closeForm, activity, submitForm }: Props) {

    const handleEvent = (event: FormEvent<HTMLFormElement>) => {
        // prevent the default form submission behavior
        event.preventDefault();
        // get form data from the event current target
        const formData = new FormData(event.currentTarget);
        const data: {[key: string]: FormDataEntryValue} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // check if we are editing an existing activity and preserve its id
        if (activity) data.id = activity.id;
        
        console.log(data);
        // call the submitForm function passed as a prop with the form data
        submitForm(data as unknown as Activity);
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
                <TextField name="date" label="Date" type="date" defaultValue={activity?.date} />
                <TextField name="city" label="City" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button onClick={closeForm} color="inherit">
                        Cancel
                    </Button>
                    {/* setting the type submit, calls the onSubmit function in the "Box" form
                    where the button lives inside of. Here, when the nutton is clicked, the handleEvent 
                    function is triggered */}
                    <Button type="submit" color="success" variant="contained">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}