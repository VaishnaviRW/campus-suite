import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({selector:'app-root',templateUrl:'./app.component.html',styleUrls:['./app.component.css']})
export class AppComponent {
  menuOpen = false;
  currentUrl = '';
  constructor(public auth: AuthService, public router: Router) {
    this.currentUrl = router.url;
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e:any) => { this.currentUrl=e.urlAfterRedirects; this.menuOpen=false; });
  }
  get showShell(): boolean { return this.auth.isLoggedIn() && !this.currentUrl.startsWith('/login') && !this.currentUrl.startsWith('/signup'); }
  get userName(): string { return this.auth.getCurrentUser()?.name || 'User'; }
  get userRole(): string { return this.auth.getCurrentUser()?.role || 'member'; }
  logout(): void { this.auth.logout(); this.router.navigate(['/login']); }
  closeMenu(): void { this.menuOpen=false; }
}
