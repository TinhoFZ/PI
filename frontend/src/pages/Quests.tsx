import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import type { Quest } from "../types/Quest";

import { getQuests } from "../services/questService";

export default function Quests() {
    const [quests, setQuests] = useState<Quest[]>([]);

    useEffect(() => {
        async function load() {
            try {
                const data = await getQuests();
                setQuests(data);
            } catch (error) {
                console.error(error);
            }
        }

        load();
    }, []);

    return (
        <>
            <Navbar />

            <h1>Quests</h1>

            {quests.map((quest) => (
                <div key={quest.id}>
                    <h3>{quest.name}</h3>
                    <p>{quest.description}</p>
                </div>
            ))}
        </>
    );
}