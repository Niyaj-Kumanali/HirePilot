import { Link } from 'react-router-dom';
import { Rocket } from "lucide-react";

const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-transparent hover:bg-white dark:hover:bg-transparent no-underline"
        >
            <Rocket size={24} className="text-primary" />
            <span className="text-xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                HirePilot.
            </span>
        </Link>
    );
};

export default Logo;
