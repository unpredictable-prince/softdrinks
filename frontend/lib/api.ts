import {
  Product,
  Customer,
  Stockist,
  Enquiry,
  Sale,
  Payment,
  InventoryBalance,
  InventoryMovement,
  DashboardMetrics,
  User,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('fizzora_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = 'Request failed';
    try {
      const errorJson = await response.json();
      errorDetail = errorJson.detail || errorDetail;
    } catch {
      errorDetail = await response.text();
    }
    throw new Error(errorDetail);
  }

  return response.json();
}

export const api = {
  // Public
  getPublicProducts: (featured?: boolean, category?: string) => {
    const params = new URLSearchParams();
    if (featured !== undefined) params.append('featured', String(featured));
    if (category) params.append('category', category);
    const q = params.toString() ? `?${params.toString()}` : '';
    return request<Product[]>(`/products${q}`);
  },
  getPublicProductBySlug: (slug: string) => {
    return request<Product>(`/products/detail/${slug}`);
  },
  getPublicStockists: (city?: string) => {
    const q = city && city !== 'All' ? `?city=${encodeURIComponent(city)}` : '';
    return request<Stockist[]>(`/customers/stockists/public${q}`);
  },
  submitPublicEnquiry: (data: {
    contact_name: string;
    business_name?: string;
    phone: string;
    email?: string;
    city: string;
    enquiry_type: string;
    estimated_demand?: string;
    message?: string;
  }) => {
    return request<Enquiry>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Auth
  login: async (email: string, password: string) => {
    const data = await request<{ access_token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('fizzora_token', data.access_token);
      localStorage.setItem('fizzora_user', JSON.stringify(data.user));
    }
    return data;
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fizzora_token');
      localStorage.removeItem('fizzora_user');
    }
  },
  getCurrentUser: () => request<User>('/auth/me'),

  // Products
  getAdminProducts: () => request<Product[]>('/products/admin/all'),
  createProduct: (productData: any) =>
    request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
  updateProduct: (id: number, productData: any) =>
    request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),
  addVariant: (productId: number, variantData: any) =>
    request<any>(`/products/${productId}/variants`, {
      method: 'POST',
      body: JSON.stringify(variantData),
    }),

  // Customers
  getCustomers: (params?: { type?: string; city?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set('customer_type', params.type);
    if (params?.city) searchParams.set('city', params.city);
    if (params?.search) searchParams.set('search', params.search);
    const qs = searchParams.toString();
    return request<Customer[]>(`/customers${qs ? `?${qs}` : ''}`);
  },
  createCustomer: (customerData: any) =>
    request<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    }),

  // Enquiries
  getEnquiries: (status?: string) => {
    const q = status ? `?status=${status}` : '';
    return request<Enquiry[]>(`/enquiries${q}`);
  },
  updateEnquiryStatus: (id: number, data: { status: string; notes?: string; follow_up_at?: string }) =>
    request<Enquiry>(`/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  convertEnquiry: (id: number, data: { customer_type: string; gstin?: string; address?: string }) =>
    request<Customer>(`/enquiries/${id}/convert`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Sales
  getSales: (status?: string) => {
    const q = status ? `?status=${status}` : '';
    return request<Sale[]>(`/sales${q}`);
  },
  getSaleDetail: (id: number) => request<Sale>(`/sales/${id}`),
  createSale: (saleData: any) =>
    request<Sale>('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    }),
  confirmSale: (id: number) =>
    request<Sale>(`/sales/${id}/confirm`, {
      method: 'POST',
    }),
  cancelSale: (id: number) =>
    request<Sale>(`/sales/${id}/cancel`, {
      method: 'POST',
    }),

  // Payments
  getPayments: () => request<Payment[]>('/payments'),
  recordPayment: (paymentData: any) =>
    request<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),
  verifyPayment: (id: number, status: string) =>
    request<Payment>(`/payments/${id}/verify`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Inventory
  getInventoryBalances: (lowStockOnly?: boolean) => {
    const q = lowStockOnly ? '?low_stock_only=true' : '';
    return request<InventoryBalance[]>(`/inventory/balances${q}`);
  },
  getInventoryMovements: () => request<InventoryMovement[]>('/inventory/movements'),
  adjustInventory: (movementData: {
    location_id: number;
    product_variant_id: number;
    quantity_delta: number;
    movement_type: string;
    reason: string;
  }) =>
    request<InventoryBalance>('/inventory/adjust', {
      method: 'POST',
      body: JSON.stringify(movementData),
    }),
  getInventoryLocations: () => request<any[]>('/inventory/locations'),

  // Reports
  getDashboardMetrics: () => request<DashboardMetrics>('/reports/dashboard'),
  getSalesCsvUrl: () => `${API_BASE_URL}/reports/sales-csv`,
  getInventoryCsvUrl: () => `${API_BASE_URL}/reports/inventory-csv`,
};
