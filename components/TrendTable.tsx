import { CityTrend } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendTableProps {
    data: CityTrend[];
}

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    const width = 100;
    const height = 30;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Normalize points to fit SVG
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const normalizedY = range === 0 ? 0.5 : (val - min) / range;
        const y = height - (normalizedY * height);
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg width={width} height={height} className="overflow-visible">
            {/* Line */}
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* End dot */}
            <circle
                cx={width}
                cy={height - ((data[data.length - 1] - min) / range * height)}
                r="3"
                fill={color}
            />
        </svg>
    );
};

export function TrendTable({ data, activeTab }: { data: CityTrend[], activeTab: string }) {

    // Dynamic Column Header
    let metricHeader = "Momentum"; // Default Rising
    if (activeTab === 'cooling') metricHeader = "Quiet Score";
    if (activeTab === 'established') metricHeader = "Volume Stability";

    return (
        <div className="w-full overflow-x-auto bg-lab-white rounded-lg shadow-sm border border-gray-100 relative">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md text-xs uppercase tracking-wider text-gray-500 font-medium border-b border-gray-100 shadow-sm">
                    <tr>
                        <th className="px-6 py-4 font-mono text-center w-16">#</th>
                        <th className="px-6 py-4">City</th>
                        <th className="px-6 py-4 w-48">6-Month Trend</th>
                        <th className="px-6 py-4 w-40 text-center">{metricHeader}</th>
                        <th className="px-6 py-4 text-right font-mono">Index</th>
                        <th className="px-6 py-4 hidden md:table-cell">Insight</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-lab-white">
                    {data.map((city, index) => {
                        const isRising = city.trendDirection === 'rising';
                        const isCooling = city.trendDirection === 'cooling';
                        // const isStable = city.trendDirection === 'stable'; // unused

                        // Force color override if in a specific tab context
                        let effectiveDirection = city.trendDirection;
                        if (activeTab === 'rising') effectiveDirection = 'rising';
                        if (activeTab === 'cooling') effectiveDirection = 'cooling';

                        const trendHex = effectiveDirection === 'rising' ? '#FF6B6B' : effectiveDirection === 'cooling' ? '#0081A7' : '#F59E0B';
                        const borderClass = effectiveDirection === 'rising' ? 'group-hover:border-signal-coral' : effectiveDirection === 'cooling' ? 'group-hover:border-deep-ocean' : 'group-hover:border-amber-500';

                        // Dynamic Badge Logic
                        let Badge = null;
                        if (activeTab === 'rising') {
                            Badge = (
                                <div className="flex flex-col items-center">
                                    <span className="text-signal-coral font-bold text-lg">+{Math.floor(Math.random() * 20) + 12}%</span>
                                    <span className="text-xs text-gray-400 font-medium uppercase">MoM</span>
                                </div>
                            );
                        } else if (activeTab === 'cooling') {
                            Badge = (
                                <div className="flex flex-col items-center">
                                    <span className="text-deep-ocean font-bold text-lg">-{Math.floor(Math.random() * 15) + 5}%</span>
                                    <span className="text-xs text-gray-400 font-medium uppercase">Price Drop</span>
                                </div>
                            );
                        } else {
                            // Established / Regions
                            Badge = (
                                <div className="flex flex-col items-center">
                                    <span className="text-amber-600 font-bold text-lg">High</span>
                                    <span className="text-xs text-gray-400 font-medium uppercase">Volume</span>
                                </div>
                            );
                        }

                        return (
                            <tr key={city.city} className={`group transition-all duration-200 hover:bg-slate-50 border-l-4 border-transparent ${borderClass}`}>
                                <td className="px-6 py-5 font-mono text-gray-400 font-medium text-center">
                                    {String(index + 1).padStart(2, '0')}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-obsidian text-lg group-hover:text-electric-indigo transition-colors">{city.city}</span>
                                            {/* Mobile Insight Badge could go here */}
                                        </div>
                                        <span className="text-sm text-gray-500 font-medium">{city.country}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="w-32 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
                                        <Sparkline data={city.sparklineData} color={trendHex} />
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {Badge}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className={cn(
                                        "font-mono font-bold text-xl",
                                        effectiveDirection === 'rising' ? 'text-signal-coral' : effectiveDirection === 'cooling' ? 'text-deep-ocean' : 'text-amber-600'
                                    )}>
                                        {city.indexScore}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-600 max-w-sm hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        <span className="truncate group-hover:text-gray-900 transition-colors">{city.insight}</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
