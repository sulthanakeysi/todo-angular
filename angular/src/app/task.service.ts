import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  posts: any[];
   url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
   }

   getData() {
      return this.http.get(this.url);
   }

   postData(post) {
      return this.http.post(this.url, post);
   }

   deleteData(post) {
     return this.http.delete(this.url + 'delete/' + post._id );
   }

   updateData(post, text1) {
     return this.http.put(this.url + 'update/' + post._id, text1 );
   }

   checkData(post) {
     const done = {done: post.done};
     return this.http.put(this.url + 'check/' + post._id, done);
   }

   clearAll() {
     return this.http.delete(this.url + 'clear');
   }

   active() {
     return this.http.get(this.url + 'active');
   }

   all() {
     return this.http.get(this.url);
   }

   completed() {
     return this.http.get(this.url + 'completed');
   }
}
