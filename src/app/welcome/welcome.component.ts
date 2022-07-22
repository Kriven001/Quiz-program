import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';   //import add ViewChild and ElementRef before that welcome.html page add ViewChild name as (#new)

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameKey!: ElementRef
  constructor() { }

  ngOnInit(): void {
  }
  startQuizz(){
    localStorage.setItem("name",this.nameKey.nativeElement.value)
  }
}
