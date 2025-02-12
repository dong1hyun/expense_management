import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useEffect, useState } from "react";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function AllExpenses() {
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState(false);
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
    function errorHandler() {
        setError(null);
    };
    if (error) return (
        <ErrorOverlay
            onConfirm={errorHandler}
            message={error}
        />
    )
    if (isFetching) return <LoadingOverlay />
    return (
        <ExpensesOutput
            expenses={expensesCtx.expenses}
            expensesPeriod="total"
            fallbackText="지출이 없어요."
        />
    )
}

export default AllExpenses;