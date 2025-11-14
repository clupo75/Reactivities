import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  // state to hold the currently selected activity
  const [selsctedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // state to track if we are in edit mode
  const [editMode, setEditMode] = useState(false);

  // triggered when the component is first loaded
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, []);

  // function to select an activity by its id and set it as the selected activity state
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    // activity is stored in local state
    if (id) handleSelectActivity(id);
    // if no id provided, make sure no activity is selected
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      // if activity has an id, we are updating an existing activity
      setActivities(activities.map(a => a.id === activity.id ? activity : a));
    } else {
      // if no id, we are creating a new activity, using length of activities array as a simple id
      //  thespread operator (...) creates a new array with existing activities plus the new Activity object
      const newActivity = {...activity, id: activities.length.toString()};
      // set the new activity as the selected activity
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity])
    }
    // close the form and exit edit mode after submission
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    // filter out the activity with the given id and update the activities state
    setActivities(activities.filter(a => a.id !== id));
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selsctedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>

    </Box>
  )
}

export default App
