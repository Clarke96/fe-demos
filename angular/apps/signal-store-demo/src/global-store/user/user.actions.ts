import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Item } from '../../models/item';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    AddToCart: props<{ item: Item }>(),
    RemoveFromCart: props<{ item: Item }>(),
    ClearCart: emptyProps(),
    SetCredit: props<{ credit: number }>(),
  },
});
