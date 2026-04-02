import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AuthButtons = () => {
    return (
        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button component={Link} to="/signin" variant="outlined" color="primary">
                Sign In
            </Button>
            <Button component={Link} to="/signup" variant="contained" color="primary">
                Sign Up
            </Button>
        </Stack>
    );
};

export default AuthButtons;
