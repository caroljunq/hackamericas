import { NavController, Platform, ViewController, ModalController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { RegisterPage } from '../register/register';
import { ListPage } from '../list/list';

// declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  // query: string = '';
  places: any  = {
    searchPosition: [],
    originPosition:  [],
    destinationPosition: []
  };
  searchDisabled: boolean;
  // saveDisabled: boolean;
  location: any;

  directionsService: any;
  directionsDisplay: any;
  // originPosition: string = '';
  // destinationPosition: string = '';
  currentPosition: any;
  currentMarker: any;
  traceRoute: boolean = false;

  queries: any = {
    searchPosition: '',
    originPosition: '',
    destinationPosition: ''
  };

  coords_info: any = {
    searchPosition: {},
    originPosition: {},
    destinationPosition: {}
  };

  staticMarkers = [{
    lat: -23.469155,
    lng: -46.662832,
    name: "Av. Parada Pinto, 780 - Vila Nova Cachoeirinha, São Paulo - SP, 02611-002, Brasil"
  },
  {
    lat: -23.506998,
    lng: -46.672228,
    name: "Av. Casa Verde, 3472-3496 - Limão"
  },
  {
    lat: -23.494181,
    lng: -46.677680,
    name: "Av. Gaspar Vaz da Cunha, 64-128 - Vila Prado"
  }
];

currentPositionMarker: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
    this.searchDisabled = true;
    // this.saveDisabled = true;
  }

  ionViewDidLoad() {

    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;

      this.currentMarker = new google.maps.Marker({ map: this.maps.map});

      this.addStaticMarkers();
      this.showCurrentLocation();

      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.maps.map);
      // this.displayDirection(this.directionsService, this.directionsDisplay);
    });
  }



  // implementa dados estáticos (marcadores)
  addStaticMarkers(){
    for(let i = 0; i < this.staticMarkers.length; i++){
      let location = this.staticMarkers[i];
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: this.maps.map
      });
      google.maps.event.addListener(marker, 'click', () => {
        let historyModal = this.modalCtrl.create(ListPage);
        historyModal.present();
      });
    }
  }

  searchPlace(option) {
    // this.saveDisabled = true;

    if (this.queries[option].length > 0 && !this.searchDisabled) {

      let config = {
        types: ['geocode'],
        input: this.queries[option]
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

          this.places[option] = [];

          predictions.forEach((prediction) => {
            this.places[option].push(prediction);
          });
        }

      });

    } else {
      this.places[option] = [];
    }

  }

  selectPlace(place, option){
    this.places[option] = [];

    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {
      this.zone.run(() => {
        this.traceRoute = true;
        this.queries[option] = details.formatted_address;
        this.coords_info[option] = details;

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        // this.saveDisabled = false;

        let position = new google.maps.LatLng(location.lat, location.lng);

        if(option == 'searchPosition'){
          this.maps.map.setCenter({
            lat: location.lat,
            lng: location.lng
          });

          this.currentMarker.setPosition(position);
        }
        this.location = location;
      });
    });
  }

  getCurrentPosition(){
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          this.currentPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  clearSearchBar(){
    this.queries.searchPosition = '';
  }

  showCurrentLocation(){
    this.getCurrentPosition()
      .then((resp) =>{
        let position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let marker = new google.maps.Marker({
          position: position,
          map: this.maps.map,
          icon:'/../../assets/icon/gps-marker.png'
        });
        this.maps.map.setCenter(position);
        this.maps.map.setZoom(15);
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  displayDirection() {
    let origin = this.coords_info.originPosition;
    let destination = this.coords_info.destinationPosition;
    let directionsService = this.directionsService;
    let directionsDisplay  = this.directionsDisplay;
    directionsService.route({
      origin: new google.maps.LatLng(origin.geometry.location.lat(), origin.geometry.location.lng()),
      destination: new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()),
      travelMode: 'TRANSIT'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
    });
  }

  addAlert(){
    console.log("Alert added!");
    let registerModal = this.modalCtrl.create(RegisterPage);
    registerModal.present();
    // this.navCtrl.push(RegisterPage);
  }
}
