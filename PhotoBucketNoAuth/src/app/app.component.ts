import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';

interface PhotoBucket {
  caption: string;
  imageUrl: string;
  $key?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'PhotoBucket';

  formPhotoBucket: PhotoBucket = {
    'caption': '',
    'imageUrl': ''
  };

  photoBucketStream: FirebaseListObservable<PhotoBucket[]>;
  constructor(db: AngularFireDatabase) {
    this.photoBucketStream = db.list('/photos');
  }

  onSubmit(): void {
    try {
      if (this.formPhotoBucket.$key) {
        this.photoBucketStream.update(this.formPhotoBucket.$key, this.formPhotoBucket);
      } else {
        this.photoBucketStream.push(this.formPhotoBucket);
      }

      this.formPhotoBucket = {
        'caption': '',
        'imageUrl': ''
      };
    } catch (e) {
      console.log('Form error');
    }
  }

  edit(photo: PhotoBucket): void {
    this.formPhotoBucket = photo;
  }

  remove(photoKey: string): void {
    this.photoBucketStream.remove(photoKey);
  }

  ngOnInit(): void {
  firebase.database().ref().child('title').on('value',
    (snapshot: firebase.database.DataSnapshot) => {
      this.title = snapshot.val();
    });

  }

  ngOnDestroy(): void {
    firebase.database().ref().child('title').off();
  }
}
