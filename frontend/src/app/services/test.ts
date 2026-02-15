import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {

	endpoint = 'http://localhost:8080/api/tests';
  
	constructor(private httpClient: HttpClient){}
	
	getTests(){
		return this.httpClient.get(this.endpoint);
	}


}
