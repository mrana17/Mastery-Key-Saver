import { handleGetPassword, handleSetPassword, hasAccess } from "./command";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");

    const db = client.db("Mastery-Key-Saver-Mudi");

    await db.collection("inventory").insertOne({
      item: "schlüssel",
      quantity: "17",
      tags: ["codes"],
      size: { h: 1, w: 2 },
    });

    client.close();
  } catch (error) {
    console.error(error);
  }

  // printWelcomeMessage();
  // const credentials = await askForCredentials();
  // if (!hasAccess(credentials.masterPassword)) {
  //   printNoAccess();
  //   run();
  //   return;
  // }
  // const action = await askForAction();
  // switch (action.command) {
  //   case "set":
  //     handleSetPassword(action.passwordName);
  //     break;
  //   case "get":
  //     handleGetPassword(action.passwordName);
  //     break;
  // }
};

run();
