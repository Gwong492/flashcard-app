import { useState } from "react";
import { useOutletContext, Link, useNavigate, Outlet } from "react-router-dom";

function Study() {
    const navigate = useNavigate();
    const { deckId, decks, cards } = useOutletContext();
    const [ index, setIndex ] = useState(0);
    const [ cardSide, setCardSide ] = useState("Front")
    const outletContext = { deckId, decks };

    const handleFlip = (event) => {
        event.preventDefault();
        setCardSide("Back");
    }

    const handleNext = (event) => {
        event.preventDefault();
        if (index === cards.length - 1) {
            if (window.confirm("Would you like to restart?")) {
                setCardSide("Front");
                setIndex(0);
            } else {
                navigate(`/`)
            }
        } else {
            setIndex((currentIndex) => currentIndex + 1);
            setCardSide("Front");
        }
    }

    return ( 
        <>
            {cards.length <= 2? 
            <Outlet context={outletContext}/>:
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{`${decks.name}`}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <br />
                <div className="card w-75">
                    <div className="row">
                        <div className="card-title col">
                            <h4>Card {index + 1} of {cards.length}</h4>
                        </div>
                        <div className="card-title col">
                            <p>{cardSide}</p>
                        </div>
                    </div>
                    <div className="card-body">
                        {cardSide === "Front" ? 
                        (<>{cards[index].front}</>) :
                        (<>{cards[index].back}</>)
                        }
                    </div>
                    <div>
                        {cardSide === "Front" ? 
                            (<button className="btn btn-secondary" onClick={handleFlip}>Flip</button>) :
                            (
                            <>
                                <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                                <button className="btn btn-primary" onClick={handleNext}>Next</button>
                            </>
                            )
                        }
                    </div>
                </div>
            </>
            }       
        </>
    )
};

export default Study;