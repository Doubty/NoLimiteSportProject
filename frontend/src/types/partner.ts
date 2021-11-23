export type Address = {
    id?: number;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
}

export type SocialMidia = {
    id?: number;
    link: string;
    nome: string;
}

export type Partner = {
    id?: number;
    endereco: Address;
    redeSocialList: SocialMidia[];
    nome: string;
    email: string;
    telefone: string;
    url_banner?: string;
}