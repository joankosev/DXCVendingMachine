import { Injectable } from '@angular/core';
import { Product } from './typing';
import { VendingMachineEntry } from './typing';

export const MAX_INVENTORY_SIZE_PER_PRODUCT = 15;

@Injectable({
  providedIn: 'root',
})
export class VendingMachineService {
  public getInitialProducts(): Map<number, VendingMachineEntry> {
    const data = new Map([
      [1, { product: new Product(1, "Cheetos", 300), quantity: 1 }],
      [2, { product: new Product(2, "Chio", 280), quantity: 3 }],
      [3, { product: new Product(3, "Pringles", 350), quantity: 5 }],
      [4, { product: new Product(4, "Lays", 300), quantity: 10 }],
      [5, { product: new Product(5, "Fanta", 190), quantity: 10 }],
      [6, { product: new Product(6, "Cola", 190), quantity: 10 }],
      [7, { product: new Product(7, "Sprite", 190), quantity: 10 }],
      [8, { product: new Product(8, "Devin", 110), quantity: 10 }],
      [9, { product: new Product(9, "Mars", 210), quantity: 10 }],
      [10, { product: new Product(10, "Twix", 210), quantity: 10 }],
      [11, { product: new Product(11, "Snickers", 210), quantity: 10 }],
      [12, { product: new Product(12, "Bounty", 210), quantity: 10 }],
    ]);

    this.validate(data);

    return data;
  }

  private validate(data: Map<number, VendingMachineEntry>) {
    for (const [id, entry] of data) {
      if (entry.quantity > MAX_INVENTORY_SIZE_PER_PRODUCT) {
        throw new Error(`Product ${id} exceeds max inventory of ${MAX_INVENTORY_SIZE_PER_PRODUCT}`);
      }
    }
  }
}
