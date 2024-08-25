import { varint } from '../../types'
import { BufferWrapper } from '../../utils/BufferWrapper'
import { Packet } from '../Packet'
import { PacketBuilder } from '../PacketBuilder'

export class StatusRequest extends Packet {
  id: varint = 0x00

  get payloadLength(): number {
    return 0
  }
}

export class StatusRequestBuilder extends PacketBuilder<StatusRequest> {
  static instance = new StatusRequestBuilder()

  fromBuffer(buff: BufferWrapper): StatusRequest {
    return new StatusRequest()
  }
}
