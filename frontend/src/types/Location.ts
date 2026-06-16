export type Location = {
    location_id: number;
    zone_id: number;
    name: string;
    description: string;
    type?: string;
    coordinate: [number, number];
};