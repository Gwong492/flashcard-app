import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckFormComponent from "../forms/DeckFormComponent";

function CreateDeck() {
    const navigate = useNavigate();
    const initialFormState = {
                                name: "",
                                description: "",
                            }

    const [formData, setFormData] = useState({...initialFormState});
    
    const updateData = async (data, signal) => {
            try {
                await createDeck(data, signal);
            } catch (error) {
                console.error("Error updating deck:", error);
            }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jsonData = {
                            name: formData.name,
                            description: formData.description,
                        }

        if (window.confirm("Are you sure you want to save changes?")) {
            const abortController = new AbortController();
            const { signal } = abortController;
            await updateData(jsonData, signal);
            navigate(`/`);
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
        <DeckFormComponent 
            heading = {"Add Deck"}
            formData = {formData}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            cancelPath={"/"}
        />
    );
}

export default CreateDeck;