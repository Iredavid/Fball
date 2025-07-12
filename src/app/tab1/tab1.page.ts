import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { IonHeader,IonButton,IonMenu, MenuController , IonAvatar, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Filesystem  } from '@capacitor/filesystem'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader,IonButton,IonMenu,IonAvatar, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,BaseChartDirective],
  
})

export class Tab1Page {

profile=signal<any>(null);
constructor() {}

@ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  ngAfterViewInit() {
    Chart.register(...registerables);
    
    new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['W', 'L', 'D'],
        datasets: [{
          label: 'My Dataset',
          data: [-5, 6, 3],
          backgroundColor: ['red', 'blue', 'yellow']
        }]
      }
    });
  }

photo(){
const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera
  });

  // image.webPath will contain a path that can be set as an image src
  const imageUrl =`data:image/jpeg;base64,${image.base64String}`;
  
  // Can be set to the src of an image element
   const profile = signal(imageUrl);
    console.log(profile());
     const imagelement = document.getElementById('myImage') as HTMLImageElement;

     if (imagelement) {
       imagelement.src = imageUrl;
     }
    
};
 
  takePicture()
}

imgPic(){

  console.log('hutgfg');
  const takePicture = async () => {
    try {
      const image = await Camera.pickImages({
        quality: 90,
        limit: 1,
      });

      image.photos.forEach(async (photo, index) => {
        try {
          // Use webPath and convert it to a readable path
          const filePath = photo.webPath;
          
          // Read the file using the webPath
          const file = await Filesystem.readFile({
            path: filePath
          });
          
          console.log('File data:', file.data);
        } catch (fileError) {
          console.error('Error reading file:', fileError);
        }
      });
    } catch (error) {
      console.error('Error picking images:', error);
    }
  };
  takePicture();

}
}
