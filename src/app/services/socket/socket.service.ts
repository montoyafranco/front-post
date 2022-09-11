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
    return webSocket("ws://localhost:8082/retrieve/mainSpace")
  }
// aca le paso el id del post y le paso una variable con template string
//    que es el id del agregado y me devuelve un websubjects socket de tipo comentview
  connectSpecificSpace(post :string): WebSocketSubject<CommentType>{
    return webSocket(`ws://localhost:8082/retrieve/${post}`)

  }
}
