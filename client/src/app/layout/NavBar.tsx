import { Group } from "@mui/icons-material";
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from "@mui/material";

type Props = {
    // function to open the form for creating a new activity
    // no parameters and no return value
    openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
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
                            <MenuItem sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight="bold">
                                    Reactivities
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItem sx={{
                                fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                            }}>
                                Activities
                            </MenuItem>
                            <MenuItem sx={{
                                fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                            }}>
                                About
                            </MenuItem>
                            <MenuItem sx={{
                                fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                            }}>
                                Contacts
                            </MenuItem>
                        </Box>
                        <Button
                            onClick={openForm}
                            size="large"
                            variant="contained"
                            color="warning"
                        >
                            Create Activity
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}