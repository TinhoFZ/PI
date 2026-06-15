import api from "../api/api";
import type { Treasure } from "../types/Treasure";

export async function getTreasures() {
    const response =
        await api.get<Treasure[]>(
            "/treasures"
        );

    return response.data;
}

export async function getTreasure(
    id: number
) {
    const response =
        await api.get<Treasure>(
            `/treasures/${id}`
        );

    return response.data;
}