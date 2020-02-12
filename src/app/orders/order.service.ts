import { Order } from './order.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export class OrderService {
  ordersChanged = new Subject<Order[]>();

  constructor(private http: HttpClient, private router: Router){}


  allOrders;
  message;

  addOrder(orderData : Order){
  this.http
      .post(
        "http://localhost:3000/backend/neworder",{
          id: orderData.id,
          due_date: orderData.due_date,
          customer_name: orderData.customer_name,
          customer_address: orderData.customer_address,
          customer_phone: orderData.customer_phone,
          order_total: orderData.order_total
        }).subscribe(responseData => {
          console.log('When adding order ' + JSON.stringify(responseData));
          this.message = JSON.stringify(responseData);
        this.ordersChanged.next(this.message);
        this.router.navigate(["/orders"]);

      });

  }

  getOrders(){
    return this.http.get<{ message: string; orders: Order[] }>("http://localhost:3000/backend/getorders");
  }




}
