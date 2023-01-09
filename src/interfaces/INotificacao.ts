export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO
}

export default interface INotificacao {
    titulo: string;
    text: string;
    tipo: TipoNotificacao;
    id: number;
}
