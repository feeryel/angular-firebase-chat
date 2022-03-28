import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs'
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState
  }

  get currentUserId(): string {    
    return this.authState ? this.authState.uid : '';
  }

  getCurrentUserLoggedIn() {
    return this.authState
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.authState = res.user;
        const status = 'online';
        this.setUserData(email, displayName, status);
        this.router.navigate(['chat']);
      })
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {        
        this.authState = res.user;
        this.setUserStatus('online');
        this.router.navigate(['chat']);
      });
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => { console.log(error) });
  }

  setUserStatus(status: string): void {    
    const path = `users/${this.currentUserId}`;

    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  authUser() {
    return this.user;
  }

  logout() {
    this.setUserStatus('offline')
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }
}
