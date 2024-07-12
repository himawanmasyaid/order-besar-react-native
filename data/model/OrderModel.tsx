
export interface Order {
    created_at: string
    customer_name: string
    total_products: number
    total_price: string
    id: string
  }
  
  export interface OrderModel {
    page: number
    limit: number
    total: number
    list: Order[]
  }