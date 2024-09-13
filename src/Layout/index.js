import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import { Route, Routes } from "react-router-dom";
import DeckView from "../Decks/DeckView";
import EditDeck from "../Decks/EditDeck";
import CardList from "../Cards/CardList";
import EditCard from "../Cards/EditCard";
import Study from "../Decks/Study";
import CardCall from "../Cards/CardCall";
import CreateDeck from "../Decks/CreateDeck";
import NotEnoughCards from "../Decks/NotEnoughCards";

function Layout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks/new" element={<CreateDeck />} />
        <Route path="/decks/:deckId" element={<DeckView />}>
          <Route index element={<CardList />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards" element={<EditCard />} >
            <Route path=":cardId/:cardRequestType" element={<CardCall />} />
            <Route path=":cardRequestType" element={<CardCall />} />
          </Route>
          <Route path="/decks/:deckId/study" element={<Study />} >
            <Route index element={<NotEnoughCards />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Layout;
