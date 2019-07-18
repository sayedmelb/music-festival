import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { MusicDataService } from './service/music.data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  jsonobj: any;

  errorMessage: string = "";
  errorStatus: boolean = false;
  recordLabelAry = [];
  masterLabelAry = [];

  bandObj = {
    bandname: "",
    festivals: []
  }


  constructor(private dataservice: MusicDataService) { }

  ngOnInit() {

    this.getfestivalData();


  }
  getfestivalData() {
    this.dataservice.getMusicFestivals().subscribe(res => {
      if (res.length == 0) {
        this.errorStatus = true;
        this.errorMessage = "Empty response"
      }


      this.jsonobj = res;

      this.getDistinctRecordLabels();
      this.normalizeData();
      this.sortList();
    },
      err => {
        console.log("http error", err);
        this.errorStatus = true;
        this.errorMessage = err.statusText;

      }
    );


  }




  RefreshData(num: number) {
      this.errorStatus = false;
      this.jsonobj = [];
      this.recordLabelAry = [];

      this.masterLabelAry = [];
      this.getfestivalData();
    

  }



  getDistinctRecordLabels() {
    _.forEach(this.jsonobj, festival => {
      _.forEach(festival.bands, band => {
        if (band.recordLabel) {
          this.recordLabelAry.push(band.recordLabel);
        }
      });
    });

    //removing duplicates of recordLabel
    this.recordLabelAry = this.recordLabelAry.filter((el, i, a) => i === a.indexOf(el))
  }



  normalizeData() {
    for (let i = 0; i < this.recordLabelAry.length; i++) {
      let recordLabeltemp = this.recordLabelAry[i];
      let recordLabelObj = {
        recordLabelname: recordLabeltemp,
        bands: []
      }

      _.forEach(this.jsonobj, festival => {

        _.forEach(festival.bands, band => {

          let banddObj = {
            band: band.name,
            festival: ""
          };

          if (band.recordLabel && band.recordLabel === recordLabeltemp) {
            if (festival.name) {
              banddObj.festival = festival.name;
            }
            else {
              banddObj.festival = 'n/a'
            }
            recordLabelObj.bands.push(banddObj);
          }


        });

      });

      this.masterLabelAry.push(recordLabelObj);

    }



  }

  sortList() {

    _.forEach(this.masterLabelAry, record => {
      let tmporderlistBands = record.bands;
      tmporderlistBands = _.orderBy(tmporderlistBands, ['band'], ['asc']);
      record.bands = tmporderlistBands;

    });

    let festivalstemp = this.masterLabelAry;
    festivalstemp = _.orderBy(festivalstemp, ['recordLabelname'], ['asc']);
    this.masterLabelAry = festivalstemp;


  }


}//end of app class
