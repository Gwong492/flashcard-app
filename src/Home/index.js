import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Deck from "../Decks/Deck";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(()=>{
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
            {decks.map((deck) => (
                <Deck name={deck.name} description={deck.description} />
            ))}
        </>
   )
}

export default Home;
