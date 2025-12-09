import { CityTrend } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from "lucide-react";

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

export function TrendTable({ data }: TrendTableProps) {
    return (
        <div className="w-full overflow-x-auto bg-lab-white rounded-lg shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
                <thead className="bg-vapor-grey text-xs uppercase tracking-wider text-gray-500 font-medium">
                    <tr>
                        <th className="px-6 py-4 font-mono text-center w-16">#</th>
                        <th className="px-6 py-4">City</th>
                        <th className="px-6 py-4">6-Month Trend</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-right font-mono">Index</th>
                        <th className="px-6 py-4">Key Insight</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-lab-white">
                    {data.map((city) => {
                        const isRising = city.trendDirection === 'rising';
                        const isCooling = city.trendDirection === 'cooling';

                        // Dynamic Colors
                        const trendColor = isRising ? 'var(--color-signal-coral)' : isCooling ? 'var(--color-deep-ocean)' : '#9CA3AF';
                        // We need hex for SVG safely if variables don't resolve in SVG context easily without CSS var support in all browsers, 
                        // but usually modern browsers handle var() in stroke. 
                        // However, for safety in Sparkline component which might do math or canvas later, let's map to hex or keep var.
                        // We configured global CSS variables. Let's use the explicit hex values for the prop to ensure SVG rendering works perfectly.
                        const trendHex = isRising ? '#FF6B6B' : isCooling ? '#0081A7' : '#9CA3AF';

                        return (
                            <tr key={city.city} className="hover:bg-vapor-grey/50 transition-colors group">
                                <td className="px-6 py-5 font-mono text-gray-400 font-medium text-center">
                                    {String(city.rank).padStart(2, '0')}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-obsidian text-lg">{city.city}</span>
                                        <span className="text-sm text-gray-500">{city.country}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="w-24">
                                        <Sparkline data={city.sparklineData} color={trendHex} />
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="flex items-center justify-center">
                                        {isRising && <ArrowUpRight className="w-5 h-5 text-signal-coral" />}
                                        {isCooling && <ArrowDownRight className="w-5 h-5 text-deep-ocean" />}
                                        {city.trendDirection === 'stable' && <Minus className="w-5 h-5 text-gray-300" />}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className={`font-mono font-bold text-xl ${isRising ? 'text-signal-coral' : 'text-obsidian'}`}>
                                        {city.indexScore}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-600 max-w-sm font-medium">
                                    {city.insight}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
