import { Injectable } from '@angular/core';
import { CommentType, Post } from '../models';
import { webSocket,WebSocketSubject } from 'rxjs/webSocket'
import { Subject , Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  //esto es lo que vamos a recibir desde el backend- un Post o CommentType que son los VIEWSMODELS
  connectAll():WebSocketSubject<Post>{
    return webSocket("WSS://gamma-test-post-and-comments.herokuapp.com/retrieve/mainSpace")
  }
// aca le paso el id del post y le paso una variable con template string
//    que es el id del agregado y me devuelve un websubjects socket de tipo comentview
  connectSpecificSpace(post :string): WebSocketSubject<CommentType>{
    return webSocket(`WSS://gamma-test-post-and-comments.herokuapp.com/retrieve/${post}`)
    //https://ancient-savannah-73564.herokuapp.com/
    //https://gamma-test-post-and-comments.herokuapp.com/

  }
}
