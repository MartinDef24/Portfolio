import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take, tap} from "rxjs";
import {ProjectInterface} from "../../interfaces/project-interface";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects$ = this.httpClient.get<ProjectInterface[]>('/assets/data/projects.json').pipe(take(1));
  project = toSignal(this.projects$, { initialValue: [] as ProjectInterface[] });

  constructor(private httpClient:HttpClient) { }

}
