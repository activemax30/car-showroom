import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerEmulatorService {

  carList = [
    {
      name: 'Toyota Supra',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'I’ve always been asked, ‘What is my favorite car?’ and I’ve always said ‘The next one.’',
      year: '2020'
    },
    {
      name: 'Toyota Supra',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'I’ve always been asked, ‘What is my favorite car?’ and I’ve always said ‘The next one.’',
      year: '2020'
    },
    {
      name: 'Toyota Supra',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'I’ve always been asked, ‘What is my favorite car?’ and I’ve always said ‘The next one.’',
      year: '2020'
    },
    {
      name: 'Toyota Supra',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'I’ve always been asked, ‘What is my favorite car?’ and I’ve always said ‘The next one.’',
      year: '2020'
    },
    {
      name: 'Toyota Supra',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'I’ve always been asked, ‘What is my favorite car?’ and I’ve always said ‘The next one.’',
      year: '2020'
    }
  ];

  constructor() { }

  getCarList() {
    return this.carList;
  }
}
