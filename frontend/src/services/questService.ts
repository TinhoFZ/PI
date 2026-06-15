import api from "../api/api";
import type { Quest } from "../types/Quest";

export async function getQuests() {
    const response =
        await api.get<Quest[]>(
            "/quests"
        );

    return response.data;
}

export async function getQuest(
    id: number
) {
    const response =
        await api.get<Quest>(
            `/quests/${id}`
        );

    return response.data;
}