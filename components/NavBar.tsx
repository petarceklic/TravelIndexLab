"use client";

import { useRouter } from "next/navigation";

export function NavBar() {
    const router = useRouter();

    return (
        <nav className="border-b border-vapor-grey bg-lab-white sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                    <div className="w-8 h-8 bg-obsidian text-lab-white flex items-center justify-center font-bold rounded-sm">
                        TI
                    </div>
                    <span className="font-bold text-xl tracking-tight text-obsidian inline-block">
                        Travel Index Lab
                    </span>
                </div>

                {/* Mobile Menu Placeholder (Optional, can be removed if not needed) */}
                <div className="md:hidden">
                    <div className="w-6 h-0.5 bg-obsidian mb-1"></div>
                    <div className="w-6 h-0.5 bg-obsidian mb-1"></div>
                    <div className="w-6 h-0.5 bg-obsidian"></div>
                </div>
            </div>
        </nav>
    );
}
