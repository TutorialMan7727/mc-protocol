import { encodingLength } from 'varint'
import { varint } from '../types'
import { BufferWrapper } from '../utils/BufferWrapper'

export abstract class Packet {
  abstract id: varint

  protected abstract get payloadLength(): number

  protected get length() {
    return encodingLength(this.id) + this.payloadLength
  }

  get totalLenght(): number {
    return this.length + encodingLength(this.length)
  }

  protected varIntLength(varint: varint): number {
    return encodingLength(varint);
  }

  protected stringLength(string: string): number {
    return this.varIntLength(Buffer.byteLength(string)) + Buffer.byteLength(string);
  }

  protected unsignedShortLength(short?: number): number {
    return 2;
  }

  protected longLength(long?: BigInt): number {
    return 4;
  }

  protected initBuffer() {
    const buffer = new BufferWrapper(Buffer.alloc(this.totalLenght));
    this.writeHeaders(buffer);
    return buffer;
  }

  protected writeHeaders(buff: BufferWrapper) {
    buff.writeVarInt(this.length);
    buff.writeVarInt(this.id);
  }

}
