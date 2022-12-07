import CartReducer, { cartActions } from './cart';
import { mockCartData } from '../mock/mockData';

describe('CartReducer', () => {
  it('should return the initial state if no previous state', () => {
    expect(CartReducer(undefined, { type: undefined })).toEqual({
      items: [],
    });
  });

  it('should add Item to cart if not there before', () => {
    expect(
      CartReducer(undefined, cartActions.addItem(mockCartData[0]))
    ).toEqual({
      items: [mockCartData[0]],
    });
  });

  it('should increase price if item already in cart', () => {
    const previousState = { items: mockCartData };
    const { items } = CartReducer(
      previousState,
      cartActions.addItem(mockCartData[0])
    );
    expect(items[0].quantity).toEqual(2);
    expect(items[0].total).toEqual(20);
  });

  it('should remove Item from cart if last one', () => {
    const previousState = { items: mockCartData };
    expect(CartReducer(previousState, cartActions.removeItem(1))).toEqual({
      items: [mockCartData[1]],
    });
  });

  it('remove item should decrease total and quantity if item already in cart', () => {
    const previousState = { items: mockCartData };
    const { items } = CartReducer(previousState, cartActions.removeItem(2));
    expect(items[1].quantity).toEqual(1);
    expect(items[1].total).toEqual(11);
  });

  it('should replace existing cart items with new ones', () => {
    const previousState = { items: [mockCartData[0]] };
    expect(
      CartReducer(
        previousState,
        cartActions.replaceCart({ items: [mockCartData[1]] })
      )
    ).toEqual({
      items: [mockCartData[1]],
    });
  });

  it('should clear cart if replaceCart called with non items', () => {
    const previousState = { items: mockCartData };
    expect(CartReducer(previousState, cartActions.replaceCart({}))).toEqual({
      items: [],
    });
  });
});
