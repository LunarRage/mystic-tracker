import { Address, BigInt, Bytes,log } from "@graphprotocol/graph-ts";
import { Transfer, Axie } from "../../generated/Axie/Axie";
import { GENEEMPTY, GENEZERO, UNKNOWNGENE, VALIDGENE } from "./constant";

export function determineGeneHexType(gene:string):string{
    if(gene == "00000"){
        log.info('Gene Zero found: {}', [gene])
        return GENEZERO;
    }else if(gene == ""){
        log.info('Empty gene found: {}', [gene]);
        return GENEEMPTY;
    }else if(gene.length > 20){
        log.info('Valid Gene found: {}', [gene]);
        return VALIDGENE;
    }else {
        log.info('Unknown gene type: {}', [gene]);
        return UNKNOWNGENE;
    }
}
export class AxieBase{
    private _axieID: BigInt;
    private _binaryGenes: string;
    constructor(axieID:BigInt, binaryGenes:string){
        this._axieID = axieID;
        this._binaryGenes = binaryGenes;
    }

    get axieID(): BigInt {
        return this._axieID;
    }

    get binaryGenes(): string {
        return this._binaryGenes;
    }

}

export class MysticBase extends AxieBase{
    constructor(axieID:BigInt, binaryGenes:string){
        super(axieID, binaryGenes);
    }

    // TODO: Implement a set of function that returns the mystic part of the Axie as a string. We will need to do this for 6 parts of the Axie (eyes, ears, mouth, horn, back, tail).

    get isMystic(): boolean {
        return this.isEyesMystic() || this.isMouthMystic() || this.isEarsMystic() || this.isHornMystic() || this.isBackMystic() || this.isTailMystic();
    } 

    isEyesMystic(): boolean {
        let eyesBinaryString = this.binaryGenes.slice(128,192);
        let mysticPart = eyesBinaryString.slice(16,25);
        //log.info("Eyes Binary String: {}", [eyesBinaryString]);
        //Convert mysticPart to decimal number
        let mysticPartDecimal = BigInt.fromString(mysticPart);
        //check if mysticPartdecimal is greater than 0
        return mysticPartDecimal.equals(BigInt.fromI32(1));
    }

    isMouthMystic(): boolean {
        let mouthBinaryString = this.binaryGenes.slice(192,256);
        let mysticPart = mouthBinaryString.slice(16,25);
        //log.info("Mouth Binary String: {}", [mouthBinaryString]);
        //Convert mysticPart to decimal number
        let mysticPartDecimal = BigInt.fromString(mysticPart);
        //check if mysticPartdecimal is greater than 0
        return mysticPartDecimal.equals(BigInt.fromI32(1));
    }

    isEarsMystic(): boolean {
        let earsBinaryString = this.binaryGenes.slice(256,320);
        let mysticPart = earsBinaryString.slice(16,25);
        //log.info("Ears Binary String: {}", [earsBinaryString]);
        //Convert mysticPart to decimal number
        let mysticPartDecimal = BigInt.fromString(mysticPart);
        //check if mysticPartdecimal is greater than 0
        return mysticPartDecimal.equals(BigInt.fromI32(1));
    }

    isHornMystic(): boolean {
        let hornBinaryString = this.binaryGenes.slice(320,384);
        let mysticPart = hornBinaryString.slice(16,25);
       // log.info("Horn Binary String: {}", [hornBinaryString]);
        //Convert mysticPart to decimal number
        let mysticPartDecimal = BigInt.fromString(mysticPart);
        //check if mysticPartdecimal is greater than 0
        return mysticPartDecimal.equals(BigInt.fromI32(1));
    }

    isBackMystic(): boolean {
        let backBinaryString = this.binaryGenes.slice(384,448);
        let mysticPart = backBinaryString.slice(16,25);
        //log.info("Back Binary String: {}", [backBinaryString]);
        //Convert mysticPart to decimal number
        let mysticPartDecimal = BigInt.fromString(mysticPart);
        //check if mysticPartdecimal is greater than 0
        return mysticPartDecimal.equals(BigInt.fromI32(1));
    }

    isTailMystic(): boolean {
        let tailBinaryString = this.binaryGenes.slice(448);
        let mysticPart = tailBinaryString.slice(16,25);
        //log.info("Tail Binary String: {}", [tailBinaryString]);
        //Convert mysticPart to decimal number
        let mysticPartDecimal = BigInt.fromString(mysticPart);
        //check if mysticPartdecimal is greater than 0
        return mysticPartDecimal.equals(BigInt.fromI32(1));
    }

}

export class GeneStore{
    private _event: Transfer;
    private _AxieContract: Axie;

    constructor(event: Transfer){
        this._event = event;
        this._AxieContract = Axie.bind(event.address);
    }

    deriveGenesFromTokenID(xGene:string, yGene:string): string {
        let hexString = (xGene.concat(`000`+yGene.slice(2))).replace('0x','');
        return hexString;
    }

    deriveGenesBinaryFromHexString(hexString:string):string {
        let binaryString = '';
        let result:string='';

            for(let i:i32=0; i<hexString.length; i++){
                let temp = parseInt(hexString.charAt(i),16) as i32;
                binaryString += temp.toString(2).padStart(4,'0');
            }
        result = binaryString.padStart(512,'0');
        return result;
    }

    get axieID(): Bytes {
        return Bytes.fromUTF8(this._event.params._tokenId.toI32().toString());
    }

    get xGene(): string {
        return this._AxieContract.axie(this._event.params._tokenId).value3.x.toHexString();
    }

    get yGene(): string {
        return this._AxieContract.axie(this._event.params._tokenId).value3.y.toHexString();
    }

    get hexString(): string {
        let derviedGenes = this.deriveGenesFromTokenID(this.xGene, this.yGene);
        return derviedGenes;
    }
    
    get binaryString(): string {
        let derviedGenes = this.deriveGenesFromTokenID(this.xGene, this.yGene);
        return this.deriveGenesBinaryFromHexString(derviedGenes);
    }
}

export class AxieStore{
    private _event: Transfer;

    constructor(event: Transfer){
        this._event = event;
    }

    get axieID(): Bytes {
        return Bytes.fromUTF8(this._event.params._tokenId.toI32().toString());
    }

    get axieTokenID(): BigInt {
        return this._event.params._tokenId;
    }

    get sender(): Address {
        return this._event.params._from;
    }

    get receiver(): Address {
        return this._event.params._to;
    }

    get txHash(): Bytes {
        return this._event.transaction.hash;
    }
}