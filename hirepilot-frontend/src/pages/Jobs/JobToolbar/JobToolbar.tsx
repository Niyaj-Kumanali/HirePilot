import { Filter } from 'lucide-react';
import SearchBar from '../../../components/SearchBar/SearchBar';

interface JobToolbarProps {
    searchTerm: string;
    onSearchChange: (val: string) => void;
    onMobileFilterOpen: () => void;
}

const JobToolbar = ({ searchTerm, onSearchChange, onMobileFilterOpen }: JobToolbarProps) => {
    return (
        <div
            className="
                flex justify-center items-center p-2 gap-2 flex-wrap
                sticky top-[70px] z-10
                rounded-b-2xl
                ml-0 lg:ml-[100px]
            "
        >
            <SearchBar
                placeHolder="Search jobs by title, company, or skills..."
                value={searchTerm}
                onChange={onSearchChange}
            />
            <button
                onClick={onMobileFilterOpen}
                className="
                    lg:hidden inline-flex items-center gap-1
                    px-2.5 py-1.25 rounded-xl font-semibold text-sm
                    border border-[#e0e0e0] dark:border-[#3c4043]
                    text-[#202124] dark:text-[#e8eaed]
                    transition-all
                "
            >
                <Filter size={16} />
                Filters
            </button>
        </div>
    );
};

export default JobToolbar;
