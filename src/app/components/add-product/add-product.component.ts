import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
export interface Product {
  name: string;
  price: string;
  link: string;
  image: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private product: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      link: ['', [Validators.required]],
      image: ['', [Validators.required]],
    })
  }

  add() {
    if (!this.formGroup.valid) {
      return alert('Invalid')
    }
    this.product.addProduct(this.formGroup.value).then(() =>
      alert('Success')
    ).catch((e) =>
      console.log(e, 'Error')
    )
  }

  uploadImage(e: any) {
    let file = e.target.files[0];
    let storageRef = ref(getStorage(), Date.now() + '-' + file.name);

    uploadBytes(storageRef, file).then((result) => {
      getDownloadURL(result.ref).then((url) => {
        this.formGroup.get('image')?.setValue(url);
      });
    })
  }
}
