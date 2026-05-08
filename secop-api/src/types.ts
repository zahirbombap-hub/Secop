export type TipoRespuesta = "numero" | "texto" | "fecha" | "lista" | "estadistica";

export interface Pregunta {
  num: number;
  categoria: string;
  pregunta: string;
  respuesta: string;
  valor_numerico: number | null;
  tipo_respuesta: TipoRespuesta;
}

export interface Base {
  id: string;
  nombre: string;
  dataset_id: string;
  url_fuente: string;
  total_preguntas: number;
  preguntas: Pregunta[];
}

export interface DataFile {
  meta: {
    version: string;
    fuente: string;
    ultima_actualizacion: string;
  };
  bases: Base[];
}

export interface ApiResponse<T> {
  data: T;
}
