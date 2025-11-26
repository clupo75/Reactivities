import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";


export default function ActivityDetails() {
    const navigate = useNavigate(); 

    // get the id param from the route. 
    // It needs to match the name of the param used in the route path
    const {id} = useParams(); 

    // get the activity details using the custom hook and pass in the id param
    const {activity, isLoadingActivity} = useActivities(id);
    
    if (isLoadingActivity) return <Typography variant="h6">...Loading</Typography>;

    if (!activity) return <Typography variant="h6">Activity Not Found!!!</Typography>;

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component="img"
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/manage/${activity.id}`} color="primary">Edit</Button>
                <Button onClick={() => navigate('/activities')} color="inherit">Cancel</Button>
            </CardActions>
        </Card>
    )
}