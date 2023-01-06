import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private httpClient: HttpClient) { }

  getHttpClient() :HttpClient {
    return this.httpClient;
  }
}
