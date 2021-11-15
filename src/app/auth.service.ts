import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null
  waitUntilAuth() {
    return new Promise((resolve: (user: User | null) => void) => {
      let unsubscribe = onAuthStateChanged(getAuth(), (user: User | null) => {
        this.currentUser = user;
        resolve(user);
        unsubscribe();
      });
    })
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getIdToken() {
    return this.currentUser?.getIdToken();
  }

  signOut() {
    return getAuth().signOut();
  }
}
