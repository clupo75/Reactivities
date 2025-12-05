import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  // use the location hook to get the current route
  const location = useLocation();


  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      {/* if the location is root, go to the home page, 
        else show the NavBar with the other rotes */}
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            {/* When root is activated, the route element will 
              replace the Outlet component from Routes.tsx */}
            <Outlet />
          </Container>
        </>
      )}

    </Box>
  )
}

export default App
