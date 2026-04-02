import { Filter } from 'lucide-react';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { Box, Button } from '@mui/material';

interface JobToolbarProps {
    searchTerm: string;
    onSearchChange: (val: string) => void;
    onMobileFilterOpen: () => void;
}

const JobToolbar = ({ searchTerm, onSearchChange, onMobileFilterOpen }: JobToolbarProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                gap: 2,
                flexWrap: 'wrap',
                position: 'sticky',
                top: 70,
                zIndex: 10,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                ml: {xs: 0, md: 0, lg: "100px"},
            }}
        >
            <SearchBar
                placeHolder="Search jobs by title, company, or skills..."
                value={searchTerm}
                onChange={onSearchChange}
            />
            <Button
                variant="outlined"
                startIcon={<Filter size={16} />}
                onClick={onMobileFilterOpen}
                sx={{
                    display: { xs: 'flex', lg: 'none' },
                    borderRadius: 1.5,
                    fontWeight: 600,
                    px: 2.5,
                    py: 1.25,
                }}
            >
                Filters
            </Button>
        </Box>
    );
};

export default JobToolbar;
