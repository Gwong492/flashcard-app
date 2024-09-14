import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

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
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">New Deck</li>                          
                </ol>
            </nav>
            <br />
            <div className="container w-65">
                <h3>Create Deck</h3>
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
                        onClick={() => navigate(`/`)}>
                            Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default CreateDeck;