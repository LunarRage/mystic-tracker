import { Transfer } from "../generated/Axie/Axie"
import { AxieStore, GeneStore } from "./utils/axie";
import {registerAxieAndWallet } from "./utils/graph";

export function handleTransfer(event: Transfer): void {
  const newAxieStore = new AxieStore(event);
  const newAxieGeneStore = new GeneStore(event);
  registerAxieAndWallet(newAxieStore, newAxieGeneStore);
}

