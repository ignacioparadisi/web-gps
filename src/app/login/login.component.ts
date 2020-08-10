import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthGuard } from 'src/resources/auth-guard';
import { UserService } from 'src/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Mensajes de error para validar el email y la contraseña.
   */
  public validationMessages = {
    email: [],
    password: []
  };
  /**
   * Formulario a ser mostrado.
   */
  public loginForm: FormGroup;
  public hidePassword = true;
  /**
   * Variable privada para guardar el valor de inicio de sesión cargando.
   * Esta variable solo puede ser asignada desde la funcion `set isLoading(isLoading: boolean)`
   */
  private _isLoading = false;
  /**
   * Al momento de asignar el valor de carga a la variable publica, se actualiza el UI.
   */
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    this.updateUI(isLoading);
  }
  /**
   * Se retorna el valor que esta guardado en la variable privada.
   */
  get isLoading(): boolean { return this._isLoading };

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { 
      this.loginForm = new FormGroup({
        email: new FormControl({ value: '', disabled: false }, [Validators.email, Validators.required]),
        password: new FormControl({ value: '', disabled: false }, [Validators.required])
      });
    }

  ngOnInit() {
  }

  /**
   * Muestra la vista para hacer el registro de usuario.
   */
  async presentSignUpModal() {
    console.log('CREAR CUENTA');
    const dialogRef = this.dialog.open(RegisterComponent, {
      maxWidth: '700px'
    });
  }

  /**
   * Presenta una alerta de error
   */
  async presentErrorAlert(error) {
    var message = '';
    if (error.status == 404) {
      message = 'El correo o la contraseña son inválidos.';
    } else {
      message = 'Hugo un error al conectarse con el servidor.';
    }
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000
    });
  }

  /**
   * Ejecuta el login del usuario enviando el correo y la contraseña al servidor.
   */
  login() {
    this.clearValidationMessages();
    this.validateFields();
    if (this.loginForm.valid) {
      const user = {
        id: null,
        email: null
      };
      const authInfo = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };
      this.isLoading = true;
      this.userService.login(authInfo).subscribe((response) => {
        console.log(response);
        user.email = response.email;
        user.id = response.id;
        AuthGuard.saveUser(user);
        this.isLoading = false;
        this.router.navigate(['/routes']);
      }, error => {
        console.log(error);
        this.isLoading = false;
        this.presentErrorAlert(error);
      });
    }
  }

  /**
   * Actualiza la UI para habilitar o deshabilitar los campos de texto.
   * @param isLoading Define si el login está haciendo el request al servidor o no.
   */
  private updateUI(isLoading: boolean) {
    if (isLoading) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  /**
   * Limpia los mensajes de error.
   */
  private clearValidationMessages() {
    this.validationMessages.email = [];
    this.validationMessages.password = [];
  }

  /**
   * Valida que los campos tengan información válida.
   */
  private validateFields() {
    this.validateEmailField();
    this.validatePasswordField();
  }

  /**
   * Valida la información que contiene el campo de email.
   */
  private validateEmailField() {
    const emailErrors = this.loginForm.get('email').errors;
    console.log(emailErrors);
    if (emailErrors) {
      if (emailErrors.required) {
        this.validationMessages.email.push('El correo electrónico es obligatorio.');
      }
      if (emailErrors.email) {
        this.validationMessages.email.push('El formato del correo electrónico no es válido.');
      }
    }
  }

  /**
   * Valida la información que contiene el campo de contraseña.
   */
  private validatePasswordField() {
    const passwordErrors = this.loginForm.get('password').errors;
    console.log(passwordErrors);
    if (passwordErrors) {
      if (passwordErrors.required) {
        this.validationMessages.password.push('La contraseña es obligatoria.');
      }
    }
  }

}
