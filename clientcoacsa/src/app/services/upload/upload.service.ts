import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  makeFileRequest(
    url: string,
    files: Array<File>,
    name: string
  ) {
    return new Promise((resolve, reject) => {
      const formData = new FormData(); //Tipo de dato
      const xhr = new XMLHttpRequest(); //Instancia para peticiones http
      for (const file of files) {
        formData.append(name, file, file.name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
    //Ejecutabdo primero:: alistando
      xhr.open('POST', url, true);
      //Enviando petición
      xhr.send(formData);
    });
  }
}
