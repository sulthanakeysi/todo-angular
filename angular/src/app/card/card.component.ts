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



  // on double click on task
  update = (post) => {
    post['isEdit'] = true;

  }

  // updating tasks
  onUpdate = (post,text) => {
    let data = {task : text};
    this.taskService.updateData(post, data)
    .subscribe( (res: any) => {
      post['isEdit'] = false;
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1, res.task);



    });
  }

  // updating on checking
onCheck = (post) => {
  this.taskService.checkData(post)
  .subscribe( (res: any) => {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1, res.task);
    const indx = this.posts.findIndex(x => x.done === true)
      if ( indx < 0) {
        this.check = false;
      } else {
        this.check = true;
      }

  });
}

// deleting all checked tasks
clearAll = () => {
  const result = this.posts.filter(( post ) => post.done === false);
  this.taskService.clearAll()
  .subscribe((res) => {
    this.posts = result;

  });
}

// navigating
navigate = (cond) => {
  if(cond === 'all') {

    this.highlightActive = false;
    this.highlightCompleted =false;
    this.highlightAll = true;

    this.taskService.all()
    .subscribe(res => this.posts = res);

  } else if (cond === false) {

    this.highlightCompleted =false;
    this.highlightAll = false;
    this.highlightActive = true;

    this.taskService.active()
    .subscribe((res) => {
      console.log(res);
      this.posts = res;
    });

  } else {

    this.highlightActive = false;
    this.highlightCompleted =true;
    this.highlightAll = false;

   this.taskService.completed()
     .subscribe(res => this.posts = res);

  }
}



}
