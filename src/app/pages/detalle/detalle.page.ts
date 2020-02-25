import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Field, ObjectId } from 'src/app/models/field';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { InputType } from 'src/app/enums/input-type.enum';
import { Status } from 'src/app/enums/status.enum';
import { Priority } from 'src/app/enums/priority.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss']
})
export class DetallePage implements OnInit {
  taskId: any;
  task: Task;
  fields: Field[];
  updateFields = 0;
  priority: ObjectId[] = [
    { id: Priority.Low, value: 'Low' },
    { id: Priority.Medium, value: 'Medium' },
    { id: Priority.High, value: 'High' }
  ];
  status: ObjectId[] = [
    { id: Status[Status.pending], value: 'Pending' },
    { id: Status[Status.overdue], value: 'Overdue' },
    { id: Status[Status.finished], value: 'Finished' }
  ];
  users: ObjectId[] = [];
  setFields = () => {
    this.fields = [
      new Field('Name', this.task.name, 'name'),
      new Field('Status', this.task.status, 'status', InputType.select, false, { selectOptions: this.status }),
      new Field('User', this.task.user, 'user', InputType.select, true, { selectOptions: this.users }),
      new Field('Due Date', this.task.due_date, 'due_date', InputType.date),
      new Field('Priority', this.task.priority, 'priority', InputType.select, false, { selectOptions: this.priority }),
      new Field('Created', this.task.created, 'created', InputType.date),
      new Field('Realization Date', this.task.realization_date, 'realization_date', InputType.date, true)
    ];
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private toastService: ToastService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getTask();
  }

  getTask = async () => {
    this.spinner.show();
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.taskId === 'new') {
      this.defaultData();
    } else {
      const response = await this.taskService
        .getTaskById(this.taskId)
        .pipe(catchError(this.handleErrorGetTask))
        .toPromise();
      this.task = response.body;
    }
    await this.getUsers();
    await this.setFields();
    this.spinner.hide();
  };

  handleErrorGetTask = (error: any) => {
    this.spinner.hide();
    this.toastService.presentError('Innesperate error getting task');
    return throwError('Innesperate error getting task');
  };

  saveData = async () => {
    this.task.realization_date = new Date(this.task.realization_date).toISOString();
    this.spinner.show();
    if (this.taskId !== 'new') {
      this.validateData();
      const response = await this.taskService
        .putTask(this.task)
        .pipe(catchError(this.handleErrorPostTask))
        .toPromise();
    } else {
      this.validateData();
      const response = await this.taskService
        .postTask(this.task)
        .pipe(catchError(this.handleErrorPostTask))
        .toPromise();
    }
    this.toastService.presentSuccess('Task updated successfully');
    this.spinner.hide();
  };

  validateData = () => {
    if (this.task.status !== Status[Status.overdue] && new Date(this.task.due_date) < new Date()) {
      this.toastService.presentError('The current status of task is now Overdue');
      this.task.status = Status[Status.overdue];
      this.updateFieldsF();
    }
    if (this.task.status === Status[Status.finished]) {
      this.task.realization_date = new Date().toISOString();
      this.updateFieldsF();
    }
  };

  handleErrorPostTask = (error: any) => {
    this.spinner.hide();
    this.toastService.presentError('Innesperate error saving task');
    return throwError('Innesperate error saving task');
  };

  getUsers = async () => {
    const response = await this.userService
      .getUser()
      .pipe(catchError(this.handleErrorGetUser))
      .toPromise();
    this.users = response.body.map(u => new ObjectId(u.pk, u.username));
  };

  handleErrorGetUser = (error: any) => {
    this.spinner.hide();
    this.toastService.presentError('Innesperate error getting the users');
    return throwError('Innesperate error getting the users');
  };

  defaultData = async () => {
    const user = await this.userService.getCurrentUser().then();
    this.task = new Task(
      '',
      '',
      Status[Status.pending],
      user.pk,
      '',
      Priority.Low,
      new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/'),
      new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/')
    );
  };

  updateFieldsF = () => {
    this.updateFields = Math.random();
  };
}
