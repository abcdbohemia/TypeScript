import { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {

  const products =[...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.helpers.arrayElement([true, false]),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5])
  }));

  const [state, dispatch] = useReducer(cartReducer, {
      products: products,
      cart:[]
  });

  const [productState, productDispatch] = useReducer(productReducer, {
  byStock: false,
  byFastDelivery: false,
  byRating: 0, 
  searchQuery: "",
  });
//useReducer returns an array with exactly two elements (state, dispatch function )
//dyspatch function is passed down through Cart.Provider
//and made available to any component that calls useContext(Cart)
  return (
  <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
    {children}
  </Cart.Provider>
  )
}

export default Context;
// import this once at a very high level in your application's component tree, usually in src/index.js

export const CartState = () => {
  return useContext(Cart);
}
//mport this in any component that needs to access the cart state or dispatch function. 


//: This CartState hook, when called from a component that is a descendant 
// of <Cart.Provider>, uses useContext(Cart) to read the value that was passed to the Cart.Provider.