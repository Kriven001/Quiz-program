import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {

  public name: string="";
  public questionList: any = [];
  public currentQuestion:number = 0;
  public points: number=0;
  counter=60;
  correctAnswer:number = 0;
  incorrectAnswer:number = 0;
  interval$:any;
  progress:string="0";
  isQuizzCompleted : boolean = false;

  constructor(private questionService : QuestionsService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
      //console.log(res.questions);
    })
  }

  nextQuestion(){
    this.currentQuestion++;
  }

  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQno:number,option:any){
    if(currentQno === this.questionList.length){
      this.isQuizzCompleted = true;
      this.stopCounter();
    }

    if(option.correct){
      this.points+=10;
      // this.points = this.points+10; (above on is shortcut of this one both are same)
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);    //1000 milliseconds = 1 second
      
    }else{
      setTimeout(() => {
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);   //1000 milliseconds = 1 second
      
      this.points-=10;
      // this.points = this.points-10; (above on is shortcut of this one both are same)
    }
  }

  startCounter(){
    this.interval$ = interval(1000) //1000 milliseconds = 1 second
    .subscribe(val=>{
      this.counter--;
      if (this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points=-10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetQuizz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress='0';
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
