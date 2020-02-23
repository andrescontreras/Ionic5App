export class Task {
  constructor(
    public name: string = '',
    public status: string = '',
    public user: string = '',
    public dueDate: string = '',
    public priority: string = ''
  ) {}
}
