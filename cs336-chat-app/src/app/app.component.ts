import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Firestore, collection, collectionData, addDoc, query, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// define the structure of a chat message
interface ChatMessage {
  id?: string;
  message: string;
  userName: string;
  color: string;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, AsyncPipe, DatePipe]
})
export class AppComponent implements OnInit {
  title = 'chat application';

  // user settings: username, color, and new message input
  userName: string = '';
  userColor: string = '#000000';
  newMessage: string = '';
  sendError: string | null = null;

  // observable to hold the list of messages fetched from Firestore
  messages$!: Observable<ChatMessage[]>;

  constructor(private firestore: Firestore) {}

  // ngOnInit: load user settings from localStorage and fetch messages from Firestore
  ngOnInit() {
    this.userName = localStorage.getItem('userName') || '';
    this.userColor = localStorage.getItem('userColor') || '#000000';

    // create a Firestore query to fetch chat messages, ordered by timestamp
    const messagesCollection = collection(this.firestore, 'cs336-chat');
    const messagesQuery = query(
      messagesCollection,
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    // assign the query results to messages$
    this.messages$ = collectionData(messagesQuery, { idField: 'id' }) as Observable<ChatMessage[]>;
  }

  // updateUserName: handle username updates from user input
  updateUserName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userName = input.value;
    localStorage.setItem('userName', this.userName);
  }

  // updateUserColor: handle color updates from user input
  updateUserColor(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userColor = input.value;
    localStorage.setItem('userColor', this.userColor);
  }

  // sendMessage: send a new message to Firestore after validation
  async sendMessage() {
    // reset any previous errors
    this.sendError = null;

    // trim and validate the message input
    const trimmedMessage = this.newMessage.trim();

    // check if username is set
    if (!this.userName) {
      this.sendError = 'please set a username before sending a message';
      return;
    }

    // check if the message is not empty
    if (!trimmedMessage) {
      this.sendError = 'message cannot be empty';
      return;
    }

    try {
      const messagesCollection = collection(this.firestore, 'cs336-chat');

      // add the new message to Firestore with the current timestamp
      await addDoc(messagesCollection, {
        message: trimmedMessage,
        userName: this.userName,
        color: this.userColor,
        timestamp: new Date()
      });

      // clear the message input after successful sending
      this.newMessage = '';
    } catch (error) {
      console.error('error sending message:', error);
      // set an error message if message sending fails
      this.sendError = 'failed to send message. please check your connection.';
    }
  }
}
