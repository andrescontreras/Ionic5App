import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { throwError } from 'rxjs';
import { Task } from 'src/app/models/task';
import { Priority } from 'src/app/enums/priority.enum';
import { Status } from 'src/app/enums/status.enum';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss']
})
export class ListadoPage implements OnInit {
  filter;
  tasks: Task[] = [];
  deccending = false;
  order = 'name';

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filter = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTask();
  }

  getTask = async () => {
    const response = await this.taskService
      .getTask()
      .pipe(catchError(this.handleErrorGetTask))
      .toPromise();

    this.tasks = response.body.filter(item => item.status === this.filter);
    this.tasks.forEach(task => {
      task.priority = Priority[task.priority];
      task.status = Status[task.status];
    });
  };

  handleErrorGetTask = (error: any) => {
    this.toastService.presentError('Innesperate error getting task');
    return throwError('Innesperate error getting task');
  };

  openItem = (item: Task) => {
    this.router.navigate(['/home/detalle/' + item.pk]);
  };

  addTask = () => {
    this.router.navigate(['/home/detalle/new']);
  };

  changeOrder = (order: string) => {
    if (this.order === order) {
      this.deccending = !this.deccending;
    } else {
      this.order = order;
    }
    this.sortTask();
  };

  sortTask = () => {
    this.tasks.sort(this.compare);
  };

  compare = (a, b) => {
    const taskA = a[this.order].toUpperCase();
    const taskB = b[this.order].toUpperCase();

    let comparison = 0;
    if (taskA > taskB) {
      comparison = 1;
    } else if (taskA < taskB) {
      comparison = -1;
    }
    return this.deccending ? comparison : comparison * -1;
  };
}
