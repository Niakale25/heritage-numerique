import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { AjoutContenu } from './pages/ajout-contenu/ajout-contenu';
import { Famille } from './pages/famille/famille';
import { Musique } from './pages/musique/musique';
import { Utilisateur } from './pages/utilisateur/utilisateur';
import { ListQuiz } from './pages/list-quiz/list-quiz';
import { IndexQuiz } from './pages/index-quiz/index-quiz';
import { VraiFauxQuiz } from './pages/vrai-faux-quiz/vrai-faux-quiz';
import { AjoutQuiz } from './pages/ajout-quiz/ajout-quiz';

export const routes: Routes = [
    {path:'',component:Accueil,children:[
        {path:'',component:Dashboard},
        {path:'accueil',component:Dashboard},
        {path:'famille',component:Famille},
        {path:'music',component:Musique},
        {path:'utilisateur',component:Utilisateur},
        {path:'quiz',component:IndexQuiz,children:[
            {path:'',component:ListQuiz},
            {path:'list',component:ListQuiz},
            {path:'new',component:AjoutQuiz},
            {path:'vraiFaux',component:VraiFauxQuiz},
            
        ]},
        // {path:'ajouterQuiz',component:AjoutQuiz},
        {path:'accueil',component:Dashboard},
        {path:'ajouterContenu',component:AjoutContenu}
    ]},

        {path:'login',component:Login }
    
];
