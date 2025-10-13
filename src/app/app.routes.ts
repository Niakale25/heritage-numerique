import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {path:'',component:Accueil,children:[
        {path:'',component:Dashboard}
    ]},

        {path:'login',component:Login }
    
];
