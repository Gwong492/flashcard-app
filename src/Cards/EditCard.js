import { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { updateCard } from "../utils/api";

function EditCard() {
   const { decks, deckId, cards } = useOutletContext();
   const { cardId } = useParams();
   const navigate = useNavigate();
   let cardData = null;
   cards.forEach((card) => {
        if (card.id === Number(cardId)) {
            cardData = {
                front: card.front,
                back: card.back,
                id: card.id,
                deckId: card.deckId,
            };          
        };
   });
   
    const initialFormState = {
        front: cardData.front || "",
        back: cardData.back || "",
    };

   const [ formData, setFormData ] = useState({...initialFormState});

    
    const updateData = async (data, signal) => {
        try {
            await updateCard(data, signal);
        } catch (error) {
            console.error("Error updating card:", error);
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jsonData = {
            front: formData.front,
            back: formData.back,
            id: cardData.id,
            deckId: deckId,
        };

        if (window.confirm("Are you sure you want to save changes?")) {
            const abortController = new AbortController();
            const { signal } = abortController;
            await updateData(jsonData, signal);
            navigate(`/decks/${deckId}`);
        };
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
                    <li class="breadcrumb-item active" aria-current="page">Edit Card</li>
                </ol>
            </nav>
            <br />
            <h3>Edit Card</h3>
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    Front
                </label>
                <br />
                <textarea
                    className="form-control w-75"
                    type="text"
                    rows={3}
                    name="front"
                    onChange={handleChange}
                    value={formData.front}
                ></textarea>
                <br />
                <label>
                    Back
                </label>
                <br />
                <textarea
                    className="form-control w-75"
                    type="text"
                    rows={3}
                    name="back"
                    onChange={handleChange}
                    value={formData.back}
                ></textarea>
                <br />
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => navigate(`/decks/${deckId}`)}>
                        Cancel
                    </button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default EditCard;