import { InputType } from '../enums/input-type.enum';

export class Field {
  constructor(
    public title: string = '',
    public value: string | number = '',
    public atribute: string = '',
    public inputmode: InputType = InputType.text,
    public disabled: boolean = false,
    public specificData?: SpecificData
  ) {}
}
export class SpecificData {
  constructor(public selectOptions: ObjectId[] = []) {}
}

export class ObjectId {
  constructor(public id: string | number = '', public value: string = '') {}
}
