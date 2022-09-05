import { Component, OnInit } from '@angular/core';
import { CommentType } from 'src/app/services/models';
import {Input} from '@angular/core'

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {
  @Input() comment? : CommentType;

  constructor() { }

  ngOnInit(): void {
  }

}
