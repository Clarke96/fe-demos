import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Item } from '../../models/item';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    AddToBasket: props<{ item: Item }>(),
    RemoveFromBasket: props<{ item: Item }>(),
    ClearBasket: emptyProps(),
    SetCredit: props<{ credit: number }>(),
  },
});
