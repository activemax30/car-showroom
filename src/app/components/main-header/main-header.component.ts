import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map, switchMap} from 'rxjs/operators';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import {Observable, of} from 'rxjs';

import {Car} from '../../models/car';
import {AuthGuardService} from '../../guards/auth-guard.service';
import {AddCarModalComponent} from '../add-car-modal/add-car-modal.component';
import {CarService} from '../../services/car.service';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {AddCar, GetCars, GetCarsCount} from '../../store/actions/car.actions';
import {selectFavCarsList} from '../../store/selectors/favorite.selectors';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {

  favCars$ = this.store.pipe(select(selectFavCarsList));
  faStarRegular = regularStar;


  constructor(public readonly router: Router,
              private authService: AuthGuardService,
              public dialog: MatDialog,
              private favoriteService: FavoritesService,
              private service: CarService,
              private helperService: HelperService,
              private store: Store<AppState>) {
  }


  ngOnInit(): void {
    // this.favCars$ = this.favoriteService.getFavoriteCars();
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          this.store.dispatch(new AddCar(result));
          this.store.dispatch(new GetCarsCount());
          this.helperService.updateCarsList();
          return of();
        }
      })
    ).subscribe();
  }


  logOut(): void {
    this.authService.logOut();
  }

}
