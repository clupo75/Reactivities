import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";


export default function NavBar() {
    return (
        // Box component is like a div with extra styling capabilities from MUI
        // sx is a prop for defining custom styles in MUI
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
            }}>
                <Container maxWidth="xl">
                    {/* flex is a style container for children components, 
                     so all children components will use styling from the parent*/}
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            {/* Use the 'component' property to access the routers NavLink, which will
                            need a 'to' property for which path to load */}
                            <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight="bold">
                                    Reactivities
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItemLink to='/activities'>
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to='/createActivity'>
                                Create Activity
                            </MenuItemLink>
                        </Box>
                        <MenuItem>
                            User Menu
                        </MenuItem>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}