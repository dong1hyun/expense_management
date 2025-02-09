import { createContext, useReducer } from "react";
const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'shoes',
        amount: 59.99,
        date: new Date('2024-12-19')
    },
    {
        id: 'e2',
        description: 'bag',
        amount: 10.99,
        date: new Date('2025-2-7')
    },
    {
        id: 'e3',
        description: 'laptop',
        amount: 10,
        date: new Date('2025-2-5')
    },
    {
        id: 'e4',
        description: 'food',
        amount: 10.99,
        date: new Date('2025-1-19')
    }
];
export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ id, ...action.payload }, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.expenseData }
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    };

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id, expenseData } })
    }

    const value = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense
    };
    return (
        <ExpensesContext.Provider
            value={value}
        >
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;