import { Database, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DataHubTeaser() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40">
            <div className="bg-electric-indigo text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between backdrop-blur-sm bg-opacity-95 border border-indigo-400/30">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                        <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight">Travel Index Data Hub</h3>
                        <p className="text-indigo-100 text-sm">Access granular data for 1,000+ global cities.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="bg-white text-electric-indigo hover:bg-indigo-50 font-bold border-none">
                        <Lock className="w-4 h-4 mr-2" />
                        Unlock Full Access
                    </Button>
                </div>
            </div>
        </div>
    );
}
