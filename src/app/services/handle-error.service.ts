import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const NO_AUTENTICADO = 401;
const ERROR_NO_MANEJADO = 500;
const NO_INTERNET = 0;
const MENSAJE_NO_AUTENTICADO =
  'No esta autenticado o su sesión ha expirado. Por favor vuelva a iniciar sesión';
const MENSAJE_NO_MANEJADO = 'Ha ocurrido un error inesperado';
const MENSAJE_NO_INTERNET =
  'Error al realizar su petición. Por favor verifique su conexion a internet';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
  constructor(
    private authService: AuthService // private modalService: NgbModal,
  ) // private spinner: NgxSpinnerService
  {}

  interceptError(err: any) {
    //this.spinner.hide();
    if (err.status === NO_AUTENTICADO) {
      this.openModal(MENSAJE_NO_AUTENTICADO);
    } else if (err.status === ERROR_NO_MANEJADO) {
      this.openModal(MENSAJE_NO_MANEJADO);
    } else if (err.status === NO_INTERNET) {
      this.openModal(MENSAJE_NO_INTERNET);
    }
  }

  openModal(mensaje) {
    // const modalRef = this.modalService.open(ModalComponent, {
    //   backdrop: 'static'
    // });
    // modalRef.componentInstance.descripcion = mensaje;
    // modalRef.result.then(result => {
    //   if (mensaje === MENSAJE_NO_AUTENTICADO) {
    //     this.authService.setIsLoggedIn(false);
    //   }
    // });
  }
}
