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
  cardWidth: number = 30;       // largeur fixe de chaque carte
  cardGapPx: number = 3;        // espace entre les cartes
  visibleItems: number = 3;

  constructor(private projectService: ProjectsService) {}

  ngOnInit() {
    this.projects = this.projectService.project();
  }

  nextProject(): void {
    if (this.projects.length <= this.visibleItems) return;
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;

    if (this.currentIndex + this.visibleItems > this.projects.length) {
      this.currentIndex = 0;
    }
  }

  prevProject(): void {
    if (this.projects.length <= this.visibleItems) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }
}
