import {createSelector} from '@ngrx/store';
import {CarState} from '../state/car.state';
import {AppState} from '../state/app.state';

const selectCars = (state: AppState) => state.cars;

export const selectCarList = createSelector(
  selectCars,
  (state: CarState) => state.cars
);

export const selectSelectedCar = createSelector(
  selectCars,
  (state: CarState) => state.selectedCar
);