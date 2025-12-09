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
        <div className="w-full overflow-x-auto bg-lab-white rounded-lg shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
                <thead className="bg-vapor-grey text-xs uppercase tracking-wider text-gray-500 font-medium">
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
                    {data.map((city) => {
                        const isRising = city.trendDirection === 'rising';
                        const isCooling = city.trendDirection === 'cooling';
                        const isStable = city.trendDirection === 'stable';

                        const trendHex = isRising ? '#FF6B6B' : isCooling ? '#0081A7' : '#F59E0B'; // Amber for stable

                        // Dynamic Badge Logic
                        let Badge = null;
                        if (activeTab === 'rising') {
                            Badge = (
                                <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold text-signal-coral bg-red-50 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="w-3 h-3" />
                                    +{Math.floor(Math.random() * 40) + 10}%
                                </div>
                            );
                        } else if (activeTab === 'cooling') {
                            Badge = (
                                <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold text-deep-ocean bg-blue-50 px-2 py-1 rounded-full">
                                    <ArrowDownRight className="w-3 h-3" />
                                    -{Math.floor(Math.random() * 30) + 5}%
                                </div>
                            );
                        } else {
                            Badge = (
                                <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                    <Minus className="w-3 h-3" />
                                    HIGH
                                </div>
                            );
                        }

                        return (
                            <tr key={city.city} className="hover:bg-vapor-grey/50 transition-colors group">
                                <td className="px-6 py-5 font-mono text-gray-400 font-medium text-center">
                                    {String(city.rank).padStart(2, '0')}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-obsidian text-lg">{city.city}</span>
                                            {/* Mobile Insight Badge could go here */}
                                        </div>
                                        <span className="text-sm text-gray-500">{city.country}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="w-32 h-8">
                                        <Sparkline data={city.sparklineData} color={trendHex} />
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {Badge}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className={cn(
                                        "font-mono font-bold text-xl",
                                        isRising ? 'text-signal-coral' : isCooling ? 'text-deep-ocean' : 'text-amber-600'
                                    )}>
                                        {city.indexScore}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-600 max-w-sm hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        {/* Micro-Insight Badge */}
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                            {activeTab === 'cooling' ? 'Value Alert' : 'Insight'}
                                        </span>
                                        <span className="truncate">{city.insight}</span>
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
