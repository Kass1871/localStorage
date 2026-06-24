import {NavigationContainer} from "@react-navigation/native";
import MainNavigator from "./navigators/MainNavigator";
import {SQLiteProvider} from 'expo-sqlite'

const initializeDatabase = async (db) => {
    await db.execAsync(`
                CREATE TABLE IF NOT EXISTS Tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    state BOOLEAN
        )
    `);

    await db.execAsync(`
                CREATE TABLE IF NOT EXISTS Categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE
        )
    `);

    await db.execAsync(`
                CREATE TABLE IF NOT EXISTS Notes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoryId INTEGER,
                    title TEXT,
                    content TEXT,
                    FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE CASCADE
        )
    `);

    await db.execAsync(`PRAGMA foreign_keys = ON`)
};

export default function App() {
  return (
      <SQLiteProvider databaseName="localDB.db" onInit={initializeDatabase}>
          <NavigationContainer>
              <MainNavigator />
          </NavigationContainer>
      </SQLiteProvider>
  );
}