import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models';
import { CreatePostCommand } from './models';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private client:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  bringAllPost()  :Observable<Post[]>{
    return this.client.get<Post[]>("http://localhost:8081/getAllPosts");
  }
  CreaPostAction(command : CreatePostCommand) : Observable<Object>{
    return this.client.post("http://localhost:8080/create/post",command,this.httpOptions);
  }
}
