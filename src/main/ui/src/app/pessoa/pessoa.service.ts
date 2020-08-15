import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pessoa} from '../model/pessoa';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {


  apiUrl = 'http://localhost:8080/api/pessoas';

  constructor(protected http: HttpClient) {
  }

  create(pessoa: Pessoa): Observable<any> {
    return this.http.post<any>(this.apiUrl, pessoa, {observe: 'response'});
  }

  getAll(): Observable<any> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

}
