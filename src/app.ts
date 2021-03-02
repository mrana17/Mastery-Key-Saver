import { handleGetPassword, handleSetPassword, hasAccess } from "./command";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";

const run = async () => {
  printWelcomeMessage();
  const credentials = await askForCredentials();
  if (!hasAccess(credentials.masterPassword)) {
    printNoAccess();
    run();
    return;
  }
  const action = await askForAction();
  switch (action.command) {
    case "set":
      handleSetPassword(action.passwordName);
      break;
    case "get":
      handleGetPassword(action.passwordName);
      break;
  }
};

run();
