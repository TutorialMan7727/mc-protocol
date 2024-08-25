import { BufferWrapper } from "../utils/BufferWrapper";

export abstract class PacketBuilder<Packet> {
  abstract fromBuffer(buff: BufferWrapper): Packet;
}
