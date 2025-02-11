import { StyleSheet, Text, View } from "react-native";
import Input from "./input";
import { useState } from "react";
import Button from "../../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({defaultValue, submitButtonLabel, onCancel, onSubmit}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValue?.amount.toString() || '',
            isValid: true,
        },
        date: {
            value: getFormattedDate(defaultValue?.date) || '',
            isValid: true
        },
        description: {
            value: defaultValue?.description.toString() || '',
            isValid: true
        }
    });
    function inputChangeHandler(inputIdentifier, text) {
        setInputs(prev => {
            return { 
                ...prev, 
                [inputIdentifier]: {
                    value: text,
                    isValid: true,
                } 
            }
        });
    };
    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        if(!(amountIsValid && dateIsValid && descriptionIsValid)) {
            setInputs((prev) => {
                return {
                    amount: {value: prev.amount.value, isValid: amountIsValid},
                    date: {value: prev.date.value, isValid: dateIsValid},
                    description: {value: prev.description.value, isValid: descriptionIsValid}

                }
            });
            return;
        }
        onSubmit(expenseData);
    };
    const formIsInvalid = !(inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid);
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    autoCapitalize: "sentences",
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>유효하지 않은 값입니다.</Text>}
            <View style={styles.buttons}>
                <Button
                    mode='flat'
                    onPress={onCancel}
                    style={styles.button}
                >
                    Cancel
                </Button>
                <Button
                    onPress={submitHandler}
                    style={styles.button}
                >
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
        gap: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    }
});