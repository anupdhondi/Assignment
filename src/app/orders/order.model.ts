export interface Order {
  id: string;
  due_date: Date;
  customer_name: string;
  customer_address: string;
  customer_phone: number;
  order_total: number;
}
