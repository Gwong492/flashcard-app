import React from "react";

function FormComponent({ heading, formData, handleChange, handleSubmit, cancelPath }) {
    return (
        <div className="container w-65">
            <h3>{heading}</h3>
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
                    onClick={() => window.location.assign(cancelPath)}>
                        Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default FormComponent;
