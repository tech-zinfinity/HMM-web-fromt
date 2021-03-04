import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  registerTable(hotelId: string, tableNo: string, uid: string){
    return new Observable(obs =>{
      const headers = new HttpHeaders({
        'Accept':'application/octet-stream'
      });
      this.http.get(environment.apiurl+'/ops/registerTable/'+hotelId+'/'+tableNo+'/'+uid, {
        responseType: 'blob', headers: headers
      }).subscribe(data =>{
        console.log('data',data);
        
        saveAs(data,tableNo+'.png');
        obs.next(this.blobToFile(data,tableNo+'.png'));
        obs.complete();
      }, err=>{
        console.log(err);
        obs.next(false);
        obs.complete();
      });
    });
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    let b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    //return <File>theBlob;
    return new File([theBlob],fileName,
      {lastModified:b.lastModifiedDate, type:'images/png'});
  }

  registerTableQR(hotelId: string, tableNo: string, URL: string, uid: string){
    return this.http.get(environment.apiurl+'/ops/registerTableQR/'+hotelId
    +'/'+tableNo+'/'+URL+'/'+uid);
  }
}
