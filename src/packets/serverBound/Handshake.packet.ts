import { encodingLength } from 'varint'
import { varint } from '../../types'
import { BufferWrapper } from '../../utils/BufferWrapper'
import { Packet } from '../Packet'
import { PacketBuilder } from '../PacketBuilder'

export class Handshake extends Packet {
  id: varint = 0

  protocolVersion!: varint
  serverAddress!: string
  port!: number
  nextState!: varint

  get payloadLength(): number {
    return this.varIntLength(this.protocolVersion)
    + this.stringLength(this.serverAddress)
    + this.unsignedShortLength(this.port)
    + this.varIntLength(this.nextState)
  }
}

export class HandshakeBuilder extends PacketBuilder<Handshake> {
  static instance = new HandshakeBuilder()

  fromBuffer(buff: BufferWrapper): Handshake {
    const p = new Handshake()

    p.protocolVersion = buff.readVarInt()
    p.serverAddress = buff.readString()
    p.port = buff.readUnsignedShort()
    p.nextState = buff.readVarInt()

    return p
  }
}
