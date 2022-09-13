import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { CommentType } from 'src/app/services/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  posts?: any;
  socketManager?: WebSocketSubject<any>;

  author: string = '';
  content: string = '';

  constructor(
    private request: RequestService,
    private route: ActivatedRoute,
    private location: Location,
    private socket: SocketService
  ) {}

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById() {
    const id = String(this.route.snapshot.paramMap.get('aggregateId'));
    this.request.getPostById(id).subscribe((post) => {
      this.posts = post;
      this.connectSpecificSpace(id);
    });
    console.log(id);
  }
  addComment() {
    const newComment: CommentType = {
      commentId: Math.floor(Math.random() * 100000).toString(),
      postId: String(this.route.snapshot.paramMap.get('aggregateId')),
      author: this.author,
      content: this.content,
    };
    this.request.addCommentToPost(newComment).subscribe();
    this.author = '';
    this.content = '';
  }
  closeSocket(){
    this.socketManager?.complete;
  }

  connectSpecificSpace(post: string) {
    const id = String(this.route.snapshot.paramMap.get('aggregateId'));
    this.socketManager = this.socket.connectSpecificSpace(id);
    this.socketManager.subscribe((comment) => {
      this.posts.comments.unshift(comment);
      //unshift lo que hace es que lo agrega al inicio del array
    });
  }
  goBack() {
    this.socketManager?.complete;
    this.location.back();
  }
}
