import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket/websocket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/buttons.component';

@Component({
  selector: 'app-log-display',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  providers: [ButtonComponent],
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css'],
})
export class LogDisplayComponent implements OnInit {
  private messagesSubscription!: Subscription;
  messages: string[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.connect('ws://localhost:8080/event-ticketing');
    this.webSocketService.messages$.subscribe((message: string) => {
      this.messages.push(message);
    });
  }
}
