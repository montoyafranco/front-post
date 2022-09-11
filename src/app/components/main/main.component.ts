import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from 'src/app/services/models';
import { CreatePostCommand } from 'src/app/services/models';
import { WebSocketSubject } from 'rxjs/webSocket'; 
import { SocketService } from 'src/app/services/socket/socket.service';


@Component({
  selector: 'app-main', //santi dice app-post.page
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 

  posts? : Post[];

  newTitle : string = "";
  newAuthor: string = "";  
   //traigo el socketmangaer
   socketManager?:WebSocketSubject<Post>;

  constructor(private request : RequestService,    private socket:SocketService) { }

  ngOnInit(): void {
    this.bringPosts()
    this.connectToMainSpace()
  }
  bringPosts(){ //getallpost
    this.request.bringAllPost().subscribe(posts =>{
      this.posts = posts
    }
      )
  }
  submitPost(){
    const newCommand : CreatePostCommand =
    {
      postId : Math.floor(Math.random() * 100000 ).toString(),
      title : this.newTitle,
      author : this.newAuthor

    }
  this.request.CreaPostAction(newCommand).subscribe()
  this.newTitle = ""
  this.newAuthor = ""

  }
  connectToMainSpace(){
    this.socketManager = this.socket.connectAll()
    this.socketManager.subscribe((message) =>{      this.posts?.unshift(message)
    })
  }
  closeSocket(){
    this.socketManager?.complete();
  }
  
  

}
