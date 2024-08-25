import { varint } from '../../types'
import { BufferWrapper } from '../../utils/BufferWrapper'
import { Packet } from '../Packet'
import { PacketBuilder } from '../PacketBuilder'

export class LoginStart extends Packet {
  id: varint = 0

  username!: string

  get payloadLength(): number {
    return this.stringLength(this.username)
  }
}

export class LoginStartBuilder extends PacketBuilder<LoginStart> {
  static instance = new LoginStartBuilder()

  fromBuffer(buff: BufferWrapper): LoginStart {
    const p = new LoginStart()

    p.username = buff.readString()

    return p
  }
}
