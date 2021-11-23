export type SportEvent = {
    id?: number;
    bannerUrl: string;
    titulo: string;
    descricao: string;
    dataSaida: string;
    dataRetorno: string;
    localConcentracao: string;
    destino: string;
    qtdVagas: number;
    ritmo: string;
    tipoEvento: string;
    infoComplementar: string;
    valor: number;
    //patrocinadores
}

export type Subscription = {
    id?: number;
    ciclista: string;
    dataPagamento: string;
    estaCancelada: boolean;
    estaConfirmada: boolean;
    eventoId: number;
    tipoPagamento: string;
    termoUrl: string;
}