import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Configuration {
    
    // public server = 'https://itmcloud.org/oecs/datasearch/public/oecs';//not required as we are using proxy
    public server = 'http://localhost/oecs/tldp/public/oecs';//not required as we are using proxy
    
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
    public domainName = "https://itmcloud.org/oecs/";
}


