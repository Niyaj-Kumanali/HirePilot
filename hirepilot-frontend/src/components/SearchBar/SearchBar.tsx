import { Search } from 'lucide-react';

interface SearchBarProps {
  placeHolder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ placeHolder, value, onChange }: SearchBarProps) => {
  return (
    <div className="w-full max-w-[600px] h-full mx-auto">
      <div
        className="
          relative flex items-center
          bg-white dark:bg-[#1a1d23]
          border border-[#e0e0e0] dark:border-[#3c4043]
          rounded-2xl p-2
          shadow-sm
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          hover:border-primary hover:shadow-md
          focus-within:bg-white dark:focus-within:bg-[#1a1d23]
          focus-within:border-primary
          focus-within:shadow-[0_0_0_4px_rgba(168,85,247,0.1)]
          focus-within:-translate-y-px
        "
      >
        <div
          className="
            flex items-center justify-center pl-1.5
            text-[#5f6368] dark:text-[#9aa0a6]
            transition-colors duration-300
            [.MuiPaper-root:focus-within_&]:text-primary
          "
        >
          <Search size={20} />
        </div>
        <input
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            ml-1 flex-1
            text-sm font-medium
            text-[#202124] dark:text-[#e8eaed]
            bg-transparent border-none outline-none
            placeholder:text-[#5f6368] dark:placeholder:text-[#9aa0a6]
            placeholder:font-normal
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;
