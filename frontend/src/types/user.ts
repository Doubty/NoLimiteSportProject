export type Address = {
    id: number;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
}

export type User = {
    id: number;
    endereco: Address;
    email: string;
    senha: string;
    nome: string;
    telefone_celular: string;
    telefone_fixo: string;
    cpt: string;
    sexo: string;
    data_nascimento: string;
    plano_saude: string;
    nivel: 1;
    tam_camisa: string;
    //grupo
}