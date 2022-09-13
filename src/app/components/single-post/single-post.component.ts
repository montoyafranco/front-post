import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/models';
import {Input} from '@angular/core'
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
 
  [x: string]: any;

  @Input() post?:Post;

  constructor() { }

  ngOnInit(): void {
  }

}
