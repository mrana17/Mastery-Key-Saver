import { handleGetPassword, handleSetPassword, hasAccess } from "./command";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import {
  closeDB,
  getCollection,
  connectDB,
  createPasswordDoc,
  readPasswordDoc,
  deletePasswordDoc,
  updatePasswordValue,
} from "./db";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

type CommandToFunction = {
  set: (passwordName: string) => Promise<void>;
  get: (passwordName: string) => Promise<void>;
};

const commandToFunction: CommandToFunction = {
  set: handleSetPassword,
  get: handleGetPassword,
};

const run = async () => {
  const url = process.env.MONGODB_URL;
  printWelcomeMessage();
  try {
    await connectDB(url, "Mastery-Key-Saver-Mudi");
    // await createPasswordDoc({
    //   name: "ABC",
    //   value: "1111",
    // });
    // await readPasswordDoc("ABC");
    // await updatePasswordValue("ABC", "2222");
    // await deletePasswordDoc("ABC");

    const credentials = await askForCredentials();
    if (!hasAccess(credentials.masterPassword)) {
      printNoAccess();
      run();
      return;
    }
    const action = await askForAction();
    // switch (action.command) {
    //   case "set":
    //     handleSetPassword(action.passwordName);
    //     break;
    //   case "get":
    //     handleGetPassword(action.passwordName);
    //     break;
    // }
    const commandFunction = commandToFunction[action.command];
    await commandFunction(action.passwordName);
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();
