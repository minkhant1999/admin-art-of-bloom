import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
})
export class AddProductDetailsComponent implements OnInit {
  formGroup: FormGroup;
  id: string;
  link: string;
  constructor(private product: ProductService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      body: ['', [Validators.required]],
      co2: ['', [Validators.required]],
      light: ['', [Validators.required]],
      type: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      images: ['', []],
    });

    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.product.getPlant(id).subscribe((data) => {
        console.log(data);
        this.formGroup.get('name')?.setValue(data.name)
        this.link = data.link
        this.product.getPlantDetails(this.link).subscribe(data => {
          if (!data) return
          data.name && this.formGroup.get('name')?.setValue(data.name)
          data.body && this.formGroup.get('body')?.setValue(data.body)
          data.co2 && this.formGroup.get('co2')?.setValue(data.co2)
          data.light && this.formGroup.get('light')?.setValue(data.light)
          data.type && this.formGroup.get('type')?.setValue(data.type)
          data.rate && this.formGroup.get('rate')?.setValue(data.rate)
          data.images && this.formGroup.get('images')?.setValue(data.images)

        })
      })
    })
  }

  add() {
    if (!this.formGroup.valid) {
      return alert('Invalid')
    }
    this.product.addDetails(this.link, this.formGroup.value).then(() =>
      alert('Success')
    ).catch(
      e => alert('Error')
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
