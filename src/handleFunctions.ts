import http, { request } from "http";
import {
  createPasswordDoc,
  deletePasswordDoc,
  PasswordDoc,
  readPasswordDoc,
  updatePasswordValue,
} from "./db";

export const handleGET = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  passwordName: string
) => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    response.statusCode = 404;
    response.end();
    return;
  }
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(passwordDoc));
};

export const handleDELETE = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  passwordName: string
) => {
  const isSuccessful = await deletePasswordDoc(passwordName);

  if (!isSuccessful) {
    response.statusCode = 404;
    response.end();
    return;
  }

  response.statusCode = 202;
  response.end();
};

export const handlePOST = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const passwordDoc = await parseJSONBody<PasswordDoc>(request);

  const isSuccessful = await createPasswordDoc(passwordDoc);
  if (!isSuccessful) {
    response.statusCode = 400;
    response.end();
    return;
  }

  response.statusCode = 201;
  response.end();
};

// export const handlePATCH = async (
//   request: http.IncomingMessage,
//   response: http.ServerResponse,
//   passwordName: string
// ) => {
//   const passwordDoc = await parseJSONBody<PasswordDoc>(request);

//   const isSuccessful = await updatePasswordValue(passwordDoc);
//   if (!isSuccessful) {
//     response.statusCode = 400;
//     response.end();
//     return;
//   }

//   response.statusCode = 201;
//   response.end();
// };
// };

const parseJSONBody = <T>(request: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve) => {
    let json = "";
    request.on("data", (chunk) => {
      json += chunk;
    });
    request.on("end", () => {
      const body = JSON.parse(json);
      resolve(body);
    });
  });
};
