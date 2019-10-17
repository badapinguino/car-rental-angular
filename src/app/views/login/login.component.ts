import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {CustomButtonProperties} from '../../_template/custom-button-properties';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  loginButtonProperties: CustomButtonProperties = {
    testo: 'Login',
    buttonTypeBootstrap: 'btn-success',
    disabled: this.loading
  };

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      codiceFiscale: ['BDGDNL97C12F704S', Validators.required], // DA CAMBIARE CON ''
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/homePage';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.codiceFiscale.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // data = JSON.parse(data + '');
          // console.log(data);
          console.log(data);
          if (data != null && data.jwt != null) {
            this.authenticationService.impostaUtenteLocalStorage(this.f.codiceFiscale.value).subscribe(
              utente => {console.log(utente);
                         this.router.navigate([this.returnUrl]);
              }
            );
          } else if (data.error) {
            this.error = data.error;
            this.loading = false;
            this.authenticationService.logout();
          } else if (data.length === 0 || data === undefined || data === null) {
            this.error = 'Codice fiscale o password sbagliate';
            this.loading = false;
            this.authenticationService.logout();
          }/* else if (data[0].codiceFiscale === this.f.codiceFiscale.value && data[0].password_utente === this.f.password.value) {
            this.router.navigate([this.returnUrl]);
          }*/ else {
            this.error = 'Codice fiscale o password sbagliate';
            this.loading = false;
            this.authenticationService.logout();
          }
        },
        error => {
          this.error = error + 'Codice fiscale o password sbagliati.';
          this.loading = false;
        });
  }
}
