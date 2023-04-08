import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  //  HTTP Client Constructor
  constructor(private _http: HttpClient) {}

  //  Load all the quizzes
  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //  Add new quiz
  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  // Delete quiz
  public deleteQuiz(qId: any) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  // Get the Single Quiz
  public getQuiz(qId: any) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  // Update Quiz
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  // Get the Quizzes of Category
  public getQuizzesOfCategory(cid: any) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  // Get Active Quizzes
  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  // Get Active Quizzes of Category
  public getActiveQuizzesOfCategory(cid: any) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
