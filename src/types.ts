export interface Task {
    id: string;
    title: string;
    done: boolean;
}

export interface NewsItem {
    id: number;
    title: string;
    url: string;
}

export interface FullNewsData {
    id: number;
    title: string;
    url: string;
    by: string;
    descendants: number;
    score: number;
    time: number;
    type: string;
}

export interface CachedItem {
    data: FullNewsData;
    timestamp: number;
}

export interface SavedLink {
    id: string;
    title: string;
    url: string;
}
