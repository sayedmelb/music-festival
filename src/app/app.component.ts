import { Component } from '@angular/core';
import * as _ from 'lodash';
import { MusicDataService } from './service/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  //jsonobj: any = [{ "bands": [{ "name": "Propeller", "recordLabel": "Pacific Records" }, { "name": "Critter Girls", "recordLabel": "ACR" }] }, { "name": "Twisted Tour", "bands": [{ "name": "Squint-281" }, { "name": "Summon", "recordLabel": "Outerscope" }, { "name": "Auditones", "recordLabel": "Marner Sis. Recording" }] }, { "name": "Trainerella", "bands": [{ "name": "Manish Ditch", "recordLabel": "ACR" }, { "name": "Adrian Venti", "recordLabel": "Monocracy Records" }, { "name": "Wild Antelope", "recordLabel": "Still Bottom Records" }, { "name": "YOUKRANE", "recordLabel": "Anti Records" }] }, { "name": "LOL-palooza", "bands": [{ "name": "Werewolf Weekday", "recordLabel": "XS Recordings" }, { "name": "Winter Primates", "recordLabel": "" }, { "name": "Jill Black", "recordLabel": "Fourth Woman Records" }, { "name": "Frank Jupiter", "recordLabel": "Pacific Records" }] }, { "name": "Small Night In", "bands": [{ "name": "Green Mild Cold Capsicum", "recordLabel": "Marner Sis. Recording" }, { "name": "The Black Dashes", "recordLabel": "Fourth Woman Records" }, { "name": "Squint-281", "recordLabel": "Outerscope" }, { "name": "Wild Antelope", "recordLabel": "Marner Sis. Recording" }, { "name": "Yanke East", "recordLabel": "MEDIOCRE Music" }] }];
  //jsonobj: any = [{ "bands": [{ "name": "Propeller", "recordLabel": "Pacific Records" }, { "name": "Critter Girls", "recordLabel": "ACR" }] }, { "name": "Twisted Tour", "bands": [{ "name": "Squint-281" }, { "name": "Summon", "recordLabel": "Outerscope" }, { "name": "Auditones", "recordLabel": "Marner Sis. Recording" }] }, { "name": "Trainerella", "bands": [{ "name": "Summon", "recordLabel": "Outerscope" },{ "name": "Manish Ditch", "recordLabel": "ACR" }, { "name": "Adrian Venti", "recordLabel": "Monocracy Records" }, { "name": "Wild Antelope", "recordLabel": "Still Bottom Records" }, { "name": "YOUKRANE", "recordLabel": "Anti Records" }] }, { "name": "LOL-palooza", "bands": [{ "name": "Werewolf Weekday", "recordLabel": "XS Recordings" }, { "name": "Winter Primates", "recordLabel": "" }, { "name": "Jill Black", "recordLabel": "Fourth Woman Records" }, { "name": "Frank Jupiter", "recordLabel": "Pacific Records" }] }, { "name": "Small Night In", "bands": [{ "name": "Green Mild Cold Capsicum", "recordLabel": "Marner Sis. Recording" }, { "name": "The Black Dashes", "recordLabel": "Fourth Woman Records" }, { "name": "Squint-281", "recordLabel": "Outerscope" }, { "name": "Wild Antelope", "recordLabel": "Marner Sis. Recording" }, { "name": "Yanke East", "recordLabel": "MEDIOCRE Music" }] }];
  jsonobj: any;

  recordLabelAry = [];
  masterLabelAry = [];



  bandObj = {
    bandname: "",
    festivals: []
  }


  constructor(private dataservice: MusicDataService) { }

  ngOnInit() {
    this.dataservice.getMusicFestivals().subscribe(res => {

      this.jsonobj = res;
      this.getDistinctRecordLabels();
      this.normalizeData();
      this.sortList();
    })

  }

  // lodashTest() {
  //   let str: string = "testing 34 dollars";
  //   let aryStr = _.words(str);
  //   console.log("arystr", aryStr);
  //   console.log("Json obj", this.jsonobj);
  //   this.getDistinctRecordLabels();
  //   this.normalizeData();

  // }

  

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
       
          // if(recordLabelObj.bands.length>1){
          //   let tmporderlistBands = recordLabelObj.bands;

          //   tmporderlistBands = _.orderBy(tmporderlistBands, ['band'],['asc']); 
          //   console.log("tmporderlistBands", tmporderlistBands);

          //   recordLabelObj.bands = tmporderlistBands; 
          // }

        });
       
      });

      this.masterLabelAry.push(recordLabelObj);

    }

    //sorting next -->



  }
  sortList(){

    _.forEach(this.masterLabelAry, record=> {
      let tmporderlistBands = record.bands;
      tmporderlistBands = _.orderBy(tmporderlistBands, ['band'],['asc']); 
      record.bands = tmporderlistBands; 

    });

    let festivalstemp = this.masterLabelAry;
    festivalstemp = _.orderBy(festivalstemp, ['recordLabelname'],['asc']); 
    this.masterLabelAry = festivalstemp; 


  }


}//end of app class
