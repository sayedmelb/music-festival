import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicFestival } from '../model/music.festival';


@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  url = '/api/v1/festivals';

  constructor(private httpClient: HttpClient) { }

  public getMusicFestivals(): Observable<MusicFestival[]> {
    return this.httpClient.get<MusicFestival[]>(this.url);
  }
}
