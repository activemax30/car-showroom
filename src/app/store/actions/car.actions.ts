import {Action} from '@ngrx/store';
import {Car} from '../../models/car';


export enum ECarActions {
  GetCars = '[Car] Get Cars',
  GetCarsSuccess = '[Car] Get Cars Success',
  GetCar = '[Car] Get Car',
  GetCarSuccess = '[Car] Get Car Success'
}

export class GetCars implements Action{
  public readonly type = ECarActions.GetCars;
}

export class GetCarsSuccess implements Action{
  public readonly type = ECarActions.GetCarsSuccess;
  constructor(public payload: Car[]) {}
}

export class GetCar implements Action{
  public readonly type = ECarActions.GetCar;
  constructor(public payload: number) {}
}

export class GetCarSuccess implements Action{
  public readonly type = ECarActions.GetCarSuccess;
  constructor(public payload: Car) {}
}

export type CarActions = GetCars | GetCarsSuccess | GetCar | GetCarSuccess;