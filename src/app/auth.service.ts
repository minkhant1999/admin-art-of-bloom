import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loaded: boolean = false
  private currentUser: User | null = null
  waitUntilAuth() {
    return new Promise((resolve: (user: User | null) => void) => {
      if (this.loaded) {
        return resolve(this.currentUser)
      }
      let unsubscribe = onAuthStateChanged(getAuth(), (user: User | null) => {
        this.currentUser = user;
        this.loaded = true;
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
