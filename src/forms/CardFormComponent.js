import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormComponent({ heading, formData, handleChange, handleSubmit }) {
    const navigate = useNavigate();
    const { deckId } = useParams();

    return (
        <div className="container w-65">
            <h2>{heading}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        rows="3"
                        placeholder="Enter front of the card"
                        value={formData.front}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        rows="3"
                        placeholder="Enter back of the card"
                        value={formData.back}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button
                    className="btn vbtn-secondary"
                    type="button"
                    onClick={() => navigate(`/decks/${deckId}`)}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default FormComponent;
