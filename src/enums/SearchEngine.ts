export const SearchEngine = {
    DUCKDUCKGO: "duckduckgo",
    GOOGLE: "google",
    STARTPAGE: "startpage",
    WIKIPEDIA: "wikipedia",
    YOUTUBE: "youtube",
    AMAZON: "amazon",
    EXA: "exa",
} as const

export type SearchEngine = typeof SearchEngine[keyof typeof SearchEngine]
