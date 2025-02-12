import axios from "axios";

const URL_BASE = "https://react-native-course-4c4fe-default-rtdb.firebaseio.com"

export async function storeExpense(expenseData) {
    const response = await axios.post(URL_BASE + "/expenses.json", expenseData);
    return response.data.name;
};

export async function fetchExpenses() {
    const respnse = await axios.get(URL_BASE + "/expenses.json");

    const expenses = [];
    for (const key in respnse.data) {
        const expenseObj = {
            id: key,
            amount: respnse.data[key].amount,
            date: new Date(respnse.data[key].date),
            description: respnse.data[key].description,
        };
        expenses.push(expenseObj);
    };

    return expenses;
};

export function updateExpense(id, expenseData) {
    return axios.put(URL_BASE + `/expenses/${id}.json`, expenseData);
};

export function deleteExpense(id) {
    return axios.delete(URL_BASE + `/expenses/${id}.json`);
};