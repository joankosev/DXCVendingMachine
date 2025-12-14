import { Component } from '@angular/core';
import { ManagerVendingMachine } from './manager-vending-machine/manager-vending-machine';

@Component({
  selector: 'app-root',
  imports: [ManagerVendingMachine],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
