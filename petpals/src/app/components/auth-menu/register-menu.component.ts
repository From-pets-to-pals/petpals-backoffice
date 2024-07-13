import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-auth-menu',
  standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        NgClass
    ],
  templateUrl: './register-menu.component.html',
  styleUrl: './register-menu.component.css'
})
export class RegisterMenuComponent implements OnInit {

    constructor(private router: Router) {}

    isActive(route: string): boolean {
        return this.router.url === route;
    }

    ngOnInit(): void {
        this.router.navigate(['register-menu/create-owner']);

    }
}
