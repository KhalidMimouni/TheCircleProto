import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Stream} from '../app/models/stream.model'
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, mergeMap, take } from 'rxjs/operators';
import { Chat } from './models/chat.model';
import { Byte } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class StreamserviceService {

  apiURL = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };

  getRecomendedStreams(): Observable<Stream[]> {
    return this.http
      .get<Stream[]>(this.apiURL + '/stream/recommended')
      .pipe();
  }


  postChat(chat : Chat): void {
    this.signMessage(chat.Message!).then((signature) => {
      console.log(signature)
      console.log(chat)
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'signature' : signature
        }),
      };
    
      this.http.post<Chat>(this.apiURL + '/stream/' + chat.UserIdTo + "/chat", chat, httpOptions).subscribe(e => console.log(e))
    })
  }

  async signMessage(data : String){
    const privKeyString = localStorage.getItem('privkey');
    console.log(privKeyString)
    //PEM formaat van keys strippen
    function pemToArrayBuffer(pem : String) {
      console.log(pem)
      let b64 = pem.replaceAll("\r\n", "")
      b64 = b64.replace("-----BEGIN PUBLIC KEY-----", "");
      b64 = b64.replace("-----END PUBLIC KEY-----", "");
      b64 = b64.replace("-----BEGIN PRIVATE KEY-----", "");
      b64 = b64.replace("-----END PRIVATE KEY-----", "");
      b64 = b64.replaceAll(" ", "");
      console.log(b64)
      return base64ToByteArray(b64);
    }
    function base64ToByteArray(base64String : any) {
      let a = Buffer.from(base64String, "base64");
      return a
    }
    function byteArrayToBase64(byteArray : ArrayBuffer) {
      return Buffer.from(byteArray).toString("base64")
    }
    //Base64 Keys naar ArrayBuffer formaat voor JavaScript's SubtleCrypto implementatie
    const privKeyArray = pemToArrayBuffer(privKeyString!);
    console.log(privKeyArray)
    //ArrayBuffer naar CryptoKey 
    let privCryptoKey = await crypto.subtle.importKey("pkcs8", privKeyArray, { name: "RSA-PSS", hash: "SHA-256" }, true, ["sign"]);
    //Encoden:
    console.log(privCryptoKey)
    
    let signature = await crypto.subtle.sign({name: "RSA-PSS", saltLength: 32}, privCryptoKey, new TextEncoder().encode(data.toString()))
    //Signature als Base64 String voor in header:
    let base64String = byteArrayToBase64(signature);
    return base64String
  }
}
