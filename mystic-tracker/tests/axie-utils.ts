import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  AdminRemoved,
  Approval,
  ApprovalForAll,
  AxieEvolved,
  AxieSpawn,
  AxieggMinted,
  MinterAdded,
  MinterRemoved,
  NonceUpdated,
  Paused,
  PermissionSet,
  PermissionSetAll,
  SeederAdded,
  SeederRemoved,
  SpenderUnwhitelisted,
  SpenderWhitelisted,
  TokenOperatorSet,
  TokenPermissionSet,
  Transfer,
  Unpaused
} from "../generated/Axie/Axie"

export function createAdminChangedEvent(
  _oldAdmin: Address,
  _newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam("_oldAdmin", ethereum.Value.fromAddress(_oldAdmin))
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("_newAdmin", ethereum.Value.fromAddress(_newAdmin))
  )

  return adminChangedEvent
}

export function createAdminRemovedEvent(_oldAdmin: Address): AdminRemoved {
  let adminRemovedEvent = changetype<AdminRemoved>(newMockEvent())

  adminRemovedEvent.parameters = new Array()

  adminRemovedEvent.parameters.push(
    new ethereum.EventParam("_oldAdmin", ethereum.Value.fromAddress(_oldAdmin))
  )

  return adminRemovedEvent
}

export function createApprovalEvent(
  _owner: Address,
  _approved: Address,
  _tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromAddress(_approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  _owner: Address,
  _operator: Address,
  _approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromBoolean(_approved))
  )

  return approvalForAllEvent
}

export function createAxieEvolvedEvent(
  _axieId: BigInt,
  _genes: ethereum.Tuple
): AxieEvolved {
  let axieEvolvedEvent = changetype<AxieEvolved>(newMockEvent())

  axieEvolvedEvent.parameters = new Array()

  axieEvolvedEvent.parameters.push(
    new ethereum.EventParam(
      "_axieId",
      ethereum.Value.fromUnsignedBigInt(_axieId)
    )
  )
  axieEvolvedEvent.parameters.push(
    new ethereum.EventParam("_genes", ethereum.Value.fromTuple(_genes))
  )

  return axieEvolvedEvent
}

export function createAxieSpawnEvent(_axieId: BigInt): AxieSpawn {
  let axieSpawnEvent = changetype<AxieSpawn>(newMockEvent())

  axieSpawnEvent.parameters = new Array()

  axieSpawnEvent.parameters.push(
    new ethereum.EventParam(
      "_axieId",
      ethereum.Value.fromUnsignedBigInt(_axieId)
    )
  )

  return axieSpawnEvent
}

export function createAxieggMintedEvent(
  _axieId: BigInt,
  _axie: ethereum.Tuple,
  _axiegg: ethereum.Tuple
): AxieggMinted {
  let axieggMintedEvent = changetype<AxieggMinted>(newMockEvent())

  axieggMintedEvent.parameters = new Array()

  axieggMintedEvent.parameters.push(
    new ethereum.EventParam(
      "_axieId",
      ethereum.Value.fromUnsignedBigInt(_axieId)
    )
  )
  axieggMintedEvent.parameters.push(
    new ethereum.EventParam("_axie", ethereum.Value.fromTuple(_axie))
  )
  axieggMintedEvent.parameters.push(
    new ethereum.EventParam("_axiegg", ethereum.Value.fromTuple(_axiegg))
  )

  return axieggMintedEvent
}

export function createMinterAddedEvent(_minter: Address): MinterAdded {
  let minterAddedEvent = changetype<MinterAdded>(newMockEvent())

  minterAddedEvent.parameters = new Array()

  minterAddedEvent.parameters.push(
    new ethereum.EventParam("_minter", ethereum.Value.fromAddress(_minter))
  )

  return minterAddedEvent
}

export function createMinterRemovedEvent(_minter: Address): MinterRemoved {
  let minterRemovedEvent = changetype<MinterRemoved>(newMockEvent())

  minterRemovedEvent.parameters = new Array()

  minterRemovedEvent.parameters.push(
    new ethereum.EventParam("_minter", ethereum.Value.fromAddress(_minter))
  )

  return minterRemovedEvent
}

export function createNonceUpdatedEvent(
  _tokenId: BigInt,
  _nonce: BigInt
): NonceUpdated {
  let nonceUpdatedEvent = changetype<NonceUpdated>(newMockEvent())

  nonceUpdatedEvent.parameters = new Array()

  nonceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  nonceUpdatedEvent.parameters.push(
    new ethereum.EventParam("_nonce", ethereum.Value.fromUnsignedBigInt(_nonce))
  )

  return nonceUpdatedEvent
}

export function createPausedEvent(): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  return pausedEvent
}

export function createPermissionSetEvent(
  _owner: Address,
  _operator: Address,
  _funcSig: Bytes,
  _approved: boolean
): PermissionSet {
  let permissionSetEvent = changetype<PermissionSet>(newMockEvent())

  permissionSetEvent.parameters = new Array()

  permissionSetEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  permissionSetEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  permissionSetEvent.parameters.push(
    new ethereum.EventParam("_funcSig", ethereum.Value.fromFixedBytes(_funcSig))
  )
  permissionSetEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromBoolean(_approved))
  )

  return permissionSetEvent
}

export function createPermissionSetAllEvent(
  _owner: Address,
  _operator: Address,
  _approved: boolean
): PermissionSetAll {
  let permissionSetAllEvent = changetype<PermissionSetAll>(newMockEvent())

  permissionSetAllEvent.parameters = new Array()

  permissionSetAllEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  permissionSetAllEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  permissionSetAllEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromBoolean(_approved))
  )

  return permissionSetAllEvent
}

export function createSeederAddedEvent(_seeder: Address): SeederAdded {
  let seederAddedEvent = changetype<SeederAdded>(newMockEvent())

  seederAddedEvent.parameters = new Array()

  seederAddedEvent.parameters.push(
    new ethereum.EventParam("_seeder", ethereum.Value.fromAddress(_seeder))
  )

  return seederAddedEvent
}

export function createSeederRemovedEvent(_seeder: Address): SeederRemoved {
  let seederRemovedEvent = changetype<SeederRemoved>(newMockEvent())

  seederRemovedEvent.parameters = new Array()

  seederRemovedEvent.parameters.push(
    new ethereum.EventParam("_seeder", ethereum.Value.fromAddress(_seeder))
  )

  return seederRemovedEvent
}

export function createSpenderUnwhitelistedEvent(
  _spender: Address
): SpenderUnwhitelisted {
  let spenderUnwhitelistedEvent = changetype<SpenderUnwhitelisted>(
    newMockEvent()
  )

  spenderUnwhitelistedEvent.parameters = new Array()

  spenderUnwhitelistedEvent.parameters.push(
    new ethereum.EventParam("_spender", ethereum.Value.fromAddress(_spender))
  )

  return spenderUnwhitelistedEvent
}

export function createSpenderWhitelistedEvent(
  _spender: Address
): SpenderWhitelisted {
  let spenderWhitelistedEvent = changetype<SpenderWhitelisted>(newMockEvent())

  spenderWhitelistedEvent.parameters = new Array()

  spenderWhitelistedEvent.parameters.push(
    new ethereum.EventParam("_spender", ethereum.Value.fromAddress(_spender))
  )

  return spenderWhitelistedEvent
}

export function createTokenOperatorSetEvent(
  _tokenId: BigInt,
  _operator: Address,
  _approved: boolean
): TokenOperatorSet {
  let tokenOperatorSetEvent = changetype<TokenOperatorSet>(newMockEvent())

  tokenOperatorSetEvent.parameters = new Array()

  tokenOperatorSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  tokenOperatorSetEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  tokenOperatorSetEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromBoolean(_approved))
  )

  return tokenOperatorSetEvent
}

export function createTokenPermissionSetEvent(
  _tokenId: BigInt,
  _operator: Address,
  _funcSig: Bytes,
  _approved: boolean
): TokenPermissionSet {
  let tokenPermissionSetEvent = changetype<TokenPermissionSet>(newMockEvent())

  tokenPermissionSetEvent.parameters = new Array()

  tokenPermissionSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  tokenPermissionSetEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  tokenPermissionSetEvent.parameters.push(
    new ethereum.EventParam("_funcSig", ethereum.Value.fromFixedBytes(_funcSig))
  )
  tokenPermissionSetEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromBoolean(_approved))
  )

  return tokenPermissionSetEvent
}

export function createTransferEvent(
  _from: Address,
  _to: Address,
  _tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return transferEvent
}

export function createUnpausedEvent(): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  return unpausedEvent
}
