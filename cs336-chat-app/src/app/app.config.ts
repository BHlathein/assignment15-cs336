import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"chat-service-761ad","appId":"1:292483239653:web:609598e17b376e9f5c4e0c","storageBucket":"chat-service-761ad.firebasestorage.app","apiKey":"AIzaSyBG1iQbSYMdH5j_0L5EHAI9NiMG8jGRRGU","authDomain":"chat-service-761ad.firebaseapp.com","messagingSenderId":"292483239653","measurementId":"G-TVH2RM2WK8"})), provideFirestore(() => getFirestore())]
};
