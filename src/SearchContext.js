import React from "react";

const SearchContext = React.createContext({
    location: "Seatle, WA",
    animal: "",
    breed: "",
    breeds: [],
    handleBreedChange() {},
    handleAnimalChange() {},
    handleLocationChange() {},
    getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;