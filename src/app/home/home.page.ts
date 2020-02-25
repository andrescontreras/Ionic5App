import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public selectedIndex = 0;
  public username;
  public appPages = [
    {
      title: 'Pending',
      url: '/home/listado/pending',
      icon: 'mail'
    },
    {
      title: 'Overdue',
      url: '/home/listado/overdue',
      icon: 'paper-plane'
    },
    {
      title: 'Finished',
      url: '/home/listado/finished',
      icon: 'heart'
    },
    {
      title: 'Edit Account',
      url: '/home/account',
      icon: 'archive'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    this.username = await this.userService.getCurrentUser();
    console.log(this.username);
  }
}
