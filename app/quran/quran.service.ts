import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { ISurah } from "./ISurah";
import { IQuran } from "./quran";

// حقن السيرفس في الجذر لاستخدامها في اي مكان في الشمروع
@Injectable({
    providedIn: 'root'
})

// تعريف السيرفس
export class QuranService {
  //HttpClient حقن الـ 
    constructor(private httpClient : HttpClient) {
    }
//API جلب الآية من الـ 
   getAyah$(chapter:number ,verse:number ): Observable<IQuran>{
     return this.httpClient.get<IQuran>(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranindopak/${chapter}/${verse}.json`)
   }
   //API جلب التفسير باللغة الانجليزية من الـ 
   interpretationEn$(chapter:number ,verse:number ): Observable<IQuran>{
    return this.httpClient.get<IQuran>(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdelhaleem/${chapter}/${verse}.json`)
  }
  //API جلب التفسير باللغة العربية من الـ 
  interpretationAr$(chapter:number ,verse:number ): Observable<IQuran>{
    return this.httpClient.get<IQuran>(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafsir-muyassar/${chapter}/${verse}.json`)
  }
  //json جلب اسماء السور من ملف 
Surahs$ = this.httpClient.get<ISurah[]>('app/quran/surahs.json')
}
