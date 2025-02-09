import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext)
    return (
        <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod="total"
        fallbackText="지출이 없어요."
        />
    )
}

export default AllExpenses;