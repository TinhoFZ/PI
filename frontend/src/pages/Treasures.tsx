import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import type {
    Treasure,
} from "../types/Treasure";

import {
    getTreasures,
} from "../services/treasureService";

export default function Treasures() {
    const [treasures, setTreasures] =
        useState<Treasure[]>([]);

    useEffect(() => {
        async function load() {
            const data =
                await getTreasures();

            setTreasures(data);
        }

        load();
    }, []);

    return (
        <>
            <Navbar />

            <h1>Tesouros</h1>

            {treasures.map(
                (treasure) => (
                    <div
                        key={
                            treasure.treasure_id
                        }
                    >
                        <h3>
                            {
                                treasure.name
                            }
                        </h3>

                        <p>
                            {
                                treasure.description
                            }
                        </p>
                    </div>
                )
            )}
        </>
    );
}