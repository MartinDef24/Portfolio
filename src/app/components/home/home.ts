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
  cardWidth: number = 30;
  cardGapPx: number = 3;
  visibleItems: number = 3;

  constructor(private projectService: ProjectsService) {}

  ngOnInit() {
    this.projects = this.projectService.project();
    console.log(this.projects)
  }

  nextProject(): void {
    if (this.projects.length <= this.visibleItems) return;

    if (this.currentIndex >= this.projects.length - this.visibleItems) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  prevProject(): void {
    if (this.projects.length <= this.visibleItems) return;

    if (this.currentIndex === 0) {
      this.currentIndex = this.projects.length - this.visibleItems;
    } else {
      this.currentIndex--;
    }
  }
}
