import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Deck from "../Decks/Deck";
import { Link } from "react-router-dom";

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
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
            <br />
            <Link to={`/decks/new`} className="btn btn-primary">Add Deck</Link> 
            <br />
            {decks.map((deck) => (
                <Deck name={deck.name} description={deck.description} deckId={deck.id} />
            ))}
        </>
   );
};

export default Home;
