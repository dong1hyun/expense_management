import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
    const [error, setError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const targetId = route.params?.expenseId;
    const isEditing = Boolean(targetId);
    const expensesCtx = useContext(ExpensesContext);
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === targetId);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [isEditing, navigation]);

    async function deleteExpenseHandler() {
        try {
            setIsSubmitting(true);
            await deleteExpense(targetId);
            expensesCtx.deleteExpense(targetId);
            navigation.goBack();
        } catch (error) {
            setError("지출 내역 삭제에 실패했습니다.");
        }

        setIsSubmitting(false);
    }
    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        if (isEditing) {
            try {
                await updateExpense(targetId, expenseData);
                expensesCtx.updateExpense(targetId, expenseData);
                navigation.goBack();
            } catch (error) {
                setError("지출 내역 수정에 실패했습니다.");
            }
        } else {
            try {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ id, ...expenseData });
                navigation.goBack();
            } catch (error) {
                setError("지출 내역 추가에 실패했습니다.");
            }
        }
        setIsSubmitting(false);
    }
    function errorHandler() {
        setError(null);
        navigation.goBack();
    };
    if (error) return (
        <ErrorOverlay
            onConfirm={errorHandler}
            message={error}
        />
    )
    if (isSubmitting) return <LoadingOverlay />;
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