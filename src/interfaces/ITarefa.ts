import IProjeto from "@/interfaces/IProjeto";

export default interface ITarefa {
    duracaoEmSegundos: number;
    descricao: string;
    projeto: IProjeto;
}
