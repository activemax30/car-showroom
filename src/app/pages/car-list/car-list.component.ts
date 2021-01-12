import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of, Subscription, zip} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectCarList, selectCarsAmount} from '../../store/selectors/car.selector';
import {GetCars, GetCarsCount} from '../../store/actions/car.actions';
import {GetRangeFrom, GetRangeTo} from '../../store/actions/range.actions';
import {selectRangeFrom} from '../../store/selectors/range.selectors';
import {selectFavCarsList} from '../../store/selectors/favorite.selectors';
import {GetFavCarList} from '../../store/actions/favorite.actions';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private readonly router: Router,
              private service: CarService,
              private favService: FavoritesService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
  ) {
  }

  sCars$ = this.store.pipe(select(selectCarList));
  favCars$ = this.store.pipe(select(selectFavCarsList));
  cars$: Observable<Car[]>;
  carsAmount$ = this.store.pipe(select(selectCarsAmount));
  currentPage$: Observable<number>;
  helperSub: Subscription;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.store.dispatch(new GetCarsCount());
    // this.store.dispatch(new GetFavCarList());
    this.currentPage$ = this.store.pipe(select(selectRangeFrom)).pipe(map(data => data / 4));
    this.helperService.updateCarsList();

    this.combineCarsLists();

    this.helperSub = this.helperService.onCarsListUpdate().subscribe(() => {
      this.combineCarsLists();
    });

    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );

    this.subscriptions.push(this.helperSub);

  }

  combineCarsLists(): void {
    this.store.dispatch(new GetCars());

    this.cars$ = zip(
      this.sCars$.pipe(map(cars => cars.map(car => ({...car})))),
      this.favCars$,
      // this.favService.getFavoriteCars()
    ).pipe(map(([cars, favoriteCars]) => {
      (cars).map(car => {
        favoriteCars.map(favoriteCar => {
          if (car.id === favoriteCar.id) {
            car.favorite = true;
          }
        });
      });
      return cars;
    }));
  }

  onPageEvent($event): void {
    const from = (4 * $event.pageIndex);
    const to = 4 * ($event.pageIndex + 1);

    this.store.dispatch(new GetRangeFrom(from));
    this.store.dispatch(new GetRangeTo(to));
    this.helperService.updateCarsList();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
