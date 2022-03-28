import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { ChatMessage } from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage
  username: string

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(value => {
        this.username = value["displayName"]
      })
    })
  }

  getUser() {
    const currentUserId = this.user.uid;
    const path = `/users/${currentUserId}`;
    return this.db.object(path);
  }

  getAllUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(message: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: message,
      timeStamp: timeStamp,
      username: this.username,
      email: email
    })
  }

  getTimeStamp() {
    const now = new Date();
    const date = `${now.getUTCFullYear()}/${(now.getUTCMonth() + 1)}/${now.getUTCDate()}`;
    const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCDate()}`;
    return date + '-' + time
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.orderByKey().limitToLast(25));
  }

}
