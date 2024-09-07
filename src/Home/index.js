import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Deck from "../Decks/Deck";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function fetchDecks() {
            const deckList = await listDecks();
            setDecks(deckList);
        }

        fetchDecks()
    }, [])

   if (!decks) {
        return <h3>Loading...</h3>
   }

   return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
            <br />
            {decks.map((deck) => (
                <Deck name={deck.name} description={deck.description} deckId={deck.id} />
            ))}
        </>
   );
};

export default Home;
