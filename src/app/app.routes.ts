import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import {ProjectDetails} from "./components/project-details/project-details/project-details";
import {Forms} from "./components/forms/forms";

export const routes: Routes = [
    {path:"contact", component: Forms},
    {path:":company", component: ProjectDetails},
    {path:'', component:Home}

];
