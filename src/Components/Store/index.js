import { createSlice,configureStore } from "@reduxjs/toolkit";

const auth = createSlice({
    name:"authentication",
    initialState:{
        token:null,
        isLoggedIn:false,
    },
    reducers:{
        login(state,action){
            state.token=action.payload.token;
            state.isLoggedIn= true;
        },
        logout(state){
            state.token=null;
            state.isLoggedIn= false;
        }
    }
})


const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
      items: [],
      isPremium: false,
    },
    reducers: {
      addExpense(state, action) {
        state.items.push(action.payload);
        const total = state.items.reduce((sum, expense) => sum + parseFloat(expense.price), 0);
        state.isPremium = total > 10000;
      },
      setExpenses(state, action) {
        state.items = action.payload;
        const total = state.items.reduce((sum, expense) => sum + parseFloat(expense.price), 0);
        state.isPremium = total > 10000;
      },
    },
  });
  const store  = configureStore({
    reducer:{auth:auth.reducer,expenses:expensesSlice.reducer},
})
  
export const expensesActions = expensesSlice.actions;
export const AuthAction = auth.actions;
export default store

