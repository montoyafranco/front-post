import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Post } from 'src/app/services/models';
import { CreatePostCommand } from 'src/app/services/models';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from 'src/app/services/socket/socket.service';
import { StateService } from 'src/app/services/state/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main', //santi dice app-post.page
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  posts?: Post[];

  newTitle: string = '';
  newAuthor: string = '';
  //traigo el socketmangaer
  socketManager?: WebSocketSubject<Post>;

  availableState : any ;

  constructor(
    private request: RequestService,
    private socket: SocketService,
    private state: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //declaro que siempre que inicie me traiga todos los post y se conecte al socket
    if (this.validateLogin()) {
      this.bringPosts();
      this.connectToMainSpace();
    }
  }
  //aca empiezo a modificar
  validateLogin(): boolean {
    let validationResult = false;
    this.state.state.subscribe((currentState) => 
    {
      console.log(currentState)
      this.availableState = currentState;
      if (!currentState.logedIn) {
        this.router.navigateByUrl('/login');
        validationResult = false;
        return;
      }
      validationResult = true;
    });
    return validationResult;
  }

  bringPosts() {
    //getallpost .  request esta inicializado en constructor request:RquestService , depndecy injection
    this.request.bringAllPost().subscribe((posts) => {
      this.posts = posts;
      console.log(posts);
    });
  }
  submitPost() {
    //recojo lo entrado con ngmodel newtitle y autor y lo paso aca y al final lo vuelvo a ""
    const newCommand: CreatePostCommand = {
      postId: Math.floor(Math.random() * 100000).toString(),
      title: this.newTitle,
      author: this.newAuthor,
    };

    this.request.CreaPostAction(newCommand
      ,this.availableState.token)
    .subscribe();

    // lo de abajo lo vuelve a espacio en blanco

    this.newTitle = '';

    this.newAuthor = '';
  }

  connectToMainSpace() {
    this.socketManager = this.socket.connectAll();
    this.socketManager.subscribe((postNuevo) => {
      this.posts?.unshift(postNuevo);
      //unshift lo que hace es que lo agrega al inicio del array
    });
  }
  closeSocket() {
    this.socketManager?.complete();
  }
}
