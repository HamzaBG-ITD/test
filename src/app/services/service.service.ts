import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../interfaces/data';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = "http://staccah.fattureincloud.it/testfrontend/data.json";

  constructor(private http: HttpClient) { }


  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.url);
  }


}