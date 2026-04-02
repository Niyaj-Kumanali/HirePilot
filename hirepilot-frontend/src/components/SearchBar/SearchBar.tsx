import { Search } from 'lucide-react';
import { Box, Paper, InputBase, alpha, useTheme } from '@mui/material';

interface SearchBarProps {
  /** Placeholder text for the search input. */
  placeHolder: string;
  /** The current search query value. */
  value: string;
  /** Callback triggered on input change. */
  onChange: (value: string) => void;
}

/**
 * A specialized Search Input component with hover and focus effects.
 * 
 * Includes a Search icon that changes color on focus and a 
 * paper-style background with shadow and border transitions.
 */
const SearchBar = ({ placeHolder, value, onChange }: SearchBarProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', maxWidth: 600, height: '100%', mx: 'auto' }}>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: theme.shadows[1],
          p: 1,
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: theme.shadows[3],
          },
          '&:focus-within': {
            bgcolor: 'background.paper',
            borderColor: 'primary.main',
            boxShadow: `0 0 0 4px ${alpha(theme.palette.secondary.main, 0.1)}`,
            transform: 'translateY(-1px)',
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pl: 1.5,
            color: 'text.secondary',
            transition: 'color 0.3s ease',
            '.MuiPaper-root:focus-within &': {
              color: 'primary.main'
            }
          }}
        >
          <Search size={20} />
        </Box>
        <InputBase
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            ml: 1,
            flex: 1,
            fontSize: '0.875rem', // approx 14px, typically clearer than 12px
            fontWeight: 500,
            color: 'text.primary',
            '& input::placeholder': {
              color: 'text.secondary',
              opacity: 1,
              fontWeight: 400,
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;