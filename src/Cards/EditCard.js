import React, { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import FormComponent from "../forms/FormComponent";
import { updateCard } from "../utils/api";

function EditCard() {
    const { decks, deckId, cards } = useOutletContext();
    const { cardId } = useParams();
    const navigate = useNavigate();

    const initialFormState = {
        name: cards[cardId]?.name || "",
        description: cards[cardId]?.description || "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    const updateData = async (data, signal) => {
        try {
            await updateCard(data, signal);
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jsonData = {
            ...formData,
            id: Number(cardId),
            deckId: Number(deckId),
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
            <FormComponent
                heading="Edit Card"
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                cancelPath={`/decks/${deckId}`}
            />
        </>
    );
}

export default EditCard;
