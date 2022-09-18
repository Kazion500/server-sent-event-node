import express, { Request, Response } from "express";
import cors from "cors";
import { eventsHandler } from "./controllers/event.controller";
import { addFact } from "./controllers/facts.controller";
import { sendEventsToAll } from "./helpers/sentEventsToAll";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export let clients: any = [];
export let facts: any = [];

app.get("/status", (request, response) =>
  response.json({ clients: clients.length })
);

app.get("/events", eventsHandler);

app.post("/fact", addFact);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
