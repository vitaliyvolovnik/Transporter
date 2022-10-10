import {Injectable} from "@angular/core";
import {API_URL} from "@config/Constans";
import {HttpClient} from "@angular/common/http";
import {Credentials} from "@api/models/Credentials";
import {SecurityUser} from "@api/models/SecurityUser";


@Injectable({providedIn:'root'})
export class AuthHttpService {
  private readonly URL =`${API_URL}/auth`;

  constructor(private httpClient:HttpClient) {
  }


  login(credentials:Credentials){
      return this.httpClient.post<SecurityUser>(`${this.URL}/login`,credentials);
  }
  logout(){
    return this.httpClient.post(`${this.URL}/logout`,{responseType: 'text'});
  }

}
