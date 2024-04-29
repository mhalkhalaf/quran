import { Component, OnInit } from '@angular/core';
import { QuranService } from './quran.service';
import { Observable, Subscription, combineLatestWith, forkJoin, map } from 'rxjs';
import { IQuran } from './quran';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ISurah } from './ISurah';

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [FormsModule,CommonModule,QuranComponent,ReactiveFormsModule],
  templateUrl: './quran.component.html',
  styleUrl: './quran.component.css',
  providers: [QuranService]
})

export class QuranComponent implements OnInit {
  // حقن السيرفس في الباني
  constructor(private quranService : QuranService){
    // استدعاء تابع يولد الارقام بعدد آيات سورة البقرة اكبر عدد للآيات
    this.AyahNumbers();
  }
  obs! : Subscription
  Surahs$! : Observable<ISurah[]>
  quran! : IQuran ;
  search! :FormGroup;
  ngOnInit(): void {
    // جلب اسماء السور
    this.Surahs$ = this.quranService.Surahs$
    // جلب البيانات من الواجهة 
    this.search = new FormGroup ({
      chapter : new FormControl(),
      verse : new FormControl(),
      text : new FormControl()
    })}
    // تابع لعرض البيانات
    MySearch(){
       this.obs = forkJoin({
         first : this.quranService.getAyah$(this.search.value.chapter,this.search.value.verse),
         second: this.quranService.interpretationEn$(this.search.value.chapter,this.search.value.verse),
         third : this.quranService.interpretationAr$(this.search.value.chapter,this.search.value.verse),
       })
       .subscribe(
           {
             next(value) {
              // عرض البيانات على الواجهة
               document.getElementById('Ayah')!.innerText = value.first.text,
               document.getElementById('En')!.innerText = value.second.text,
               document.getElementById('Ar')!.innerText = value.third.text 
             },
             error(err) {
              // عرض شاشة منبثقة في حال حدوث خطأ
               alert("رقم الآية المحدد يتجاوز عدد آيات السورة")
             },
           }
         )
     }    

// تعريف رقم الآيات
ayahs : number[] = [];
AyahNumbers(){
  for (let i = 1; i <= 286; i++) {
    this.ayahs.push(i);
  }
}
}
