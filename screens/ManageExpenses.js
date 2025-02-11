import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenses({ route, navigation }) {
    const targetId = route.params?.expenseId;
    const isEditing = Boolean(targetId);
    const expensesCtx = useContext(ExpensesContext);
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === targetId);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [isEditing, navigation]);

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(targetId);
        navigation.goBack();
    }
    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        isEditing ? 
        expensesCtx.updateExpense(targetId, expenseData) :
        expensesCtx.addExpense(expenseData)
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <ExpenseForm 
            onSubmit={confirmHandler}
            submitButtonLabel={isEditing ? 'Update' : 'Add'} 
            onCancel={cancelHandler} 
            defaultValue={selectedExpense}
            />
            {isEditing
                &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            }
        </View>
    )
}
export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});