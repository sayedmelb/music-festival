import { Component } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 

  constructor() { }

  ngOnInit() {
    this.lodashTest()
  }

  lodashTest(){
    let str: string = "testing 34 dollars";
    let aryStr = _.words(str);
    console.log("arystr",aryStr);
    
  }


}
