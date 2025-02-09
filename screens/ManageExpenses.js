import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpenses({ route, navigation }) {
    const targetId = route.params?.expenseId;
    const isEditing = Boolean(targetId);
    const expensesCtx = useContext(ExpensesContext)
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

    function confirmHandler() {
        isEditing ? 
        expensesCtx.updateExpense(targetId, {description: "수정", amount: 12.99, date: new Date()}) :
        expensesCtx.addExpense({description: "추가", amount: 12.99, date: new Date()})
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button
                    mode='flat'
                    onPress={cancelHandler}
                    style={styles.button}
                >
                    Cancel
                </Button>
                <Button
                    onPress={confirmHandler}
                    style={styles.button}
                >
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});