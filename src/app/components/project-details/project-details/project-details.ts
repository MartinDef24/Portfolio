import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../../../services/projects/projects-service";
import {ProjectInterface} from "../../../interfaces/project-interface";
import {ActivatedRoute, Router} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-project-details',
  standalone: true,
  templateUrl: './project-details.html',
  imports: [
    NgClass
  ],
  styleUrl: './project-details.css'
})
export class ProjectDetails implements OnInit {
  project!:ProjectInterface;
  currentIndex: number = 0;
  cardWidth: number = 30;
  cardGapPx: number = 3;
  visibleItems: number = 3;

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let company:string = params['company']
      let projects = this.projectService.project()

      projects.forEach((project) => {
        if(project.Company == company) {
          this.project = project
        }
      })

      console.log(this.project)

      if(!this.project) {
        this.router.navigate(['/'])
      }
    })
  }

  nextProject(): void {
    if (this.project.Screenshots.length <= this.visibleItems) return;

    if (this.currentIndex >= this.project.Screenshots.length - this.visibleItems) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  prevProject(): void {
    if (this.project.Screenshots.length <= this.visibleItems) return;

    if (this.currentIndex === 0) {
      this.currentIndex = this.project.Screenshots.length - this.visibleItems;
    } else {
      this.currentIndex--;
    }
  }
}
