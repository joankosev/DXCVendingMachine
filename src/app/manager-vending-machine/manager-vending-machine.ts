import { Component, ViewChild } from '@angular/core';
import { Product } from '../typing';
import { VendingMachine } from '../vending-machine/vending-machine';
import { MAX_INVENTORY_SIZE_PER_PRODUCT } from '../vending-machine.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-vending-machine',
  imports: [VendingMachine, FormsModule, CommonModule ],
  templateUrl: './manager-vending-machine.html',
  styleUrl: './manager-vending-machine.css',
})
export class ManagerVendingMachine {
  @ViewChild(VendingMachine) private vendingMachine!: VendingMachine;
  public errorMessage = '';

  private addProduct(product: Product, quantity: number) {
    if (quantity > MAX_INVENTORY_SIZE_PER_PRODUCT) {
      this.errorMessage = 
        `Product exceeds max inventory of ${MAX_INVENTORY_SIZE_PER_PRODUCT}`;
      return;
    }

    if (this.vendingMachine.inventory.has(product.id)) {
      this.errorMessage = "Product already exists!";
      return;
    }

    this.vendingMachine.inventory.set(product.id, { product, quantity });
  }


  private parseEuroInputToCents(input: unknown): number {
    if (typeof input === 'number') {
      return Math.round(input * 100);
    }

    if (typeof input !== 'string') {
      return NaN;
    }

    const normalized = input
      .replace('€', '')
      .replace(',', '.')
      .trim();

    const value = Number(normalized);

    if (Number.isNaN(value)) {
      return NaN;
    }

    return Math.round(value * 100);
  }

  private deleteProduct(id: number) {
    if (!this.vendingMachine.inventory.has(id)) {
      this.errorMessage = "Product does not exist!";
      return;
    }
    this.vendingMachine.inventory.delete(id);
  }

  public submitAddProductForm(
    id: number,
    name: string,
    price: string,
    quantity: number
  ): void {
    const priceParsed = this.parseEuroInputToCents(price);
    const numbers = [id, priceParsed, quantity];
    if (numbers.some(Number.isNaN) || name === '') {
      this.errorMessage = "Invalid form!";
      return;
    }
    this.addProduct(
      new Product(Number(id), name, Number(priceParsed)), Number(quantity));
  }

  public submitUpdateProductForm(
    id: number,
    name: string,
    price: string,
    quantity: number
  ): void {
    const priceParsed = this.parseEuroInputToCents(price);
    const numbers = [id, priceParsed, quantity];
    if (numbers.some(Number.isNaN) || name === '') {
      this.errorMessage = "Invalid form!";
      return;
    }
    this.deleteProduct(id);
    this.addProduct(
      new Product(Number(id), name, Number(priceParsed)), Number(quantity));
  }

  public submitDeleteForm(id: number): void {
    if (isNaN(id)) {
      this.errorMessage = "Invalid form!";
      return;
    }
    this.deleteProduct(id);
  }
}
