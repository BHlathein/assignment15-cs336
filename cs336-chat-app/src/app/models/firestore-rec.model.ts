import { Timestamp } from '@angular/fire/firestore';

export interface FirestoreRec {
  userName: string;
  message: string;
  timestamp: Timestamp;
  color?: string;
  id?: string;
}