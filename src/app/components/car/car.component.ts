import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';

import {FavoritesService} from '../../services/favorites.service';
import {Car} from '../../models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input() car: Car;
  @Input() isFavorite: boolean;
  faStarSolid = solidStar;
  faStarRegular = regularStar;

  constructor(private readonly router: Router,
              private favoriteService: FavoritesService) {
  }

  addingFavoriteSub: Subscription;

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  addFavorite(car): void {
    this.addingFavoriteSub = this.favoriteService.addFavorite(car).subscribe(result => {
      console.log(result);
    });
  }

}
