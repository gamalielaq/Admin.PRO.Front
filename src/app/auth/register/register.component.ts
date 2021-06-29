import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/back/services/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Gamaliel', [Validators.required, Validators.minLength(3)]],
    email: ['gamaliel.aq96@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
    password2: ['12345', [Validators.required]],
    terminos: [true, [Validators.required]]
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    //Registrar usuario
    this._usuarioService.crearUsuario(this.registerForm.value).subscribe(res => {
      this._router.navigateByUrl('/')
    }, (err => {
      Swal.fire('Error', err.error.msg, 'error')
    }));
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }
  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }


}
