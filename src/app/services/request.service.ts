import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentType, Post } from './models';
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
    return this.client.get<Post[]>("https://still-ridge-12719.herokuapp.com/getAllPosts");
  }
  CreaPostAction(command : CreatePostCommand) : Observable<Object>{
    return this.client.post("https://sheltered-wave-64500.herokuapp.com/create/post",command,this.httpOptions);
  }
  getPostById  (aggregateId: string) :Observable<Post> {
    console.log("estoy en service")
    return this.client.get<Post>(`https://still-ridge-12719.herokuapp.com/getAllPostsId/${aggregateId}`);
    
  }
  addCommentToPost(comment : CommentType) : Observable <Object>{
    return this.client.post(`https://sheltered-wave-64500.herokuapp.com/add/comment`,comment,this.httpOptions)
  }
}
