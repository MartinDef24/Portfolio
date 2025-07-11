import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from "../contact/contact";
import { ProjectsService } from "../../services/projects/projects-service";
import { ProjectInterface } from "../../interfaces/project-interface";

@Component({
  selector: 'app-home',
  imports: [Contact, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  projects: ProjectInterface[] = [];
  currentIndex: number = 0;

  constructor(private projectService: ProjectsService) {
  }

  ngOnInit() {
    this.projects = this.projectService.project();
  }
  get displayedProjects(): ProjectInterface[] {
    const result: ProjectInterface[] = [];
    const numProjects = this.projects.length;

    if (numProjects === 0) {
      return [];
    }
    if (numProjects <= 3) {
      return [...this.projects];
    }

    for (let i = 0; i < 3; i++) {
      const projectIndex = (this.currentIndex + i) % numProjects;
      result.push(this.projects[projectIndex]);
    }
    return result;
  }

  nextProject(): void {
    if (this.projects.length === 0) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }
  prevProject(): void {
    if (this.projects.length === 0) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }
}
