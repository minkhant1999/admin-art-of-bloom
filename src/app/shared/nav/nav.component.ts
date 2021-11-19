import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menuItems = [
    { title: 'Products', path: '/product-list' },
    { title: 'Add Product', path: '/add-product' },
    { title: 'Orders', path: '/orders' }
  ]

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  openNav(nav: HTMLDivElement) {
    nav.classList.remove('opacity-0', 'scale-0')
    nav.classList.add('opacity-100', 'scale-100')
  }

  closeNav(nav: HTMLDivElement) {
    nav.classList.add('opacity-0', 'scale-0')
    nav.classList.remove('opacity-100', 'scale-100')
  }

  logout() {
    return this.authService.signOut().then(() => {
      this.router.navigate(['/login'])
    });
  }
}
