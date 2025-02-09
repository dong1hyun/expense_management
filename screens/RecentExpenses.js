import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });
    return (
        <ExpensesOutput 
        expenses={recentExpenses} 
        expensesPeriod="Last 7 Days" 
        fallbackText="최근 7일간 지출이 없어요."
        />
    )
}
 
export default RecentExpenses;