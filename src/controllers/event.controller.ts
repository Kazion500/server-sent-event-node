import { Request, Response } from "express";
import { clients, facts } from "../server";
import { v4 as uuidV4 } from "uuid";

export const eventsHandler = (req: Request, res: Response) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  // make a database call to get the latest facts

  const data = `data: ${JSON.stringify(facts)}`;

  // send the latest facts to the client
  res.write(data);

  const clientId = uuidV4();

  const newClient: any = {
    id: clientId,
    res,
  };
  const newClients = [];

  clients.push(newClient);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    res.emit("close");
    // remove the client from the clients array
    res.write(`data: ${clientId} has disconnected\n\n`);
    newClients.push(...clients.filter((client: any) => client.id !== clientId));
  });
};
