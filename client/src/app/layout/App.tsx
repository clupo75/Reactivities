import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* When root is activated, the route element will 
          replace the Outlet component from Routes.tsx */}
        <Outlet />
      </Container>
    </Box>
  )
}

export default App
