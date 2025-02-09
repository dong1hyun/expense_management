import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function ExpensesOverview() {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => { navigation.navigate("ManageExpense") }}
            />
          )
        })}
      >
        <BottomTabs.Screen
          name='RecentExpenses'
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />
          }}
        />
        <BottomTabs.Screen
          name='AllExpenses'
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All',
            tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
          }}
        />
      </BottomTabs.Navigator>
    )
  }
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',
          }}>
            <Stack.Screen
              name="ExpensesOverView"
              options={{
                headerShown: false
              }}
              component={ExpensesOverview}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpenses}
              options={{
                title: 'Manage Expense',
                presentaion: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}