import { Link, useNavigate } from "react-router-dom"

function DeckFormComponent({ heading, formData, handleChange, handleSubmit, cancelPath}) {
    const navigate = useNavigate();

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
                        onClick={() => navigate(cancelPath)}>
                            Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default DeckFormComponent