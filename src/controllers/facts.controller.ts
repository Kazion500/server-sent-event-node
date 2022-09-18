import { Request, Response } from "express";
import { sendEventsToAll } from "../helpers/sentEventsToAll";
import { facts } from "../server";

export async function addFact(request: Request, response: Response) {
  const newFact = request.body;
  facts.push(newFact);
  response.status(201).json(newFact);
  sendEventsToAll(newFact);
}
