import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Person {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
}

interface PersonState {
  people: Person[];
}

const LOCAL_KEY = "people";

const loadFromLocalStorage = (): Person[] => {
  if (typeof window === "undefined") return [];
  const storedData = localStorage.getItem(LOCAL_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

const saveToLocalStorage = (people: Person[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(people));
};

const initialState: PersonState = {
  people: loadFromLocalStorage(),
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.people.push(action.payload);
      saveToLocalStorage(state.people);
    },
    editPerson: (state, action: PayloadAction<Person>) => {
      state.people = state.people.map((person) =>
        person.id === action.payload.id ? action.payload : person,
      );
    },
    deletePerson: (state, action: PayloadAction<string>) => {
      state.people = state.people.filter(
        (person) => person.id !== action.payload,
      );
      saveToLocalStorage(state.people);
    },
  },
});

export const { addPerson, editPerson, deletePerson } = personSlice.actions;
export default personSlice.reducer;
