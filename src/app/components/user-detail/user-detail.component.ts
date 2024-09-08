import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { ProductEffects } from '../../effects/product.effect';
import { ProductState } from '../../state/product.state';
import { ProductStateModel } from '../../models/products.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  private productEffects = inject(ProductEffects);
  public productState = inject(ProductState);
  products:any;
  selectedUser!: ProductStateModel;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productEffects.loadProducts$().subscribe((res)=>{
      this.products=res;
    })
  }
  
  onSaveUser() {
    if (this.selectedUser) {
      this.productEffects.updateProduct$(this.selectedUser).subscribe({
        next: () => {
          alert('User updated successfully!');
        },
        error: (err: any) => {
          alert('Failed to update user.');
          console.error(err);
        }
      });
    }
  }

  // When a user is selected from the dropdown
  onUserSelect(event: Event) {
    const selectedUserId = +(event.target as HTMLSelectElement).value;
    this.selectedUser = this.products.find((user: { id: number; }) => user.id === selectedUserId) || null;
  }
}
