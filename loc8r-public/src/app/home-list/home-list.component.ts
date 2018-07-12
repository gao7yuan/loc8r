import { Component, OnInit } from '@angular/core';

export class Location {
  _id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor() { }

  locations: Location[] = [{
    _id: '5b2bee771c765775c8e3d0fd',
    name: 'Caffe Ladro',
    distance: 10000,
    address: '400 Fairview Ave N, Seattle, WA',
    rating: 4,
    facilities: ['hot drinks', 'food', 'power']
  }, {
    _id: '5b2b3bc7c9be76510946bb87',
    name: 'Hodgepodge cafe',
    distance: 2000000,
    address: '6016 Bothell Way NE suite j, Kenmore, WA',
    rating: 5,
    facilities: ['hot drinks', 'food', 'wifi']
  }];

  ngOnInit() {
  }

}
