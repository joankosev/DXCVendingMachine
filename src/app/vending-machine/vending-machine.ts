import { Component, Input } from '@angular/core';
import { VendingMachineService } from '../vending-machine.service';
import { VendingMachineEntry } from '../typing';
import { CommonModule } from '@angular/common';
import { CentsToEuroPipe } from '../cents-to-euros-pipe';

type AcceptedCoins = 1 | 2 | 5 | 10 | 20 | 50 | 100 | 200;

@Component({
  selector: 'app-vending-machine',
  imports: [CommonModule, CentsToEuroPipe],
  templateUrl: './vending-machine.html',
  styleUrl: './vending-machine.css',
})
export class VendingMachine {
  public coins: AcceptedCoins[] = [1, 2, 5, 10, 20, 50, 100, 200];
  @Input() public inventory = new Map<number, VendingMachineEntry>();
  public selectedProductId: number | null = null;

  public credit: number = 0;
  public change: number = 0;
  public errorMessage = "";

  constructor(private vendingMachineService: VendingMachineService) {}

  public ngOnInit() {
    this.inventory = this.vendingMachineService.getInitialProducts();
  }

  public insertCoin(coin: AcceptedCoins): void {
    this.credit += coin;
  }

  public buyProduct(): void {
    if (!this.selectedProductId) {
      this.errorMessage = "Please select a product!";
      return;
    }

    const entry = this.inventory.get(this.selectedProductId);

    if (!entry) {
      this.errorMessage = "Invalid product!";
      return;
    }

    if (entry.quantity === 0) {
      this.errorMessage = "Out of stock!";
      return;
    }

    if (this.credit < entry.product.price) {
      this.errorMessage = "Please insert more coins!";
      return;
    }

    this.credit -= entry.product.price;

    entry.quantity -= 1;
    this.inventory.set(this.selectedProductId, entry);
    this.returnChange();
    this.errorMessage = "";
    this.selectedProductId = null;
  }

  public selectProduct(productId: number): void {
    this.selectedProductId = productId;
  }

  public returnChange(): void {
    if (this.credit === 0) {
      this.errorMessage = "No change to return!";
      return;
    }

    this.change = this.credit;
    this.credit = 0;
  }

  public get entries() {
    return Array.from(this.inventory.entries()).map(([id, entry]) => ({
      id,
      product: entry.product,
      quantity: entry.quantity,
      price: entry.product.price,
    }));
  }
}
