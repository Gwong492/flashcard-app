import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { Outlet, useParams } from "react-router-dom";

function DeckView() {
    const [decks, setDecks] = useState(null);
    const { deckId } = useParams()
        
    useEffect(() => {
        async function fetchDeck() {
            const response = await readDeck(deckId);
            setDecks(response);
        }
        fetchDeck()

    }, [])

    if (!decks) {
        return <h2>Loading...</h2>
    }
    
    const cards = decks.cards;

    const contextValue = { deckId, cards, decks }
    
    return (
        <Outlet context={contextValue}/>
    )
};

export default DeckView;