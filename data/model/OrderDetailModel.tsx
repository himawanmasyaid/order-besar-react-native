
export interface OrderDetailModel {
    id: string
    customer_name: string
    products: ProductOrderDetail[]
  }
  
  export interface ProductOrderDetail {
    quantity: number
    product_price: number
    product_id: number
  }
  