import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginReq } from '../model/login';
import { AuthService } from '../service/auth.service';
import 'oauthio-web';
import { DataService } from '../service/data.service';
import { Home } from '../model/home';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { JwtHelperService } from "@auth0/angular-jwt";

declare var OAuth: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  data: LoginReq = new LoginReq();
  @ViewChild('Email') Email!: HTMLFormElement;
  @ViewChild('Password') Password!: HTMLFormElement;

  jwtHelper = new JwtHelperService();

  headerData: Home = new Home();

  constructor(private _router: Router, private _authService: AuthService,
    private _dataService: DataService,
    private socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {

    this._dataService.get().subscribe(res => {
      this.headerData = res.Data;
      let loader = document.getElementById('page-loader');
      loader.style.display = 'none';
    });
  }

  login() {
    this._authService.login(this.data)
      .subscribe(res => {
        localStorage.setItem('role', 'USER');
        localStorage.setItem('sID', res.Data?.SessionId);
        localStorage.setItem('username', res.Data?.Profile?.Name?.toString());
        localStorage.setItem('email', res.Data?.Profile?.Email?.toString());
        this._router.navigate(['/']);
      }, er => { });
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.socialAuthService.authState.subscribe((res: SocialUser) => {
          let token = res.authToken;
          let idToken = res.idToken;
          let authorizationCode = res.authorizationCode;
          debugger;
          this._authService.googleLogin({ GoogleTokenId: idToken })
            .subscribe(backRes => {
              debugger;
              localStorage.setItem('role', 'USER');
              localStorage.setItem('username', res.name);
              localStorage.setItem('email', res.email);
              localStorage.setItem('sID', backRes.Data?.SessionId);
              this._router.navigate(['/']);
            });
        });
      });
  }

  loginWithApple() {
    OAuth.initialize('ZJfyNpNP11T5DONziSXfhkd1DkU'); // public key
    OAuth.popup('apple').then((res: any) => {
      res.me(['firstname', 'lastname', 'email']);
      console.log('result:', res.access_token);
    });
  }

  async signInWithApple() {
    const CLIENT_ID = "com.anashandpan.App"
    const REDIRECT_API_URL = "https://dev.anashandpan.com/"
    window.open(
      `https://appleid.apple.com/auth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_API_URL)}&response_type=code id_token&scope=name email&response_mode=form_post&usePopup=true`,
      'mozillaWindow', 'left=100,top=100,width=420,height=420'
    );

    window.addEventListener('message', async event => {
      const decodedToken = this.jwtHelper.decodeToken(event.data.id_token);
      let requestData: any = {};
      if (event.data.user) {
        const userName = JSON.parse(event.data.user);
        requestData = {
          email: decodedToken.email,
          name: `${userName.name.firstName} ${userName.name.lastName}`,
          socialId: decodedToken.sub,
        };
      } else {
        requestData = {
          email: decodedToken.email,
          socialId: decodedToken.sub,
          name: decodedToken.email
        };
      }
      console.log(`User Data : ${requestData}`);
      this._authService.appleLogin({
        AppleTokenId: event.data?.id_token,
        Name: requestData?.name
      })
        .subscribe(backRes => {
          debugger;
          localStorage.setItem('role', 'USER');
          localStorage.setItem('username', requestData?.name);
          localStorage.setItem('email', requestData?.email);
          localStorage.setItem('sID', backRes.Data?.SessionId);
          this._router.navigate(['/']);
        });
    });
  };

}
