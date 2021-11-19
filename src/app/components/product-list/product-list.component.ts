import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Database } from "@etherio/database"
import { AxiosProvider } from "@etherio/database/lib/providers/AxiosProvider"
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  db!: Database

  constructor(private product: ProductService, private database: DatabaseService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.database.ref('plants').list().then((collection) => {
      this.products = collection.toArray().map((doc) => doc.toJSON())
    })
  }

  getOrderList() {
    this.database.ref('plants').list().then((collection) => {
      this.products = collection.toArray()
    })
    return
    this.product.getProducts().then((data) => {
      this.products = Object.entries(data.val()).map(([id, value]: [string, any]) => {

        value.items.forEach((item: any) => {
        });
        return {
          id, ...value
        }
      }).reverse();
      console.log(this.products);

    });

  }
}
