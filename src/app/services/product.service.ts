import { Injectable } from '@angular/core';
import { getDatabase, ref, push, serverTimestamp, orderByKey, query, get } from "firebase/database";
import { getAuth } from '@firebase/auth';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly $ref = ref(getDatabase(), 'plants')
  url = 'https://art-of-bloom-default-rtdb.firebaseio.com/plants.json';
  private plantDetailsUrl = 'https://art-of-bloom-default-rtdb.firebaseio.com/plantDetails';


  constructor(private http: HttpClient) { }
  addProduct(data: any) {
    data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();
    data.user_id = getAuth().currentUser?.uid;
    return push(this.$ref, data);
  }

  getProducts() {
    let q = query(this.$ref, orderByKey());
    return get(q);
  }

  getList() {
    return this.http.get<any>(this.url)
  }

  getPlantDetails(id: string) {
    return this.http.get<any>(this.plantDetailsUrl + '/' + id + '.json');
  }

}
