export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  }
  
  export interface ProductStateModel {
    products: any;
    id: number;
    name: string;
    username: string;
    email: string;
    website:string;
    address: Address;
    loading: boolean;
    error: string | null;
  }

  