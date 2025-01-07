import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import FormComponent from "../forms/FormComponent";
import { updateDeck } from "../utils/api";

function EditDeck() {
    const { decks, deckId, cards } = useOutletContext();
    const navigate = useNavigate();

    const initialFormState = {
        name: decks.name,
        description: decks.description,
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    const updateData = async (data, signal) => {
        try {
            await updateDeck(data, signal);
        } catch (error) {
            console.error("Error updating deck:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jsonData = {
            name: formData.name,
            description: formData.description,
            id: Number(deckId),
            cards: cards,
        };

        if (window.confirm("Are you sure you want to save changes?")) {
            const abortController = new AbortController();
            const { signal } = abortController;
            await updateData(jsonData, signal);
            navigate(`/decks/${deckId}`);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{decks.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <br />
            <FormComponent
                heading="Edit Deck"
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                cancelPath={`/decks/${deckId}`}
            />
        </>
    );
}

export default EditDeck;
