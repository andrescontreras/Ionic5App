import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public selectedIndex = 0;
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
    }
    // {
    //   title: 'Archived',
    //   url: '/home//folder/Archived',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Trash',
    //   url: '/home/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  public labels = ['Loguot', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
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
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(
    //     page => page.title.toLowerCase() === path.toLowerCase()
    //   );
    // }
  }

  account() {
    // this.router.navigate(['home/account']);
  }
}
