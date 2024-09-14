import React, { useState } from "react";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";

function EditCard() {
   const { decks, deckId, cards } = useOutletContext();
   const { cardId, cardRequestType } = useParams();
   const navigate = useNavigate();
   

   const [ request, setRequest ] = useState(cardRequestType);

   

    const formContext = { request, deckId, cardId, navigate, decks, cards };

    return (
        <Outlet context={formContext} />
    );
};

export default EditCard;