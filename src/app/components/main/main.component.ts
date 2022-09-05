import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from 'src/app/services/models';
import { CreatePostCommand } from 'src/app/services/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts? : Post[];

  newTitle : string = "";
  newAuthor: string = "";
  

  constructor(private request : RequestService) { }

  ngOnInit(): void {
    this.bringPosts()
  }
  bringPosts(){
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
  

}
