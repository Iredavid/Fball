import { Component } from '@angular/core';
import { IonHeader,IonSegment,IonSegmentButton,IonSegmentView,IonSegmentContent,IonAvatar,IonAccordionGroup,IonAccordion,IonLabel,IonList,IonItem,IonIcon,IonMenu,IonButton, IonMenuToggle, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { bookmarkOutline, bookmark, starHalfOutline } from 'ionicons/icons';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader,IonSegment,IonSegmentButton,IonSegmentView,IonSegmentContent,IonAvatar,IonAccordionGroup,IonAccordion,IonLabel,IonList,IonIcon,IonItem,IonButton, IonMenu,IonMenuToggle,IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {
  constructor() {
    addIcons({bookmarkOutline,bookmark})
  }

  iconAn(){
   const iconElement =    document.querySelector('.save-icon')

       const currentName = iconElement?.getAttribute('name');
    
    if (currentName?.includes('-outline')) {
        // Change to filled version
        const filledName = currentName.replace('-outline', '');
        iconElement?.setAttribute('name', filledName);
        iconElement?.classList.add('saved'); // Add your color class
    } else {
        // Change back to outline version
        const outlineName = currentName + '-outline';
        iconElement?.setAttribute('name', outlineName);
        iconElement?.classList.remove('saved'); // Remove color class
    }
  }
}
