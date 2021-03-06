export type Product = {
    id?: number;
    img_url?: string;
    nome: string;
    preco: number;
    descricao: string;
}

export type GetProducts = {
    _embedded: {
      products: Product[];
    }
}