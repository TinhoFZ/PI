import api from "../api/api";

export async function getLocations() {
    const response = await api.get("/locations");
    return response.data;
}

export async function getLocationsByZone(zoneId: number) {
    const response = await api.get(`/locations/zone/${zoneId}`);
    return response.data;
}

export async function createLocation(data: {
    zone_id: number;
    name: string;
    description?: string;
    coordinate: [number, number];
    type?: "treasure" | "quest" | "npc" | "poi";
}) {
    const response = await api.post("/locations", data);
    return response.data;
}