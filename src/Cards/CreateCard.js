import React, { useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { createCard } from "../utils/api";
import FormComponent from "../forms/CardFormComponent";

function CreateCard() {
    const { deckId, decks } = useOutletContext();
    const navigate = useNavigate();

    const initialFormState = {
        front: "",
        back: "",
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

        const newCard = {
            front: formData.front,
            back: formData.back,
            deckId: Number(deckId),
        };

        if (window.confirm("Are you sure you want to save these changes?")) {
            try {
                await createCard(deckId, newCard, signal);
                setFormData({ ...initialFormState });
                navigate(`/decks/${deckId}`);
            } catch (error) {
                console.error("Error creating card:", error);
            }
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
                        <Link to={`/decks/${deckId}`}>{decks.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <div className="container w-65">
                <FormComponent
                    heading={`${decks.name}: Add Card`}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

export default CreateCard;
