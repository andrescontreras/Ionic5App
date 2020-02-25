import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { throwError } from 'rxjs';
import { Task } from 'src/app/models/task';
import { Priority } from 'src/app/enums/priority.enum';
import { Status } from 'src/app/enums/status.enum';
import { NgxSpinnerService } from 'ngx-spinner';

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
  title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private toastService: ToastService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.filter = this.activatedRoute.snapshot.paramMap.get('id');
    switch (this.filter) {
      case 'pending':
        this.title = 'Pending Task';
        break;
      case 'overdue':
        this.title = 'Overdue Task';
        break;
      case 'finished':
        this.title = 'Finished Task';
        break;
    }
    this.getTask();
  }

  doRefresh = async event => {
    await this.getTask();
    event.target.complete();
  };

  getTask = async () => {
    this.spinner.show();
    const response = await this.taskService
      .getTask()
      .pipe(catchError(this.handleErrorGetTask))
      .toPromise();

    this.tasks = response.body.filter(item => item.status === this.filter);
    this.tasks.forEach(task => {
      task.priority = Priority[task.priority];
      task.status = Status[Status[task.status]];
      this.spinner.hide();
    });
  };

  handleErrorGetTask = (error: any) => {
    this.spinner.hide();
    this.toastService.presentError('Innesperate error getting task');
    return throwError('Innesperate error getting task');
  };

  openItem = (item: Task) => {
    this.router.navigate(['/home/detalle/' + item.pk]);
  };

  deleteItem = (item: Task) => {
    this.spinner.show();
    const task = this.tasks.find(task => item.pk === task.pk);
    this.taskService
      .deleteTask(task.pk)
      .pipe(catchError(this.handleErrorDeleteTask))
      .toPromise();
    this.toastService.presentSuccess('Task deleted successfully');
    this.spinner.hide();
    // actualizar elementos
    this.getTask();
  };

  handleErrorDeleteTask = (error: any) => {
    this.spinner.hide();
    this.toastService.presentError('Innesperate error getting task');
    return throwError('Innesperate error getting task');
  };

  addTask = () => {
    this.router.navigate(['/home/detalle/new']);
  };

  changeOrder = (order: string) => {
    this.spinner.show();
    if (this.order === order) {
      this.deccending = !this.deccending;
    } else {
      this.order = order;
    }
    this.sortTask();
    this.spinner.hide();
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
