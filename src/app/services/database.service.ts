import { Injectable } from '@angular/core';
import { Database } from '@etherio/database';
import { AxiosProvider } from '@etherio/database/lib/providers/AxiosProvider';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: Database
  private databaseUrl = 'https://art-of-bloom-default-rtdb.firebaseio.com'

  constructor(auth: AuthService) {
    auth.getIdToken()?.then(token => {
      this.db = new Database(new AxiosProvider(this.databaseUrl, token))
    })
  }

  ref(path: string) {
    return this.db.ref(path);
  }
}
