export class Task {
  constructor(
    public pk: string = '',
    public name: string = '',
    public status: string = '',
    public user: string = '',
    public due_date: string = '',
    public priority: number | string = 0,
    public created: string = '',
    public realization_date: string = ''
  ) {}
}
