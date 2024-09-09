import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  template: ` <h1 class="text-center text-4xl p-6">Template blocks</h1>
    <div class="flex flex-row w-full justify-center"><mat-icon>code_blocks</mat-icon></div>
    <p class="py-5">
      Some simple examples showing different template blocks in angular. These include &#64;defer,
      &#64;placeholder, &#64;loading ,&#64;error, and &#64;let
    </p>
    <ul class="text-center">
      <li>
        <a routerLink="/basic-defer">1. Basic Defer</a>
      </li>
    </ul>`,
})
export class LandingComponent {}
