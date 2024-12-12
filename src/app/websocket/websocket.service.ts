import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject, catchError, tap, switchAll, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageSubject: Subject<string> = new Subject<string>(); // To emit received messages
  public messages$ = this.messageSubject.asObservable(); // Observable to be subscribed to

  constructor() {}

  connect(url: string): void {
    if (this.socket === null || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };

      this.socket.onmessage = (event) => {
        // Emit incoming messages
        this.messageSubject.next(event.data);
      };

      this.socket.onclose = () => {
        console.log('WebSocket closed');
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  // Add this disconnect method
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
