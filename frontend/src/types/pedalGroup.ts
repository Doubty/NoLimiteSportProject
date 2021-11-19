export type pedalGroup = {
    id?: number;
    imgUrl?: string;
    nome: string;
}

export type getPedalGroups = {
    _embedded: {
      grupoPedals: pedalGroup[];
    }
}