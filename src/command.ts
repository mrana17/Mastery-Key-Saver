import { printPassword, printPasswordSet } from "./messages";
import { askForPasswordValue, askForPasswordName } from "./questions";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  readPasswordDoc,
  updatePasswordDoc,
  updatePasswordValue,
} from "./db";
dotenv.config();

export const hasAccess = (masterPassword: string): boolean =>
  masterPassword === process.env.CRYPTO_MASTER_PASSWORD;

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  // const nameForPassword = await askForPasswordName();
  const passwordValue = await askForPasswordValue();
  const passwordDoc = await readPasswordDoc(passwordName);
  if (passwordDoc) {
    console.log("Password already exists, please update your password!");
    await updatePasswordValue(passwordName, passwordValue);
  } else {
    await createPasswordDoc({
      name: passwordName,
      value: passwordValue,
    });
  }
  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("You are not the Master!");
    return;
  }
  printPassword(passwordDoc.name, passwordDoc.value);
};
