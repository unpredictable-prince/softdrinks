export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'READONLY';
  is_active: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: number;
  product_id?: number;
  bottle_size: string;
  sku: string;
  mrp: number | string;
  selling_price: number | string;
  cost_price?: number | string;
  reorder_threshold?: number;
  is_active: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category?: 'CARBONATED' | 'DAIRY' | string;
  flavour: string;
  description?: string;
  image_url?: string;
  is_featured: boolean;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  variants: ProductVariant[];
  created_at?: string;
  updated_at?: string;
}

export interface Stockist {
  id: number;
  business_name?: string;
  contact_name: string;
  phone: string;
  address?: string;
  city: string;
  state: string;
}

export interface Customer {
  id: number;
  customer_type: 'RETAILER' | 'DISTRIBUTOR' | 'DIRECT_CONSUMER';
  business_name?: string;
  contact_name: string;
  phone: string;
  email?: string;
  gstin?: string;
  address?: string;
  city: string;
  state: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: number;
  contact_name: string;
  business_name?: string;
  phone: string;
  email?: string;
  city: string;
  enquiry_type: string;
  estimated_demand?: string;
  message?: string;
  source_channel: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED' | 'SPAM';
  follow_up_at?: string;
  assigned_user_id?: number;
  converted_customer_id?: number;
  converted_sale_id?: number;
  created_at: string;
  updated_at: string;
}

export interface SaleItem {
  id?: number;
  product_variant_id: number;
  product_name_snapshot?: string;
  variant_snapshot?: string;
  quantity: number;
  unit_price: number | string;
  discount_amount: number | string;
  tax_amount: number | string;
  line_total?: number | string;
  cost_price_snapshot?: number | string;
}

export interface PaymentAllocation {
  id: number;
  payment_id: number;
  sale_id: number;
  allocated_amount: number | string;
  payment_reference?: string;
  payment_method?: string;
  payment_date?: string;
  status?: string;
  created_at?: string;
}

export interface Sale {
  id: number;
  sale_number: string;
  customer_id: number;
  customer_name?: string;
  customer_business?: string;
  sale_date: string;
  source_channel: string;
  status: 'DRAFT' | 'CONFIRMED' | 'FULFILLED' | 'CANCELLED';
  subtotal: number | string;
  discount_amount: number | string;
  tax_amount: number | string;
  total_amount: number | string;
  total_paid: number | string;
  outstanding_balance: number | string;
  notes?: string;
  items?: SaleItem[];
  allocations?: PaymentAllocation[];
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  payment_reference: string;
  payment_method: 'CASH' | 'UPI' | 'BANK_TRANSFER' | 'CHEQUE';
  amount: number | string;
  status: 'PENDING' | 'VERIFIED' | 'FAILED' | 'REFUNDED';
  transaction_reference?: string;
  payment_date: string;
  recorded_by?: number;
  notes?: string;
  allocations?: PaymentAllocation[];
  created_at: string;
}

export interface InventoryBalance {
  id: number;
  location_id: number;
  location_name?: string;
  product_variant_id: number;
  product_name?: string;
  bottle_size?: string;
  sku?: string;
  quantity_on_hand: number;
  quantity_reserved: number;
  reorder_threshold: number;
  is_low_stock: boolean;
  updated_at: string;
}

export interface InventoryMovement {
  id: number;
  location_id: number;
  location_name?: string;
  product_variant_id: number;
  product_name?: string;
  sku?: string;
  quantity_delta: number;
  movement_type: string;
  reference_type?: string;
  reference_id?: number;
  reason: string;
  created_by?: number;
  created_at: string;
}

export interface DashboardMetrics {
  gross_sales: number | string;
  discounts_given: number | string;
  net_sales: number | string;
  payments_received: number | string;
  outstanding_balances: number | string;
  total_units_sold: number;
  estimated_gross_profit: number | string;
  open_enquiries_count: number;
  converted_enquiries_count: number;
  conversion_rate_percentage: number;
  low_stock_items_count: number;
  top_flavours: {
    flavour: string;
    units_sold: number;
    gross_revenue: number | string;
  }[];
  sales_by_channel: {
    channel: string;
    order_count: number;
    total_sales: number | string;
  }[];
}
