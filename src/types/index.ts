export type ProductCategory = 'split' | 'window' | 'mobile' | 'cassette';
export type ProductBrand = 'daikin' | 'mitsubishi' | 'lg' | 'samsung';
export type ProductPower = 7000 | 9000 | 12000 | 18000;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  brand: ProductBrand;
  power: ProductPower;
  inStock: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateProductDto = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductDto = Partial<CreateProductDto>;

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Типы для аутентификации
export interface LoginRequest {
  email: string;    // изменено с username на email
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;    // уже было email, оставляем
  password: string;
}

export interface AuthResponse {
  access_token: string;  // изменено с token на access_token
  user: User;
}

// Типы для корзины (на бэкенде)
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

// export interface Cart {
//   id: string;
//   userId: string;
//   items: CartItem[];
//   total: number;
//   createdAt: string;
//   updatedAt: string;
// }

// Типы для заказов
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: string | number; // добавлено (сервер возвращает строку)
  status: OrderStatus;
  shippingAddress: string;      // изменено с address
  phone: string;
  paymentMethod: 'cash' | 'card' | 'online';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  shippingAddress: string;  // изменено с address
  phone: string;
  paymentMethod: 'cash' | 'card' | 'online';
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}

// Типы для пагинации
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type UpdateUserDto = Partial<Pick<User, 'username' | 'email' | 'role'>>;