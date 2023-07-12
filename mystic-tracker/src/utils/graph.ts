import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { Transfer, Axie} from "../../generated/Axie/Axie";
import {MysticAxie as MysticAxieEntity, Wallet as WalletEntity} from "../../generated/schema";
import { AxieStore, GeneStore, MysticBase } from "./axie";



// ##################################################################### //
// ######################### Utility Functions ######################### //
// ##################################################################### //

export function loadAxie(axieID: Bytes): MysticAxieEntity | null {
    const axie = MysticAxieEntity.load(axieID);
    return axie;
}

export function loadWallet(walletID: Bytes): WalletEntity | null {
    const wallet = WalletEntity.load(walletID);
    return wallet;
}

export function createNewMysticAxie(axieID: Bytes, tokenID: BigInt, owner:Bytes): MysticAxieEntity { 
    const axie = new MysticAxieEntity(axieID);
    axie.owner = owner;
    axie.tokenID = tokenID;
    return axie;
};

export function createNewWallet(walletID: Bytes): WalletEntity {
    const wallet = new WalletEntity(walletID);
    return wallet;
}

export function saveMysticAxie(mysticAxie:MysticAxieEntity):void{
    mysticAxie.save();
}

export function saveWallet(wallet:WalletEntity):void{
    wallet.save();
}

// ====================================================== //
// =============== Higher Level Functions =============== //
// ====================================================== //

export function registerAxie(axieTransfer:AxieStore, axieMeta: GeneStore):MysticAxieEntity | null {
    const existingAxie = loadAxie(axieTransfer.axieID);
    
    if(existingAxie){
        return null;
    }

    const newAxie = createNewMysticAxie(axieTransfer.axieID,axieTransfer.axieTokenID,axieTransfer.receiver);
    saveMysticAxie(newAxie);
    return newAxie; 

}

export function registerWallet(axieTransfer:AxieStore):WalletEntity | null {
    const existingWallet = loadWallet(axieTransfer.receiver);

    if(existingWallet){
        return null;
    }

    const newWallet = createNewWallet(axieTransfer.receiver);
    saveWallet(newWallet);

    return newWallet;
}

export function registerAxieAndWallet(axieTransfer:AxieStore, axieMeta: GeneStore):void{
    const potentialMysticAxie = new MysticBase(BigInt.fromString(axieTransfer.axieID.toString()), axieMeta.hexString);
    log.info('Mystic Hex String for Axie ID: {} is {}', [potentialMysticAxie.axieID.toString(), potentialMysticAxie.binaryGenes]);

    if(potentialMysticAxie.isMystic){
        registerAxie(axieTransfer, axieMeta);
        registerWallet(axieTransfer);
    }
}
