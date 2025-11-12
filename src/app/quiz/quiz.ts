import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Conte {
  id: number;
  titre: string;
  description?: string;
}

// Interface côté frontend qui correspond au DTO backend PropositionRequest
export interface PropositionQuestionRequest {
  texte: string;
  estCorrecte: boolean;
  ordre?: number;
  idQuestion?: number;
}

// Interface côté frontend qui correspond au DTO backend QuestionQuizRequest
export interface QuestionQuizRequest {
  question: string;
  typeReponse: 'QCM' | 'VRAI_FAUX';
  ordre?: number;
  points?: number;
  propositions: PropositionQuestionRequest[];
  reponseVraiFaux?: boolean;
}

// Interface globale envoyée au backend
export interface QuizContenuRequest {
  idContenu: number;
  titre: string;
  description?: string;
  questions: QuestionQuizRequest[];
}

export interface QuizDTO {
  id: number;
  titre: string;
  description: string;
  difficulte?: string;
  dateCreation?: string;
  nombreQuestions?: number;
  conteTitre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/api/quiz-contenu';
  private apiUrle = 'http://localhost:8080/api/superadmin';

  constructor(private http: HttpClient) {}

  creerQuizPublic(quiz: QuizContenuRequest): Observable<QuizDTO> {
    return this.http.post<QuizDTO>(`${this.apiUrl}/creer-public`, quiz);
  }

  getContesPublics(): Observable<Conte[]> {
    return this.http.get<Conte[]>(`${this.apiUrl}/contes/publics`);
  }

   getAllQuizzes(): Observable<QuizDTO[]> {
    return this.http.get<QuizDTO[]>(`${this.apiUrle}/quiz-publics`);
  }
}
