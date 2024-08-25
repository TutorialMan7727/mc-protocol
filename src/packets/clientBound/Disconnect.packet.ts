import { varint } from '../../types'
import { BufferWrapper } from '../../utils/BufferWrapper'
import { Packet } from '../Packet'
import { PacketBuilder } from '../PacketBuilder'

export class Disconnect extends Packet {
  id: varint = 0x00

  protected get payloadLength(): number {
    return this.stringLength(this.reason);
  }

  reason!: string

  toBuffer(): Buffer {
    const buff = this.initBuffer();
    buff.writeString(this.reason);
    return buff.buffer;
  }
}

export class DisconnectBuilder extends PacketBuilder<Disconnect> {
  static instance = new DisconnectBuilder()

  fromBuffer(buff: BufferWrapper): Disconnect {
    const p = new Disconnect()

    p.reason = buff.readString()

    return p
  }

  static error(message: string): Disconnect {
    const packet = new Disconnect()
    packet.reason = `{"text": "${message}", "color": "red"}`
    return packet
  }

}
