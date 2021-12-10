import { Injectable } from '@angular/core';
import { getDatabase, ref, push, serverTimestamp, update, query, get } from "firebase/database";
import { getAuth } from '@firebase/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly $ref = ref(getDatabase(), 'plants')
  url = 'https://art-of-bloom-default-rtdb.firebaseio.com/plants';
  private plantDetailsUrl = 'https://art-of-bloom-default-rtdb.firebaseio.com/plantDetails';


  constructor(private http: HttpClient) { }
  addProduct(data: any) {
    data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();
    data.user_id = getAuth().currentUser?.uid;
    return push(this.$ref, data);
  }
  addDetails(link: string, data: any) {
    const $ref = ref(getDatabase(), 'plantDetails')
    data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();
    data.user_id = getAuth().currentUser?.uid;
    return update($ref, { [link]: data });
  }


  getList() {
    return this.http.get<any>(this.url + '.json')
  }

  getPlant(id: string) {
    return this.http.get<any>(this.url + '/' + id + '.json')
  }

  getPlantDetails(id: string) {
    return this.http.get<any>(this.plantDetailsUrl + '/' + id + '.json');
  }

}
