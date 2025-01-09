import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext, Link } from "react-router-dom";
import FormComponent from "../forms/CardFormComponent";
import { updateCard } from "../utils/api";

function EditCard() {
    const { deckId, cards, setChange } = useOutletContext();
    const { cardId } = useParams();
    const navigate = useNavigate();

    let currentCard = null; 
    
    cards.forEach((card) => {
        if (Number(card.id) === Number(cardId)) {
            currentCard = card;
        }
    })

    const initialFormState = {
        front: currentCard?.front || "",
        back: currentCard?.back || "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;

        const updatedCard = {
            ...formData,
            id: Number(cardId),
            deckId: Number(deckId),
        };

        if (window.confirm("Areyou sure you want to save these changes?")) {
            await updateCard(updatedCard, signal);
            navigate(`/decks/${deckId}`);
            setChange(true);
        }
    };

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{cards[cardId]?.deckName || "Deck"}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card
                    </li>
                </ol>
            </nav>
            <FormComponent
                heading="Edit Card"
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default EditCard;
