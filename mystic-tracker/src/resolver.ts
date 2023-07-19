import { BigInt, log } from "@graphprotocol/graph-ts";
import { Transfer } from "../generated/Axie/Axie"
import { AxieStore, GeneStore, determineGeneHexType } from "./utils/axie";
import { UNKNOWNGENE, VALIDGENE } from "./utils/constant";
import {registerAxieAndWallet, registerUnregisteredAxie } from "./utils/graph";

export function handleTransfer(event: Transfer): void {
  const newAxieStore = new AxieStore(event);
  const newAxieGeneStore = new GeneStore(event);
  const getGeneType = determineGeneHexType(newAxieGeneStore.hexString);
  const isUnknownGene = getGeneType == UNKNOWNGENE ? true : false;
  const isValidGene = getGeneType == VALIDGENE ? true : false;

    if(isValidGene){
      log.info(' Axie ID:{} Axie Hex String Length: {} xGene:{} yGene:{} Hex Genes:{}', [newAxieStore.axieTokenID.toString(),newAxieGeneStore.binaryString.length.toString(),newAxieGeneStore.xGene, newAxieGeneStore.yGene,newAxieGeneStore.hexString]);
      registerAxieAndWallet(newAxieStore, newAxieGeneStore);
    }
  
    if(isUnknownGene){
      registerUnregisteredAxie(newAxieStore, newAxieGeneStore);
      return;
    }
}

