export type PedalGroup = {
    id?: number;
    imgUrl?: string;
    nome: string;
}

export type GetPedalGroups = {
    _embedded: {
      grupoPedals: PedalGroup[];
    }
}