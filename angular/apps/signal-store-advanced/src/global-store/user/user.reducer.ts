import { createReducer, on } from '@ngrx/store';
import { Item } from '../../models/item';
import { UserActions } from './user.actions';

export interface UserState {
  credit: number;
  name: string;
  basket: Item[];
}

const initialState: UserState = {
  credit: 25,
  name: 'Test User',
  basket: [],
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.addToCart, (state, { item }) => ({
    ...state,
    basket: [...state.basket.filter((i) => i.id !== item.id), item],
  })),
  on(UserActions.removeFromCart, (state, { item }) => ({
    ...state,
    basket: state.basket.filter((i) => i.id !== item.id),
  })),
  on(UserActions.clearCart, (state) => ({
    ...state,
    basket: [],
  }))
);
