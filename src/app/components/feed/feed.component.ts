import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { Observable } from 'rxjs';
import { ChatMessage } from "../../models/chat-message.model";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: object
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.feed = this.chatService.getMessages().valueChanges();
  }

  ngOnChanges(): void {
    this.feed = this.chatService.getMessages().valueChanges();
  }

}
