import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);
    useEffect(() => {
        async function getExpenses() {
            try {
                setIsFetching(true);
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError("지출 데이터를 불러올 수 없습니다.");
            };
            setIsFetching(false);
        };
        getExpenses();
    }, []);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    function errorHandler() {
        setError(null);
    };

    if (error && !isFetching) {
        return <ErrorOverlay
            message={error}
            onConfirm={errorHandler}
        />
    }
    if (isFetching) return <LoadingOverlay />
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days"
            fallbackText="최근 7일간 지출이 없어요."
        />
    );
};

export default RecentExpenses;