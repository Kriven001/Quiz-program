import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' //import HTTPCLIENT & add HTTPCLIENT MODULE IN app.module.ts
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http : HttpClient) { }    

 getQuestionJson(){
  return this.http.get<any>("assets/questions.json"); //add questions file
 }
}
