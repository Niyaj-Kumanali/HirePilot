import { Search } from 'lucide-react';
import TextField from '../ui/TextField';

interface SearchBarProps {
  placeHolder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ placeHolder, value, onChange }: SearchBarProps) => {
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <TextField
        iconLeft={<Search size={20} />}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
      />
    </div>
  );
};

export default SearchBar;
