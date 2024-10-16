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
  on(UserActions.addToBasket, (state, { item }) => {
    const itemExists = state.basket.some((i) => i.id === item.id);
    if (itemExists) {
      return {
        ...state,
        basket: state.basket.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    }
    return {
      ...state,
      basket: [...state.basket.filter((i) => i.id !== item.id), { ...item }],
    };
  }),
  on(UserActions.removeFromBasket, (state, { item }) => ({
    ...state,
    basket: state.basket.filter((i) => i.id !== item.id),
  })),
  on(UserActions.clearBasket, (state) => ({
    ...state,
    basket: [],
  }))
);
