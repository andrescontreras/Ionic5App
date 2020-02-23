import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingElement: HTMLIonLoadingElement;
  constructor(private loadingController: LoadingController) {}
  private presenting = false;

  private triggerLoadingModal = new Subject<boolean>();
  triggerLoadingModal$ = this.triggerLoadingModal.asObservable();

  present() {
    if (!this.presenting) {
      // this.loadingElement = await this.loadingController.create();
      // await this.loadingElement.present();
      this.triggerLoadingModal.next(true);
      this.presenting = true;
    }
  }

  dismiss() {
    if (this.presenting) {
      // await this.loadingElement.dismiss();
      this.triggerLoadingModal.next(false);
      this.presenting = false;
      // delete this.loadingElement;
    }
  }
}
