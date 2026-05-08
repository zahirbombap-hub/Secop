import { Hono } from "hono";
import type { Context } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import data from "./data.json";
import type { ApiResponse, Base, DataFile, Pregunta } from "./types";

type JsonStatus = 200 | 404 | 500;

interface BaseResumen {
  id: string;
  nombre: string;
  dataset_id: string;
  total_preguntas: number;
}

interface RootResponse {
  nombre: string;
  version: string;
  endpoints: string[];
}

interface BasesResponse {
  total: number;
  bases: BaseResumen[];
}

interface PreguntaConBase extends Pregunta {
  base_id: string;
  base_nombre: string;
}

interface StatsResponse {
  total_bases: number;
  total_preguntas: number;
  preguntas_por_tipo: Record<string, number>;
  preguntas_por_base: Record<string, number>;
}

const dataFile: DataFile = data;
const app = new Hono();

const applyCommonHeaders = (c: Context): void => {
  c.header("X-Powered-By", "Cloudflare Workers");
  c.header("X-Data-Source", dataFile.meta.fuente);
};

const jsonResponse = <T>(c: Context, payload: ApiResponse<T>["data"], status: JsonStatus = 200) => {
  return c.json(payload, status);
};

const jsonError = (c: Context, message: string, status: Exclude<JsonStatus, 200>) => {
  applyCommonHeaders(c);
  return jsonResponse(c, { error: message }, status);
};

const findBaseById = (id: string): Base | undefined => {
  return dataFile.bases.find((base) => base.id === id);
};

const findQuestionByNumber = (num: number): PreguntaConBase | undefined => {
  for (const base of dataFile.bases) {
    const pregunta = base.preguntas.find((item) => item.num === num);

    if (pregunta) {
      return {
        ...pregunta,
        base_id: base.id,
        base_nombre: base.nombre
      };
    }
  }

  return undefined;
};

const buildStats = (): StatsResponse => {
  const preguntas_por_tipo: Record<string, number> = {};
  const preguntas_por_base: Record<string, number> = {};

  for (const base of dataFile.bases) {
    preguntas_por_base[base.id] = base.preguntas.length;

    for (const pregunta of base.preguntas) {
      preguntas_por_tipo[pregunta.tipo_respuesta] = (preguntas_por_tipo[pregunta.tipo_respuesta] ?? 0) + 1;
    }
  }

  return {
    total_bases: dataFile.bases.length,
    total_preguntas: dataFile.bases.reduce((total, base) => total + base.preguntas.length, 0),
    preguntas_por_tipo,
    preguntas_por_base
  };
};

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET", "OPTIONS"]
  })
);

app.use("*", async (c, next) => {
  await next();
  applyCommonHeaders(c);
});

app.get("/", (c) => {
  const response: ApiResponse<RootResponse>["data"] = {
    nombre: "SECOP II API",
    version: dataFile.meta.version,
    endpoints: [
      "/api/bases",
      "/api/bases/:id",
      "/api/bases/:id/preguntas",
      "/api/preguntas/:num",
      "/api/stats"
    ]
  };

  return jsonResponse(c, response);
});

app.get("/api/bases", (c) => {
  const bases: BaseResumen[] = dataFile.bases.map(({ id, nombre, dataset_id, preguntas }) => ({
    id,
    nombre,
    dataset_id,
    total_preguntas: preguntas.length
  }));

  const response: ApiResponse<BasesResponse>["data"] = {
    total: bases.length,
    bases
  };

  return jsonResponse(c, response);
});

app.get("/api/bases/:id", (c) => {
  const id = c.req.param("id");
  const base = findBaseById(id);

  if (!base) {
    return jsonError(c, "Base no encontrada", 404);
  }

  const response: ApiResponse<Base>["data"] = base;
  return jsonResponse(c, response);
});

app.get("/api/bases/:id/preguntas", (c) => {
  const id = c.req.param("id");
  const categoria = c.req.query("categoria");
  const base = findBaseById(id);

  if (!base) {
    return jsonError(c, "Base no encontrada", 404);
  }

  const preguntas = categoria
    ? base.preguntas.filter((pregunta) => pregunta.categoria.toLowerCase() === categoria.toLowerCase())
    : base.preguntas;

  const response: ApiResponse<Pregunta[]>["data"] = preguntas;
  return jsonResponse(c, response);
});

app.get("/api/preguntas/:num", (c) => {
  const num = Number.parseInt(c.req.param("num"), 10);
  const pregunta = findQuestionByNumber(num);

  if (!pregunta) {
    return jsonError(c, "Pregunta no encontrada", 404);
  }

  const response: ApiResponse<PreguntaConBase>["data"] = pregunta;
  return jsonResponse(c, response);
});

app.get("/api/stats", (c) => {
  const response: ApiResponse<StatsResponse>["data"] = buildStats();
  return jsonResponse(c, response);
});

app.notFound((c) => {
  return jsonError(c, "Ruta no encontrada", 404);
});

app.onError((error, c) => {
  console.error("Error no controlado en la API:", error);
  return jsonError(c, "Error interno del servidor", 500);
});

export default app;

/*
# Raiz
curl http://localhost:8787/

# Todas las bases
curl http://localhost:8787/api/bases

# Base especifica
curl http://localhost:8787/api/bases/bd1

# Preguntas filtradas por categoria
curl "http://localhost:8787/api/bases/bd1/preguntas?categoria=estructura"

# Buscar pregunta por numero
curl http://localhost:8787/api/preguntas/3

# Estadisticas
curl http://localhost:8787/api/stats

# 404 esperado
curl http://localhost:8787/api/bases/bd99
*/
