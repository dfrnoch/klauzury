import { Server } from 'http'
import * as socket from 'socket.io'

export class Socket {
  public io: socket.Server

  constructor(server: Server) {
    this.io = socket(server)
    this.connect()
  }

  public connect() {
    this.io.on('connection', (client: socket.Socket) => {
      console.info(` connected : ${client.id}`)
      this.handlers(client)
    })
  }

  public handlers(client: socket.Socket) {
    client.on('disconnect', () => {
      console.info(`Socket disconnected : ${client.id}`)
    })
  }
}