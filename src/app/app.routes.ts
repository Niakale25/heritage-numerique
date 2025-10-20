import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { AjoutContenu } from './pages/ajout-contenu/ajout-contenu';
import { Famille } from './pages/famille/famille';
import { Musique } from './pages/musique/musique';
import { Utilisateur } from './pages/utilisateur/utilisateur';

export const routes: Routes = [
    {path:'',component:Accueil,children:[
        {path:'',component:Dashboard},
        {path:'accueil',component:Dashboard},
        {path:'famille',component:Famille},
        {path:'music',component:Musique},
        {path:'utilisateur',component:Utilisateur},
        {path:'accueil',component:Dashboard},
        {path:'accueil',component:Dashboard},
        {path:'accueil',component:Dashboard},

        {path:'ajouterContenu',component:AjoutContenu}
    ]},

        {path:'login',component:Login }
    
];
