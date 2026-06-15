import api from "../api/api";
import type { Zone } from "../types/Zone";

export async function getZones() {
    const response =
        await api.get<Zone[]>(
            "/zones"
        );

    return response.data;
}

export async function getZone(
    id: number
) {
    const response =
        await api.get<Zone>(
            `/zones/${id}`
        );

    return response.data;
}

export async function createZone(
    data: Partial<Zone>
) {
    const response =
        await api.post(
            "/zones",
            data
        );

    return response.data;
}

export async function updateZone(
    id: number,
    data: Partial<Zone>
) {
    const response =
        await api.put(
            `/zones/${id}`,
            data
        );

    return response.data;
}

export async function deleteZone(
    id: number
) {
    const response =
        await api.delete(
            `/zones/${id}`
        );

    return response.data;
}