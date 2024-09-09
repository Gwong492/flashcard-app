import { useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck() {
    const { decks, deckId, cards } = useOutletContext();
    const navigate = useNavigate();

    const initialFormState = {
        name: decks.name || '',
        description: decks.description || '',
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
            id: deckId,
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
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{`${decks.name}`}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <br />
            <h3>Edit Deck</h3>
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h5>Name</h5>
                </label>
                <br />
                <input
                    className="form-control w-75"
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <br />
                <label htmlFor="description">
                    <h5>Description</h5>
                </label>
                <br />
                <textarea
                    className="form-control w-75"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    rows={3}
                    value={formData.description}
                />
                <br />
                <button 
                    className="btn btn-secondary" 
                    type="button" 
                    onClick={() => navigate(`/decks/${deckId}`)}>
                        Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
}

export default EditDeck;