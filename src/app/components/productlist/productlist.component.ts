import { Component, inject, OnInit } from '@angular/core';
import { ProductEffects } from '../../effects/product.effect';
import { ProductState } from '../../state/product.state';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent implements OnInit {

  private productEffects=inject(ProductEffects);
  public productState=inject(ProductState);
  products!: ProductState;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productEffects.loadProducts$().subscribe()
  }

  deleteProduct(productId: number) {
    this.productEffects.deleteProduct$(productId).subscribe();
  }

  
}
