import { useOutletContext, Link } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";
import React, { useState } from "react";

function CardCall() {
    const { request, deckId, cardId, navigate, decks, cards } = useOutletContext();

    let cardData = {};
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
   
    const initialFormState = () => {
        if (request === "edit" && cardData) {
            return {
                front: cardData.front,
                back: cardData.back,
            };
        }  
        return {
            front: "",
            back: "",
        };
        
    };

   const [ formData, setFormData ] = useState(initialFormState());

    const updateData = async (data, signal, request, deckId) => {
        if (request === "update") {
            try {
                await updateCard(data, signal);
            } catch (error) {
                console.error("Error updating card:", error);
            };
        } else if (request === "new") {
            try {
                await createCard(deckId, data, signal);
            } catch (error) {
                console.error("Error updating card:", error);
            };
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jsonData = () => {
            if (request === "edit") {
                return {
                    front: formData.front,
                    back: formData.back,
                    id: cardId,
                    deckId: deckId,
                };
            } 
            return {
                front: formData.front,
                back: formData.back,
                deckId: deckId,
            };
        }

        if (window.confirm("Are you sure you want to save changes?")) {
            const abortController = new AbortController();
            const { signal } = abortController;
            await updateData(jsonData(), signal, request, deckId );
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
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{`${decks.name}`}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {request === "edit"?
                        (<>{`Edit Card ${cardId}`}</>):
                        (<>New Card</>)}
                    </li>
                </ol>
            </nav>
            <br />
            <div className="container w-65">
                <h3>
                    {request === "edit"?
                    (<>Edit Card</>):
                    (<>Add Card</>)}
                </h3>
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
            </div>
        </>
    )
};

export default CardCall;