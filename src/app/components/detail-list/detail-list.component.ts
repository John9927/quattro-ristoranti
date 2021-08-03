import { GetDataService } from 'src/app/services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.scss']
})
export class DetailListComponent implements OnInit {
  title: any;
  response: any;

  totaleServizio: any;
  totaleMenu: any;
  totalePrezzo: any;
  totaleLocation: any;

  allData: any;

  constructor(private getDataService: GetDataService) { }

  ngOnInit(): void {
    this.title = this.getDataService.title;
    this.getLists();
    this.totale();
  }

  getLists() {
    return this.getDataService.getListDetail(this.title).subscribe(data => {
      data.map(res => {
        this.response = res;
        this.getDataService.location.push(this.response.location);
        this.getDataService.prezzo.push(this.response.prezzo);
        this.getDataService.menu.push(this.response.menu);
        this.getDataService.servizio.push(this.response.servizio);
      })
    })
  }

  totale() {
    setTimeout(() => {
      var totalLocation = this.getDataService.location;
      var totalServizio = this.getDataService.location;
      var totalPrezzo = this.getDataService.location;
      var totalMenu = this.getDataService.location;

      if (totalLocation.length > 1) {
        this.totaleLocation = this.getDataService.location.reduce((a: number, b: number) => +a + +b, 0);
      } else {
        this.totaleLocation = this.getDataService.location;
      }

      if (totalServizio.length > 1) {
        this.totaleServizio = this.getDataService.servizio.reduce((a: number, b: number) => +a + +b, 0);
      } else {
        this.totaleServizio = this.getDataService.servizio
      }

      if (totalPrezzo.length > 1) {
        this.totalePrezzo = this.getDataService.prezzo.reduce((a: number, b: number) => +a + +b, 0);
      } else {
        this.totalePrezzo = this.getDataService.prezzo;
      }

      if (totalMenu.length > 1) {
        this.totaleMenu = this.getDataService.menu.reduce((a: number, b: number) => +a + +b, 0);
      } else {
        this.totaleMenu = this.getDataService.menu;
      }

      this.allData = +this.totaleLocation + +this.totaleMenu + +this.totalePrezzo + +this.totaleServizio;
      console.log(this.allData);


      this.getDataService.location = [];
      this.getDataService.prezzo = [];
      this.getDataService.menu = [];
      this.getDataService.servizio = [];
    }, 1000);
  }
}

