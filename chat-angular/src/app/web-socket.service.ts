import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { Observable } from "rxjs";

@Injectable()
export class WebSocketService {
    socket!: Socket;
    url = 'ws://localhost:3000';
    constructor() {
        this.socket = io(this.url);
    }

    listen(eventname: string) : Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventname, (data) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventname: string, data: any) {
        this.socket.emit(eventname, data);
    }
}