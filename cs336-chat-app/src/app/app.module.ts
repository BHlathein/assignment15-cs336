import { NgModule } from '@angular/core';  
import { RouterModule } from '@angular/router';  
import { routes } from './app.routes';  
import { FirebaseAppModule } from '@angular/fire/app';  
import { FirestoreModule } from '@angular/fire/firestore';  
import { initializeApp } from 'firebase/app';  
import { getFirestore } from 'firebase/firestore'; 
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
  
@NgModule({  
  imports: [  
   RouterModule.forRoot(routes),  
   FirebaseAppModule,  
   FirestoreModule  
  ],  
  providers: [  
   { provide: 'FirebaseApp', useFactory: () => initializeApp({  
    "projectId": "chat-service-761ad",  
    "appId": "1:292483239653:web:609598e17b376e9f5c4e0c",  
    "storageBucket": "chat-service-761ad.firebasestorage.app",  
    "apiKey": "AIzaSyBG1iQbSYMdH5j_0L5EHAI9NiMG8jGRRGU",  
    "authDomain": "chat-service-761ad.firebaseapp.com",  
    "messagingSenderId": "292483239653",  
    "measurementId": "G-TVH2RM2WK8"  
   })},  
   { provide: 'Firestore', useFactory: () => getFirestore() }  
  ]  
})  
export class AppModule {}
