import { X, Camera } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, Box, IconButton, Button, Stack, useTheme, alpha } from '@mui/material';

interface ImageModalProps {
    onClose: () => void;
}

const ImageModal = ({ onClose }: ImageModalProps) => {
    const theme = useTheme();

    return (
        <Dialog
            open={true}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    background: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(20px)',
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box sx={{ fontWeight: 700, fontSize: '1.25rem' }}>Profile Picture</Box>
                <IconButton onClick={onClose} size="small">
                    <X size={20} />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2}>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Camera size={20} />}
                        sx={{
                            py: 2,
                            justifyContent: 'flex-start',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Upload Photo
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;
