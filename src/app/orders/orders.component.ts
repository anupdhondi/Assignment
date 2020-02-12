import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

import { Order } from './order.model';
import { OrderService } from './order.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns = ['id', 'due_date', 'customer_name', 'customer_address', 'customer_phone', 'order_total'];
  dataSource = new MatTableDataSource<Order>();
  ordersSubscription: Subscription;


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  openDialog() {



    const dialogRef = this.dialog.open(AddOrderComponent);

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('order added successfully');
        } else {
          console.log('could not add order');
        }
      });



  }

  ngOnInit() {

    this.orderService.getOrders().subscribe(response => {
      this.dataSource.data = response.orders;
    });

    this.ordersSubscription = this.orderService.ordersChanged.subscribe(
      order => {
        if (order) {
          this.orderService.getOrders().subscribe(response => {
            this.dataSource.data = response.orders;
          });
        } else {
          console.log('No orders');
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


}
