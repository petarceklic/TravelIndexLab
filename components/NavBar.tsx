import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavBar() {
    return (
        <nav className="border-b border-vapor-grey bg-lab-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-obsidian text-lab-white flex items-center justify-center font-serif font-bold rounded-sm">
                        TI
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight text-obsidian">
                        TravelIndexLab
                    </span>
                </div>

                {/* Navigation Tabs */}
                <div className="hidden md:flex items-center gap-8">
                    <span className="text-sm font-medium text-obsidian cursor-pointer border-b-2 border-signal-coral pb-5 mt-5">
                        Rising Cities
                    </span>
                    <span className="text-sm font-medium text-gray-400 cursor-pointer hover:text-obsidian transition-colors pb-5 mt-5 border-b-2 border-transparent hover:border-gray-200">
                        Cooling
                    </span>
                    <span className="text-sm font-medium text-electric-indigo cursor-pointer hover:text-indigo-700 transition-colors pb-5 mt-5 border-b-2 border-transparent">
                        Data Hub
                    </span>
                </div>

                {/* Mobile Menu Placeholder */}
                <div className="md:hidden">
                    {/* Simple Menu Icon */}
                    <div className="w-6 h-0.5 bg-obsidian mb-1"></div>
                    <div className="w-6 h-0.5 bg-obsidian mb-1"></div>
                    <div className="w-6 h-0.5 bg-obsidian"></div>
                </div>
            </div>
        </nav>
    );
}
