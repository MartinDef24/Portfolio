import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import {ProjectDetails} from "./components/project-details/project-details/project-details";

export const routes: Routes = [
    {path:'', component:Home},
    {path:":company", component: ProjectDetails}
];
