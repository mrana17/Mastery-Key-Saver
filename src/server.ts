import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { handleDELETE, handleGET, handlePOST } from "./handleFunctions";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "Mastery-Key-Saver-Mudi");

const server = http.createServer(async (request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Mastery Key Saver!</h1>");
    return;
  }

  if (request.method === "POST") {
    handlePOST(request, response);
    return;
  }

  const parts = request.url.match(/\/api\/passwords\/(\w+)/);
  if (!parts) {
    response.statusCode = 400;
    response.end();
    return;
  }
  const [, passwordName] = parts;

  if (request.method === "GET") {
    handleGET(request, response, passwordName);
  }
  if (request.method === "DELETE") {
    handleDELETE(request, response, passwordName);
  }

  //   if (request.method === "PATCH") {
  //     handlePATCH(request, response, passwordName);
  //   }

  response.statusCode = 405;
  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
