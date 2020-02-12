import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  addOrderForm: FormGroup;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.addOrderForm = new FormGroup({
      id: new FormControl('', {
        validators: [Validators.required]
      }),
      due_date: new FormControl('', { validators: [Validators.required] }),
      customer_name: new FormControl('', { validators: [Validators.required] }),
      customer_address: new FormControl('', { validators: [Validators.required] }),
      customer_phone: new FormControl('', { validators: [Validators.required] }),
      order_total: new FormControl('', { validators: [Validators.required] })
    });
  }



  onSubmit(){
      this.orderService.addOrder({
        id: this.addOrderForm.value.id,
        due_date: this.addOrderForm.value.due_date,
        customer_name: this.addOrderForm.value.customer_name,
        customer_address: this.addOrderForm.value.customer_address,
        customer_phone: this.addOrderForm.value.customer_phone,
        order_total: this.addOrderForm.value.order_total
      });
  }

}
