import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuizDTO, QuizService } from '../../quiz/quiz';

@Component({
  selector: 'app-list-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-quiz.html',
  styleUrl: './list-quiz.css'
})
export class ListQuiz implements OnInit {

  quizList: QuizDTO[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  //  Chargement des quiz depuis le backend
  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data: QuizDTO[]) => {
        this.quizList = data;
        console.log(' Liste des quiz chargée :', data);
      },
      error: (err: any) => {
        console.error(' Erreur lors du chargement des quiz', err);
      }
    });
  }
}
