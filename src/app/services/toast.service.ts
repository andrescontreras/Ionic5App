import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private previousSuccessMessage: string;
  private previousErrorMessage: string;
  private previousSuccessToast: HTMLIonToastElement;
  private previousErrorToast: HTMLIonToastElement;
  constructor(private toastController: ToastController) {}

  presentSuccess = async (message: string) => {
    if (this.previousSuccessMessage === message) {
      await this.previousSuccessToast.dismiss();
      await this.previousSuccessToast.present();
      return;
    }
    this.previousSuccessMessage = message;
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel'
        }
      ]
    } as ToastOptions);
    this.previousSuccessToast = toast;
    toast.onWillDismiss().then(() => (this.previousSuccessMessage = undefined));
    toast.present();
  };

  presentError = async (message: string) => {
    if (this.previousErrorMessage === message) {
      await this.previousErrorToast.dismiss();
      await this.previousErrorToast.present();
      return;
    }
    this.previousErrorMessage = message;
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    this.previousErrorToast = toast;
    toast.onWillDismiss().then(() => (this.previousErrorMessage = undefined));
    toast.present();
  };

  dissmissAll = async () => {
    while (await this.toastController.getTop()) {
      await this.toastController.dismiss();
    }
  };
}
