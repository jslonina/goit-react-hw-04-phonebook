import { nanoid } from 'nanoid';
import { combineReducers, createSlice } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';

const initialState = [];

export const contactsReducer = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContacts: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            name: contact.name,
            number: contact.number,
            id: nanoid(),
          },
        };
      },
    },
    removeContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { setContacts, addContacts, removeContact } =
  contactsReducer.actions;

export const rootReducer = combineReducers({
  contacts: contactsReducer.reducer,
  filter: filterSlice.reducer,
});