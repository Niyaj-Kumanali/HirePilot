import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: 'calc(100vh - 80px)' }}>
            <CircularProgress />
        </Box>
    );
};

export default Loading;
