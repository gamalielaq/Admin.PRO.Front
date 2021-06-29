import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/back/services/usuario.service';
import Swal from 'sweetalert2';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  // saulo.aq9656@gmail.com

  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember: [true]
  });

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    // this.router.navigateByUrl('/');
    this._usuarioService.login(this.loginForm.value).subscribe(res => {
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value)
      } else {
        localStorage.removeItem('email');
      }
      
      this._router.navigateByUrl('/')

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp () {
    this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;
    this.attachSignin( document.getElementById('my-signin2'));
  };

  attachSignin( element ) {
    this.auth2.attachClickHandler(element, {},
       ( googleUser ) => {
        var id_token = googleUser.getAuthResponse().id_token;
        
        this._usuarioService.loginGoogle(id_token).subscribe( resp => {
          //navegar al dashboard

          this._ngZone.run( () => {
            this._router.navigateByUrl('/')
          })
        });
        
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
