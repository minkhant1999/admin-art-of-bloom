import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  formGroup!: FormGroup;
  id: string;

  constructor(private product: ProductService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      link: ['', [Validators.required]],
      image: ['', [Validators.required]],
    })
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.reloadData()
    })
  }

  reloadData() {
    this.product.getPlant(this.id).subscribe(data => {
      this.formGroup.get("name").setValue(data.name)
      this.formGroup.get("price").setValue(data.price)
      this.formGroup.get("link").setValue(data.link)
      this.formGroup.get("image").setValue(data.image)

    })
  }
  update() {
    if (!this.formGroup.dirty) return alert('Please change something!');
    this.product.updatePlant(this.id, this.formGroup.value).then(() =>
      this.router.navigate(['/product-list']))
  }
}
