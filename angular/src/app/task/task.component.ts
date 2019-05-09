import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  @Input() posts: any;
  @Input() check;

  ngOnInit() {

   }


   // updating on checking
  onCheck = (post) => {
  this.taskService.checkData(post)
  .subscribe( (res: any) => {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1, res.task);
    const indx = this.posts.findIndex(x => x.done === true);
      if ( indx < 0) {
        this.check = false;
      } else {
        this.check = true;
      }

  });
}


 // on double click on task
 update = (post) => {
  post['isEdit'] = true;

}

// updating tasks
onUpdate = (post, text) => {
  const data = {task : text};
  this.taskService.updateData(post, data)
  .subscribe( (res: any) => {
    post['isEdit'] = false;
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1, res.task);



  });
}

// deleting tasks
delete = (post) => {
  this.taskService.deleteData(post)
  .subscribe(response => {
    // const indx = this.temp.indexOf(post);
    // this.temp.splice(indx, 1);
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
  });
}
}
