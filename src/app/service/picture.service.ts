import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from "@angular/fire/storage";


@Injectable({
  providedIn: 'root'
})
export class PictureService {
  constructor() { }

  async uploadPicture(id: string, file: File): Promise<string> {
    let extension = file.name.split('.').pop();
    let imgRef = ref(getStorage(), `${id}.${extension}`);
    let result = await uploadBytes(imgRef, file, { contentType: file.type });
    return getDownloadURL(result.ref);
  }
}
