import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conte, PropositionQuestionRequest, QuizContenuRequest, QuizService } from '../../quiz/quiz';

type TypeReponse = 'QCM' | 'VRAI_FAUX';

interface LocalProposition {
  texteProposition: string; // affichage/local
  estCorrecte: boolean;
  ordre?: number;
  idQuestion?: number;
}

interface LocalQuestion {
  texteQuestion: string; // affichage/local
  typeReponse: TypeReponse;
  ordre: number;
  points: number;
  propositions: LocalProposition[];
  reponseVraiFaux?: boolean;
}

@Component({
  selector: 'app-ajout-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-quiz.html',
  styleUrls: ['./ajout-quiz.css']
})
export class AjoutQuiz implements OnInit {
  contes: Conte[] = [];
  selectedConteId: number | null = null;

  currentQuiz: {
    titre: string;
    description: string;
    questions: LocalQuestion[];
  } = {
    titre: '',
    description: '',
    questions: [
      {
        texteQuestion: '',
        typeReponse: 'QCM',
        ordre: 1,
        points: 1,
        propositions: [
          { texteProposition: '', estCorrecte: false, ordre: 1, idQuestion: 0 }
        ],
        reponseVraiFaux: false
      }
    ]
  };

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadContesPublics();
  }

  loadContesPublics(): void {
    this.quizService.getContesPublics().subscribe({
      next: (data) => (this.contes = data),
      error: (err) => console.error('Erreur chargement contes', err)
    });
  }

  addQuestion(): void {
    this.currentQuiz.questions.push({
      texteQuestion: '',
      typeReponse: 'QCM',
      ordre: this.currentQuiz.questions.length + 1,
      points: 1,
      propositions: [{ texteProposition: '', estCorrecte: false, ordre: 1, idQuestion: 0 }],
      reponseVraiFaux: false
    });
  }

  removeQuestion(index: number): void {
    this.currentQuiz.questions.splice(index, 1);
    this.currentQuiz.questions.forEach((q, i) => q.ordre = i + 1);
  }

  addProposition(question: LocalQuestion): void {
    const nextOrdre = (question.propositions.length || 0) + 1;
    question.propositions.push({ texteProposition: '', estCorrecte: false, ordre: nextOrdre, idQuestion: 0 });
  }

  removeProposition(question: LocalQuestion, index: number): void {
    question.propositions.splice(index, 1);
  }

  setQuestionType(type: TypeReponse, question: LocalQuestion): void {
    question.typeReponse = type === 'VRAI_FAUX' ? 'VRAI_FAUX' : 'QCM';
    if (question.typeReponse === 'VRAI_FAUX') {
      question.propositions = [
        { texteProposition: 'Vrai', estCorrecte: false, ordre: 1, idQuestion: 0 },
        { texteProposition: 'Faux', estCorrecte: false, ordre: 2, idQuestion: 0 }
      ];
      question.reponseVraiFaux = false;
    } else {
      if (question.propositions.length === 2 && question.propositions[0].texteProposition === 'Vrai') {
        question.propositions = [{ texteProposition: '', estCorrecte: false, ordre: 1, idQuestion: 0 }];
      }
      question.reponseVraiFaux = false;
    }
  }

  validateQuiz(): void {
    if (!this.selectedConteId) {
      alert(' Sélectionnez un conte avant de créer un quiz.');
      return;
    }

    // Mapping local -> format attendu par le backend (QuizContenuRequest)
    const payload: QuizContenuRequest = {
      idContenu: this.selectedConteId,
      titre: this.currentQuiz.titre,
      description: this.currentQuiz.description,
      questions: this.currentQuiz.questions.map((q, i) => ({
        question: q.texteQuestion,           // backend attend "question"
        typeReponse: q.typeReponse,          // "QCM" ou "VRAI_FAUX"
        ordre: i + 1,
        points: q.points,
        propositions: q.propositions.map((p, j) => ({
          texte: p.texteProposition,        // backend attend "texte"
          estCorrecte: p.estCorrecte,
          ordre: j + 1,
          idQuestion: 0
        })),
        reponseVraiFaux: !!q.reponseVraiFaux
      }))
    };

    console.log(' Payload envoyé au backend:', payload);

    this.quizService.creerQuizPublic(payload).subscribe({
      next: (res) => {
        alert(' Quiz créé avec succès !');
        console.log(res);
        // reset simple
        this.currentQuiz = {
          titre: '',
          description: '',
          questions: [
            {
              texteQuestion: '',
              typeReponse: 'QCM',
              ordre: 1,
              points: 1,
              propositions: [{ texteProposition: '', estCorrecte: false, ordre: 1, idQuestion: 0 }],
              reponseVraiFaux: false
            }
          ]
        };
        this.selectedConteId = null;
      },
      error: (err) => {
        console.error(' Erreur création quiz', err);
        alert('Erreur lors de la création du quiz. Voir console pour détails.');
      }
    });
  }
}
