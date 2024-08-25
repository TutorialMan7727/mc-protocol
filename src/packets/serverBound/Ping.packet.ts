import { varint } from '../../types'
import { BufferWrapper } from '../../utils/BufferWrapper'
import { Packet } from '../Packet'
import { PacketBuilder } from '../PacketBuilder'

export class Ping extends Packet {
  id: varint = 0x01

  payload!: BigInt

  get payloadLength(): number {
    return this.longLength(this.payload)
  }
}

export class PingBuilder extends PacketBuilder<Ping> {
  static instance = new PingBuilder()

  fromBuffer(buff: BufferWrapper): Ping {
    const p = new Ping()

    p.payload = buff.readLong()

    return p
  }
}
