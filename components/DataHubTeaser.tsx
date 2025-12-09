import { Database, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DataHubTeaser() {
    return (
export function DataHubTeaser() {
        return (
            <div className="fixed bottom-0 left-0 w-full z-50 bg-electric-indigo text-white shadow-[0_-5px_20px_rgba(0,0,0,0.2)] border-t border-indigo-400/30 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-indigo-300" />
                        <span className="font-medium text-indigo-100 text-sm hidden sm:inline">
                            Viewing Top 25 of 1,000+ Cities.
                        </span>
                        <span className="font-medium text-indigo-100 text-sm sm:hidden">
                            Viewing Top 25 Cities
                        </span>
                    </div>

                    <Button className="bg-white text-electric-indigo hover:bg-indigo-50 font-bold border-none h-9 px-6 rounded-lg shadow-sm transition-all transform hover:scale-105">
                        <Lock className="w-4 h-4 mr-2" />
                        Unlock Full Dataset
                    </Button>
                </div>
            </div>
        );
    }
    );
}
