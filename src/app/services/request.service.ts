import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentType, Post } from './models';
import { CreatePostCommand } from './models';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  // esta url es la de login https://sheltered-wave-64500.herokuapp.com/auth/login
  LOGIN_URL = 'https://alpha-posts-sofka-agus.herokuapp.com/auth/login';
  ALPHA_URL = "https://alpha-posts-sofka-agus.herokuapp.com/"
  BETTA_URL ="https://betta-post-and-comments-sofka.herokuapp.com/"
  BETTA_URL_GET = "https://betta-post-and-comments-sofka.herokuapp.com/getAllPosts"
  BETTA_URL_GET_ID = "https://betta-post-and-comments-sofka.herokuapp.com/getAllPostsId/"

  constructor(private client: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  loginMethod(command: any): Observable<Object> {
    return this.client.post(this.LOGIN_URL, command, this.httpOptions);
  }
  // -----------------arriba es la de login-----

  bringAllPost(): Observable<Post[]> {
    return this.client.get<Post[]>(
      this.BETTA_URL_GET
    );
  }
  CreaPostAction(
    command: CreatePostCommand,
    token: string
  ): Observable<Object> {
    return this.client.post(
     "https://alpha-posts-sofka-agus.herokuapp.com/create/post",
      command,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
  getPostById(aggregateId: string): Observable<Post> {
    console.log('estoy en service');
    return this.client.get<Post>(
      `https://betta-post-and-comments-sofka.herokuapp.com/getAllPostsId/${aggregateId}`
    );
  }
  addCommentToPost(comment: CommentType): Observable<Object> {
    return this.client.post(
     "https://alpha-posts-sofka-agus.herokuapp.com/add/comment",
      comment,
      this.httpOptions
    );
  }

  // manejo de errores
  // private handleError<T>(operation = "operation",result?:T){
  //   return(error:any): Observable<T>=>{
  //     console.error(error)
  //   }
  // }
}
