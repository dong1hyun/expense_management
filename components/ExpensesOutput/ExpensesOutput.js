import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

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

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});