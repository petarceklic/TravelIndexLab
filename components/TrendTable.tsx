import { CityTrend } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountryFlag } from "@/components/CountryFlag";

interface TrendTableProps {
    data: CityTrend[];
}

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    const width = 120; // Slightly wider for elegance
    const height = 40; // Slightly taller
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Helper to calculate Y position
    const getY = (val: number) => {
        const normalizedY = range === 0 ? 0.5 : (val - min) / range;
        return height - (normalizedY * (height - 10)) - 5; // Add padding top/bottom
    };

    // Calculate Points
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = getY(val);
        return `${x},${y}`;
    }).join(" ");

    // Calculate Fill Path (Close the loop at the bottom)
    const fillPath = `
        M 0,${height} 
        L 0,${getY(data[0])} 
        ${data.map((val, i) => `L ${(i / (data.length - 1)) * width},${getY(val)}`).join(" ")} 
        L ${width},${height} 
        Z
    `;

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            {/* Gradient Definition for Fill */}
            <defs>
                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.05" />
                </linearGradient>
            </defs>

            {/* Fill Area */}
            <path
                d={fillPath}
                fill={`url(#gradient-${color})`}
                stroke="none"
            />

            {/* Line Stroke */}
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Start Dot */}
            <circle
                cx={0}
                cy={getY(data[0])}
                r="3"
                fill="white"
                stroke={color}
                strokeWidth="2"
            />

            {/* End Dot */}
            <circle
                cx={width}
                cy={getY(data[data.length - 1])}
                r="3"
                fill="white"
                stroke={color}
                strokeWidth="2"
            />
        </svg>
    );
};

export function TrendTable({ data, activeTab }: { data: CityTrend[], activeTab: string }) {

    // Dynamic Column Header
    let metricHeader = "GROWTH"; // Default Rising
    if (activeTab === 'cooling') metricHeader = "DECLINE";
    if (activeTab === 'established') metricHeader = "GROWTH";
    if (activeTab === 'regions') metricHeader = "GROWTH";
    if (activeTab === 'hidden-gems') metricHeader = "DISCOVERY";

    return (
        <div className="w-full overflow-x-auto bg-lab-white rounded-lg shadow-sm border border-gray-100 relative">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md text-xs uppercase tracking-wider text-gray-500 font-medium border-b border-gray-100 shadow-sm">
                    <tr>
                        <th className="px-6 py-4 font-mono text-center w-[5%] min-w-[60px]">#</th>
                        <th className="px-6 py-4 w-[25%] min-w-[200px]">City / Region</th>
                        <th className="px-2 py-4 text-center w-[10%] min-w-[80px]">Change</th>
                        <th className="px-6 py-4 w-[20%] min-w-[150px]">6 Month Trend</th>
                        <th className="px-6 py-4 text-center w-[15%] min-w-[120px]">{metricHeader}</th>
                        <th className="px-6 py-4 text-right font-mono w-[10%] min-w-[100px]">INDEX</th>
                        <th className="px-6 py-4 hidden md:table-cell w-[15%]">Key Insight</th>
                    </tr>
                </thead>
                <tbody className="bg-lab-white">
                    {data.map((city, index) => {
                        // Force color override if in a specific tab context
                        let effectiveDirection: string = city.trendDirection;
                        if (activeTab === 'rising') effectiveDirection = 'rising';
                        if (activeTab === 'cooling') effectiveDirection = 'cooling';
                        if (activeTab === 'regions') effectiveDirection = 'regions';
                        if (activeTab === 'hidden-gems') effectiveDirection = 'hidden-gems';

                        // Theme Colors: Rising=Emerald, Softening=DeepOcean, Classic=Slate, Regions=Indigo, Gems=Purple
                        let trendHex = '#64748B'; // Default Slate
                        let borderClass = 'group-hover:border-l-slate-400';

                        if (effectiveDirection === 'rising') {
                            trendHex = '#10B981';
                            borderClass = 'group-hover:border-l-signal-emerald';
                        } else if (effectiveDirection === 'cooling') {
                            trendHex = '#0081A7';
                            borderClass = 'group-hover:border-l-deep-ocean';
                        } else if (effectiveDirection === 'regions') {
                            trendHex = '#4F46E5'; // Electric Indigo for Regions
                            borderClass = 'group-hover:border-l-electric-indigo';
                        } else if (effectiveDirection === 'hidden-gems') {
                            trendHex = '#A855F7'; // Purple-500
                            borderClass = 'group-hover:border-l-purple-500';
                        }

                        // Rank Movement Icon & Number
                        let MovementDisplay = (
                            <div className="flex items-center justify-center gap-1 opacity-50">
                                <Minus className="w-3 h-3 text-gray-400" />
                            </div>
                        );

                        if (city.rankMovement === 'up') {
                            MovementDisplay = (
                                <div className="flex items-center justify-center gap-1">
                                    <ArrowUpRight className="w-4 h-4 text-signal-emerald" />
                                    <span className="text-xs font-bold font-mono text-signal-emerald">{city.rankMovementValue}</span>
                                </div>
                            );
                        } else if (city.rankMovement === 'down') {
                            MovementDisplay = (
                                <div className="flex items-center justify-center gap-1">
                                    <ArrowDownRight className="w-4 h-4 text-signal-ruby" />
                                    <span className="text-xs font-bold font-mono text-signal-ruby">{city.rankMovementValue}</span>
                                </div>
                            );
                        }


                        // Dynamic Badge Logic (Clean Number Only)
                        let Badge = null;
                        if (activeTab === 'rising') {
                            Badge = (
                                <div className="flex flex-col items-center">
                                    <span className="text-signal-emerald font-bold text-lg">+{Math.floor(Math.random() * 20) + 12}%</span>
                                </div>
                            );
                        } else if (activeTab === 'cooling') {
                            Badge = (
                                <div className="flex flex-col items-center">
                                    <span className="text-deep-ocean font-bold text-lg">-{Math.floor(Math.random() * 15) + 5}%</span>
                                </div>
                            );
                        } else if (activeTab === 'regions') {
                            Badge = (
                                <div className="flex flex-col items-center">
                                    <span className="text-electric-indigo font-bold text-lg">High</span>
                                </div>
                            );
                        } else if (activeTab === 'hidden-gems') {
                            Badge = (
                                <div className="flex flex-col items-center">
                                    {/* Using Purple for Gems */}
                                    <span className="text-purple-500 font-bold text-lg">Rare</span>
                                </div>
                            );
                        } else {
                            // Classic
                            Badge = (
                                <div className="flex flex-col items-center">
                                    <span className="text-slate-500 font-bold text-lg">High</span>
                                </div>
                            );
                        }

                        return (
                            <tr key={city.city} className={`group transition-all duration-200 hover:bg-slate-50 border-l-4 border-l-transparent border-b border-gray-200 ${borderClass}`}>
                                <td className="px-6 py-5 font-mono text-gray-400 font-medium text-center">
                                    {String(index + 1).padStart(2, '0')}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-obsidian text-lg group-hover:text-electric-indigo transition-colors">{city.city}</span>
                                            {index === 0 && <span className="text-xl" title="Rank #1">🥇</span>}
                                            {index === 1 && <span className="text-xl" title="Rank #2">🥈</span>}
                                            {index === 2 && <span className="text-xl" title="Rank #3">🥉</span>}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <CountryFlag country={city.country} className="w-4 h-3" />
                                            <span className="text-sm text-gray-500 font-medium">{city.country}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-5 text-center">
                                    {MovementDisplay}
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
                                        activeTab === 'regions' ? 'text-electric-indigo' :
                                            effectiveDirection === 'rising' ? 'text-signal-emerald' :
                                                effectiveDirection === 'cooling' ? 'text-deep-ocean' : 'text-slate-500'
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
