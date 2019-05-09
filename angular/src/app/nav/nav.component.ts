import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { TaskService } from '../task.service';
// import { EventEmitter } from 'events';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  @Input() posts: any;
  @Input() check;
  @Input() highlightAll;
  @Input() highlightActive;
  @Input() highlightCompleted;
  

  @Output() activeEvent = new EventEmitter();
  @Output() allEvent = new EventEmitter();
  @Output() completedEvent = new EventEmitter();
  @Output() clearEvent = new EventEmitter();

  ngOnInit() {
  }

  onActive() {
    this.activeEvent.emit(this.posts);
  }
  all() {
    this.allEvent.emit(this.posts);
  }
  onComplete() {
    this.completedEvent.emit(this.posts);
  }

// deleting all checked tasks
clearAll = () => {
  this.clearEvent.emit(this.posts);
}
}
