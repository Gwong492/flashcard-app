import { useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";

function Study() {
    const navigate = useNavigate();
    const { deckId, decks, cards } = useOutletContext();
    const [ index, setIndex ] = useState(0);
    const [ cardSide, setCardSide ] = useState("front")

    const handleFlip = (event) => {
        event.preventDefault();
        setCardSide("back");
    }

    const handleNext = (event) => {
        event.preventDefault();
        if (index === cards.length - 1) {
            navigate(`/decks/${deckId}`)
        } else {
            setIndex((currentIndex) => currentIndex + 1);
            setCardSide("front");
        }
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{`${decks.name}`}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <br />
            <div className="card w-75">
                <div className="row">
                    <div className="card-title col">
                        <h4>Card {index + 1} of {cards.length}</h4>
                    </div>
                    <div className="card-title col float-right">
                        <h5>{cardSide}</h5>
                    </div>
                </div>
                <div className="card-body">
                    {cardSide === "front" ? 
                    (<>{cards[index].front}</>) :
                    (<>{cards[index].back}</>)
                     }
                </div>
                <div>
                    {cardSide === "front" ? 
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
    )
};

export default Study;