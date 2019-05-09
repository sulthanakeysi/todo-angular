import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  text: '';
  editId: any = '' ;
  posts: any;
  check = false;

  highlightActive = false;
  highlightCompleted = false;
  highlightAll = false;


  constructor(private taskService: TaskService) {}

   ngOnInit() {
     // displaying tasks
    this.taskService.getData().subscribe(response => {
      this.posts = response;
      this.posts.forEach( post => {
        post['isEdit'] = false;
        if (post.done ) {
          this.check = true;
        }
      });
    });
  }

  // inserting tasks
  onEnter = () => {
    const post = {task: this.text };
    this.text = '';
    this.taskService.postData(post)
    .subscribe(response => {
      this.posts.push(response);
    });
  }

  active(data) {
    this.highlightCompleted = false;
    this.highlightAll = false;
    this.highlightActive = true;

    this.taskService.active()
    .subscribe((res) => {
      this.posts = res;
    });
  }

  all(data) {
    this.highlightActive = false;
    this.highlightCompleted = false;
    this.highlightAll = true;

    this.taskService.all()
    .subscribe(res => this.posts = res);
  }

  complete(data) {
    this.highlightActive = false;
    this.highlightCompleted = true;
    this.highlightAll = false;

   this.taskService.completed()
     .subscribe(res => this.posts = res);
  }

  clearAll = () => {
    const result = this.posts.filter(( post ) => post.done === false);
    this.taskService.clearAll()
    .subscribe((res) => {
      this.posts = result;
    });
  }
}
