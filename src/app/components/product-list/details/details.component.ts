import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  name = '';
  body = '';
  images: string[] = [];
  type = ''
  rate = ''
  light = ''
  co2 = ''
  error = '';
  constructor(private route: ActivatedRoute, private product: ProductService, private database: DatabaseService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params.name;
      this.error = '';
      this.database.ref('plantDetails').child(id).list().then((collection: any) => {
        this.name = collection.data.name
        this.images = collection.data.images || [];
        this.body = collection.data.body
        this.rate = collection.data.rate
        this.light = collection.data.light
        this.co2 = collection.data.co2
      })
      // .then(data) => {
      //   if (!data) {
      //     this.error = 'Not Found'
      //     return
      //   }
      //   this.name = data.name;
      //   this.body = data.body;
      //   this.images = data.images || [];
      //   this.type = data.type;
      //   this.rate = data.rate;
      //   this.light = data.light;
      //   this.co2 = data.co2;
      // })
    })
  }

}
