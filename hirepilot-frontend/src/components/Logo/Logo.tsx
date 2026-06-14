import { Link } from 'react-router-dom';
import { Rocket } from "lucide-react";

const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-2.5 no-underline group"
        >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Rocket size={18} className="text-white" />
            </div>
            <span className="text-lg font-black text-[#202124] dark:text-[#e8eaed] tracking-tight">
                HirePilot
            </span>
        </Link>
    );
};

export default Logo;
