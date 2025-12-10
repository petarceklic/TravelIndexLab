import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TrendDirection = 'rising' | 'cooling' | 'stable' | 'regions';

export interface CityTrend {
  rank: number;
  city: string;
  country: string;
  trendDirection: 'rising' | 'cooling' | 'stable' | 'regions';
  category: 'rising' | 'cooling' | 'established';
  region: 'Asia-Pacific' | 'Europe' | 'Americas' | 'Middle East/Africa';
  indexScore: number;
  sparklineData: number[];
  insight: string;
  rankMovement?: 'up' | 'down' | 'stable';
  rankMovementValue?: number;
}

export const mockCities: CityTrend[] = [
  {
    rank: 1,
    city: "Tirana",
    country: "Albania",
    trendDirection: "rising",
    category: "rising",
    region: "Europe",
    indexScore: 98,
    sparklineData: [20, 35, 45, 60, 85, 98],
    insight: "Digital Nomad influx +400%"
  },
  {
    rank: 2,
    city: "Kyoto",
    country: "Japan",
    trendDirection: "cooling",
    category: "cooling",
    region: "Asia-Pacific",
    indexScore: 95,
    sparklineData: [90, 85, 80, 75, 78, 76],
    insight: "Post-Sakura season dip"
  },
  {
    rank: 3,
    city: "Medellín",
    country: "Colombia",
    trendDirection: "rising",
    category: "rising",
    region: "Americas",
    indexScore: 93,
    sparklineData: [40, 45, 55, 65, 80, 93],
    insight: "Tech hub expansion"
  },
  {
    rank: 4,
    city: "London",
    country: "UK",
    trendDirection: "stable",
    category: "established",
    region: "Europe",
    indexScore: 91,
    sparklineData: [90, 91, 90, 92, 91, 91],
    insight: "Consistent high volume"
  },
  {
    rank: 5,
    city: "Ubud",
    country: "Indonesia",
    trendDirection: "cooling",
    category: "cooling",
    region: "Asia-Pacific",
    indexScore: 89,
    sparklineData: [95, 92, 88, 85, 82, 89],
    insight: "Monsoon season approaching"
  },
  {
    rank: 6,
    city: "Cape Town",
    country: "South Africa",
    trendDirection: "rising",
    category: "rising",
    region: "Middle East/Africa",
    indexScore: 88,
    sparklineData: [50, 60, 65, 70, 82, 88],
    insight: "Summer season kickoff"
  },
  {
    rank: 7,
    city: "Seoul",
    country: "South Korea",
    trendDirection: "rising",
    category: "rising",
    region: "Asia-Pacific",
    indexScore: 87,
    sparklineData: [60, 65, 72, 78, 85, 87],
    insight: "K-Culture tourism peak"
  },
  {
    rank: 8,
    city: "Paris",
    country: "France",
    trendDirection: "stable",
    category: "established",
    region: "Europe",
    indexScore: 86,
    sparklineData: [85, 86, 85, 87, 86, 86],
    insight: "Olympic prep stability"
  },
  {
    rank: 9,
    city: "Tbilisi",
    country: "Georgia",
    trendDirection: "rising",
    category: "rising",
    region: "Europe",
    indexScore: 85,
    sparklineData: [30, 40, 50, 65, 75, 85],
    insight: "New direct flights added"
  },
  {
    rank: 10,
    city: "Mexico City",
    country: "Mexico",
    trendDirection: "stable",
    category: "established",
    region: "Americas",
    indexScore: 84,
    sparklineData: [80, 82, 81, 83, 84, 84],
    insight: "Culinary capital retention"
  },
  // Adding more diverse mock data to hit ~20 items for demo
  {
    rank: 11,
    city: "Hanoi",
    country: "Vietnam",
    trendDirection: "rising",
    category: "rising",
    region: "Asia-Pacific",
    indexScore: 82,
    sparklineData: [40, 50, 60, 70, 78, 82],
    insight: "Budget travel favorite"
  },
  {
    rank: 12,
    city: "New York",
    country: "USA",
    trendDirection: "stable",
    category: "established",
    region: "Americas",
    indexScore: 81,
    sparklineData: [95, 94, 95, 93, 94, 81],
    insight: "Holiday season prep"
  },
  {
    rank: 13,
    city: "Dubai",
    country: "UAE",
    trendDirection: "cooling",
    category: "cooling",
    region: "Middle East/Africa",
    indexScore: 80,
    sparklineData: [98, 95, 90, 85, 82, 80],
    insight: "Temperatures rising"
  },
  {
    rank: 14,
    city: "Marrakech",
    country: "Morocco",
    trendDirection: "rising",
    category: "rising",
    region: "Middle East/Africa",
    indexScore: 79,
    sparklineData: [55, 60, 68, 72, 75, 79],
    insight: "Spring festival buzz"
  },
  {
    rank: 15,
    city: "Lisbon",
    country: "Portugal",
    trendDirection: "cooling",
    category: "cooling",
    region: "Europe",
    indexScore: 78,
    sparklineData: [90, 88, 86, 84, 80, 78],
    insight: "Price saturation"
  }
];
