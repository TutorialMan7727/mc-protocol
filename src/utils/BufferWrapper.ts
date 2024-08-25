import { decode, encode, encodingLength } from 'varint'
import { varint } from '../types'

export class BufferWrapper {
  private _buffer: Buffer
  private _readOffset = 0
  packetOffset = 0

  public lenght = 0

  private _writeOffset = 0

  constructor(buffer: Buffer) {
    this._buffer = buffer
    this.lenght = buffer.length
  }

  get buffer(): Buffer {
    return this._buffer
  }

  readVarInt(): varint {
    try {
      const varInt = decode(this._buffer, this._readOffset)
      this._readOffset += encodingLength(varInt)
      return varInt
    } catch (e) {
      if (e instanceof RangeError) {
        throw new Error() // todo create error for incomplete buffer
      }
      throw e
    }
  }

  writeVarInt(varint: varint): void {
    try {
      encode(varint, this._buffer, this._writeOffset)
      this._writeOffset += encodingLength(varint)
    } catch (e) {
      throw e
    }
  }

  readString(): string {
    const stringSize = decode(this._buffer, this._readOffset)
    this._readOffset += encodingLength(stringSize)
    const string = this._buffer.toString(
      'utf-8',
      this._readOffset,
      this._readOffset + stringSize
    )
    this._readOffset += stringSize
    return string
  }

  writeString(string: string) {
    try {
      this.writeVarInt(string.length)
      this._buffer.write(string, this._writeOffset, 'utf-8')
      this._writeOffset += Buffer.byteLength(string)
    } catch (e) {
      throw e
    }
  }

  readUnsignedShort(): number {
    const short = this._buffer.readUInt16BE(this._readOffset)
    this._readOffset += 2
    return short
  }

  readLong(): BigInt {
    const long = this._buffer.readBigInt64BE(this._readOffset)
    this._readOffset += 4
    return long
  }
}
