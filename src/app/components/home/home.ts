import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Contact } from "../contact/contact";
import {ProjectsService} from "../../services/projects/projects-service";
import {ProjectInterface} from "../../interfaces/project-interface";

@Component({
  selector: 'app-home',
  imports: [Contact],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  projects: ProjectInterface[];
  constructor(private projectService:ProjectsService) {
    this.projects = this.projectService.project()
  }

  ngOnInit() {
  }
}
