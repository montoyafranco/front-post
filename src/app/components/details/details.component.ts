import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  posts?: any;

  constructor(
    private request:RequestService,
    private route: ActivatedRoute,
    // private location: Location,
    private socketService : SocketService

  ) {    
   }



  ngOnInit(): void {
    this.getPostById()
  }
  getPostById() {
    const id = String(this.route.snapshot.paramMap.get("aggregateId"))
    this.request.getPostById(id).subscribe(post => this.posts = post)
    console.log(id)
  }

}
