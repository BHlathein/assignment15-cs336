import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestoreRec } from '../models/firestore-rec.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatCollection;
  mesgs$: Observable<FirestoreRec[]>;

  constructor(private firestore: Firestore) {
    // Initialize chatCollection after Firestore is injected
    this.chatCollection = collection(this.firestore, 'cs336-chat');
    
    // Create query for messages
    const q = query(this.chatCollection, orderBy('timestamp'));
    
    // Get observable of messages
    this.mesgs$ = collectionData<FirestoreRec[]>(q);
  }

  submitNewMessage(message: string, userName: string, color: string) {
    const newMessage: FirestoreRec = {
      userName,
      message,
      color,
      timestamp: new Date() as any // Use server timestamp in production
    };

    return addDoc(this.chatCollection, newMessage);
  }
}