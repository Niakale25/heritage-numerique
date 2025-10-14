import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { AjoutContenu } from './pages/ajout-contenu/ajout-contenu';

export const routes: Routes = [
    {path:'',component:Accueil,children:[
        {path:'',component:Dashboard},
        {path:'ajoutContenu',component:AjoutContenu}
    ]},

        {path:'login',component:Login }
    
];
