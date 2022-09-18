import { clients } from "../server";

export function sendEventsToAll(newFact: any) {
  clients.forEach((client: any) => {
    client.res.write(`data: ${JSON.stringify(newFact)}\n\n`);
  });
}

export function sendEventsToOne(clientId: string, newFact: any) {
  const client = clients.find((client: any) => client.id === clientId);
  client.res.write(`data: ${JSON.stringify(newFact)}\n\n`);
}
