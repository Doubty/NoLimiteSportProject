export type Address = {
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
}

export type User = {
    id?: number;
    endereco?: Address;
    email: string;
    senha: string;
    nome: string;
    telefoneCelular: string;
    telefoneFixo: string;
    cpf: string;
    sexo: string;
    dataNascimento: string;
    tipoSanquineo: string;
    planoSaude: string;
    nivel: number;
    temCamisa: string;
    groupPedal: number;
}