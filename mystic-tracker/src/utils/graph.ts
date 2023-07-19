import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {MysticAxie as MysticAxieEntity, UnregisteredAxie as UnregisteredAxieEntity, Wallet as WalletEntity} from "../../generated/schema";
import { AxieStore, GeneStore, MysticBase } from "./axie";



// ##################################################################### //
// ######################### Utility Functions ######################### //
// ##################################################################### //

export function loadAxie(axieID: Bytes): MysticAxieEntity | null {
    const axie = MysticAxieEntity.load(axieID);
    return axie;
}

export function loadUnregisteredAxie(axieID: Bytes): UnregisteredAxieEntity | null {
    const axie = UnregisteredAxieEntity.load(axieID);
    return axie;
}

export function loadWallet(walletID: Bytes): WalletEntity | null {
    const wallet = WalletEntity.load(walletID);
    return wallet;
}

export function createNewUnregisteredAxie(axieID: Bytes, tokenID: BigInt, hexString:string, txHash:string): UnregisteredAxieEntity {
    const axie = new UnregisteredAxieEntity(axieID);
    axie.hexString = hexString;
    axie.tokenID = tokenID;
    axie.txHash = txHash;
    return axie;
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

export function saveUnregsiteredAxie(unregisteredAxie:UnregisteredAxieEntity):void{
    unregisteredAxie.save();
}

export function saveWallet(wallet:WalletEntity):void{
    wallet.save();
}

export function changeOwner(axieEntity:MysticAxieEntity,owner:Bytes):MysticAxieEntity{
    axieEntity.owner = owner;
    return axieEntity;
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
    log.info('Created new Mystic Axie with ID: {}', [axieTransfer.axieTokenID.toString()]);
    saveMysticAxie(newAxie);
    return newAxie; 

}

export function registerUnregisteredAxie(axieTransfer:AxieStore, axieMeta: GeneStore):UnregisteredAxieEntity | null {   
    const existingAxie = loadUnregisteredAxie(axieTransfer.axieID);

    if(existingAxie){
        return null;
    }

    log.info('Storing unrecognized Axie with ID: {}', [axieTransfer.axieTokenID.toString()]);
    const newAxie = createNewUnregisteredAxie(axieTransfer.axieID,axieTransfer.axieTokenID,axieMeta.hexString,axieTransfer.txHash.toHexString());
    saveUnregsiteredAxie(newAxie);  
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

export function updateOwner(axieID:Bytes,newOwner:Bytes):void{
    const axieEntity = MysticAxieEntity.load(axieID);

    if(axieEntity){
        let updatedAxieEntity = changeOwner(axieEntity,newOwner);
        saveMysticAxie(updatedAxieEntity);
    }
}

export function registerAxieAndWallet(axieTransfer:AxieStore, axieMeta: GeneStore):void{
    const potentialMysticAxie = new MysticBase(BigInt.fromString(axieTransfer.axieID.toString()), axieMeta.binaryString);

   if(potentialMysticAxie.isMystic){
       let isNewAxie = registerAxie(axieTransfer, axieMeta);
       registerWallet(axieTransfer);
        if(!isNewAxie){
            log.info('Updating owner of Axie ID: {}', [axieTransfer.axieTokenID.toString()]);
            updateOwner(axieTransfer.axieID,axieTransfer.receiver);
        }
    }
}
