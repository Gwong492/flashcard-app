import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(()=>{
        async function fetchDecks() {
            const deckList = await listDecks();
            setDecks(deckList);
        }

        fetchDecks()
    }, [])

   

    
    if(decks.length > 0) {
        return (
            <>
                {decks.map((deck) => (
                    <p key={deck.id}>{deck.name}</p>
                ))}
            </>
            
        
        );
    } else {
        return null;
    }
}

export default Home;
