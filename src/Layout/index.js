import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import { Route, Routes } from "react-router-dom";
import DeckView from "../Decks/DeckView";
import EditDeck from "../Decks/EditDeck";
import CardList from "../Cards/CardList";
import EditCard from "../Cards/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks/:deckId" element={<DeckView />}>
          <Route index element={<CardList />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Layout;
