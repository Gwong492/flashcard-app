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
    }, []);

   if (!decks) {
        return <h3>Loading...</h3>
   };

   return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
            <br />
            <div className="container w-65">
                <h2>Decks</h2>
                <br />
                <Link to={`/decks/new`} className="btn btn-primary">Add Deck</Link> 
                <br />
            </div>
            <br />
            <div className="container w-65">
                {decks.map((deck) => {
                    const cards = deck.cards;
                    return (
                        <Deck name={deck.name} description={deck.description} deckId={deck.id} cards={cards} />
                    )
                })}
            </div>
        </>
   );
};

export default Home;
