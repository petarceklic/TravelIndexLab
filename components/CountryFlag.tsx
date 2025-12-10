"use client";

import lookup from "country-code-lookup";
import { cn } from "@/lib/utils";

// Manual overrides for non-standard country names in our dataset
const COUNTRY_OVERRIDES: Record<string, string> = {
    "USA": "US",
    "UK": "GB",
    "UAE": "AE",
    "South Korea": "KR",
    "Czech Republic": "CZ",
    "Bosnia": "BA",
    "Turkey": "TR",
    "Vietnam": "VN",
    "Russia": "RU",
    "Moldova": "MD",
    "Tanzania": "TZ",
    "Bolivia": "BO",
    "Venezuela": "VE",
    "Iran": "IR",
    "Syria": "SY",
    "Laos": "LA",
    "Eswatini": "SZ", // formerly Swaziland
    "Macedonia": "MK",
    "Taiwan": "TW"
};

interface CountryFlagProps {
    country: string;
    className?: string;
}

export function CountryFlag({ country, className }: CountryFlagProps) {
    let isoCode = COUNTRY_OVERRIDES[country];

    if (!isoCode) {
        const result = lookup.byCountry(country) || lookup.byIso(country) || lookup.byFips(country);
        if (result) {
            isoCode = result.iso2;
        }
    }

    if (!isoCode) {
        // Fallback for unknown countries
        return (
            <div className={cn("w-6 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[8px] text-gray-400", className)} title={country}>
                ?
            </div>
        );
    }

    // Using flagcdn.com (public CDN, free, fast)
    // w40 represents width 40px (retina optimized for small sizes)
    const flagUrl = `https://flagcdn.com/w40/${isoCode.toLowerCase()}.png`;

    return (
        <div className={cn("relative inline-block shrink-0 rounded-sm overflow-hidden border border-black/10 shadow-sm", className)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={flagUrl}
                alt={`${country} flag`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                    // Fallback on error
                    (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
        </div>
    );
}
