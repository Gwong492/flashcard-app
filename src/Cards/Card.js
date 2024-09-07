import { Link } from "react-router-dom";

function Card({ card }) {
    return (
        <>
            <div className="card w-75">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="card-text">{card.front}</div>
                        </div>
                        <div className="col">
                        <div className="card-text">{card.back}</div>
                        </div>
                    </div>
                    <br />
                    <Link to={"#"} className="btn btn-danger float-right">Delete</Link>
                    <Link to={"#"} className="btn btn-secondary float-right">Edit</Link>
                </div>
            </div>
            <br />
        </>
    )
};

export default Card;