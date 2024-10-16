import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userStoreName } from './user.const';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(userStoreName);

const select = <T>(selector: (state: UserState) => T) => createSelector(selectUserState, selector);

const selectBasket = select((state) => state.basket);

const selectTotalCost = select((state) =>
  state.basket.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const selectNumberOfItems = select((state) =>
  state.basket.reduce((acc, item) => acc + item.quantity, 0)
);

const selectCredit = select((state) => state.credit);

export const UserSelectors = {
  selectBasket,
  selectTotalCost,
  selectNumberOfItems,
  selectCredit,
};
