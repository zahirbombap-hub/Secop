import type { DataFile } from "./types";

type DashboardMeta = DataFile["meta"];

export const renderDashboardPage = (meta: DashboardMeta): string => {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SECOP II Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        color-scheme: light;
        --bg: #f4efe8;
        --bg-accent: #fdf8f1;
        --panel: rgba(255, 251, 245, 0.82);
        --panel-strong: rgba(255, 255, 255, 0.95);
        --border: rgba(84, 56, 33, 0.14);
        --ink: #1b1713;
        --ink-soft: #65594f;
        --brand: #0f766e;
        --brand-deep: #115e59;
        --highlight: #c46a2d;
        --highlight-soft: rgba(196, 106, 45, 0.14);
        --shadow: 0 22px 60px rgba(60, 37, 18, 0.12);
        --radius-xl: 28px;
        --radius-lg: 20px;
        --radius-md: 16px;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "IBM Plex Sans", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(15, 118, 110, 0.16), transparent 32%),
          radial-gradient(circle at top right, rgba(196, 106, 45, 0.18), transparent 28%),
          linear-gradient(160deg, #efe4d6 0%, #f7f2ea 48%, #efe8dc 100%);
      }

      body::before,
      body::after {
        content: "";
        position: fixed;
        inset: auto;
        width: 32rem;
        height: 32rem;
        border-radius: 999px;
        filter: blur(80px);
        opacity: 0.5;
        pointer-events: none;
        z-index: 0;
      }

      body::before {
        top: -8rem;
        right: -8rem;
        background: rgba(15, 118, 110, 0.18);
      }

      body::after {
        bottom: -10rem;
        left: -6rem;
        background: rgba(196, 106, 45, 0.14);
      }

      .page {
        position: relative;
        z-index: 1;
        width: min(1180px, calc(100% - 32px));
        margin: 0 auto;
        padding: 32px 0 56px;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr);
        gap: 20px;
        margin-bottom: 24px;
      }

      .hero-card,
      .panel {
        border: 1px solid var(--border);
        background: var(--panel);
        box-shadow: var(--shadow);
        backdrop-filter: blur(18px);
      }

      .hero-card {
        border-radius: var(--radius-xl);
        padding: 28px;
        overflow: hidden;
        position: relative;
      }

      .hero-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(125deg, rgba(255, 255, 255, 0.18), transparent 36%),
          radial-gradient(circle at 78% 22%, rgba(255, 255, 255, 0.28), transparent 18%);
        pointer-events: none;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 12px;
        border-radius: 999px;
        background: rgba(27, 23, 19, 0.06);
        color: var(--ink-soft);
        font-size: 0.88rem;
        letter-spacing: 0.02em;
      }

      h1,
      h2,
      h3 {
        margin: 0;
        font-family: "Space Grotesk", sans-serif;
      }

      h1 {
        margin-top: 18px;
        max-width: 12ch;
        font-size: clamp(2.4rem, 6vw, 4.4rem);
        line-height: 0.96;
      }

      .hero-copy p,
      .panel-head p,
      .status-bar,
      .muted {
        color: var(--ink-soft);
      }

      .hero-copy p {
        max-width: 60ch;
        margin: 16px 0 0;
        font-size: 1rem;
        line-height: 1.7;
      }

      .hero-meta {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-top: 24px;
      }

      .meta-item {
        padding: 14px 16px;
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.52);
        border: 1px solid rgba(255, 255, 255, 0.35);
      }

      .meta-item span {
        display: block;
        font-size: 0.82rem;
        color: var(--ink-soft);
      }

      .meta-item strong {
        display: block;
        margin-top: 6px;
        font-size: 1rem;
      }

      .hero-side {
        display: grid;
        gap: 20px;
      }

      .hero-side .hero-card {
        padding: 22px;
      }

      .hero-side h2 {
        font-size: 1.15rem;
      }

      .hero-links {
        display: grid;
        gap: 10px;
        margin-top: 18px;
      }

      .hero-links a {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        text-decoration: none;
        color: var(--ink);
        padding: 13px 14px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.66);
        border: 1px solid rgba(84, 56, 33, 0.1);
        transition: transform 180ms ease, background 180ms ease;
      }

      .hero-links a:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.92);
      }

      .layout {
        display: grid;
        gap: 20px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 16px;
      }

      .stat-card {
        padding: 20px;
        border-radius: var(--radius-lg);
        transform: translateY(8px);
        opacity: 0;
        animation: rise 540ms ease forwards;
      }

      .stat-card:nth-child(2) {
        animation-delay: 70ms;
      }

      .stat-card:nth-child(3) {
        animation-delay: 140ms;
      }

      .stat-card:nth-child(4) {
        animation-delay: 210ms;
      }

      .stat-label {
        font-size: 0.84rem;
        color: var(--ink-soft);
      }

      .stat-value {
        display: block;
        margin-top: 10px;
        font-family: "Space Grotesk", sans-serif;
        font-size: clamp(1.7rem, 4vw, 2.4rem);
        line-height: 1;
      }

      .stat-foot {
        display: block;
        margin-top: 8px;
        color: var(--ink-soft);
        font-size: 0.9rem;
      }

      .panel {
        border-radius: var(--radius-xl);
        padding: 24px;
      }

      .panel-head {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: start;
        margin-bottom: 18px;
      }

      .panel-head p {
        margin: 8px 0 0;
      }

      .analytics-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 20px;
      }

      .bar-list {
        display: grid;
        gap: 14px;
      }

      .bar-row {
        display: grid;
        gap: 8px;
      }

      .bar-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: baseline;
      }

      .bar-track {
        overflow: hidden;
        height: 12px;
        border-radius: 999px;
        background: rgba(27, 23, 19, 0.08);
      }

      .bar-fill {
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--brand) 0%, var(--highlight) 100%);
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
        gap: 20px;
      }

      .filters {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 18px;
      }

      .field {
        display: grid;
        gap: 8px;
      }

      .field label {
        font-size: 0.84rem;
        font-weight: 600;
        color: var(--ink-soft);
      }

      .field input,
      .field select {
        width: 100%;
        border: 1px solid rgba(84, 56, 33, 0.14);
        border-radius: 14px;
        padding: 13px 14px;
        font: inherit;
        color: var(--ink);
        background: rgba(255, 255, 255, 0.84);
        transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
      }

      .field input:focus,
      .field select:focus {
        outline: none;
        border-color: rgba(15, 118, 110, 0.4);
        box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.12);
        transform: translateY(-1px);
      }

      .status-bar {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        margin-bottom: 16px;
        font-size: 0.94rem;
      }

      .question-list,
      .base-list,
      .insight-list {
        display: grid;
        gap: 14px;
      }

      .question-card,
      .base-card,
      .insight-card {
        border-radius: var(--radius-lg);
        border: 1px solid rgba(84, 56, 33, 0.12);
        background: var(--panel-strong);
        padding: 18px;
      }

      .question-card {
        transform: translateY(10px);
        opacity: 0;
        animation: rise 420ms ease forwards;
      }

      .question-top,
      .base-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: start;
      }

      .question-title {
        margin-top: 12px;
        font-size: 1.05rem;
        line-height: 1.45;
      }

      .question-answer {
        margin: 14px 0 0;
        padding-left: 14px;
        border-left: 3px solid var(--highlight);
        color: var(--ink-soft);
        line-height: 1.6;
      }

      .pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 14px;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(15, 118, 110, 0.08);
        color: var(--brand-deep);
        font-size: 0.82rem;
        font-weight: 600;
      }

      .pill.warm {
        background: var(--highlight-soft);
        color: #8b451d;
      }

      .base-card h3 {
        font-size: 1.08rem;
      }

      .base-card p {
        color: var(--ink-soft);
        line-height: 1.6;
      }

      .base-meta {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-top: 16px;
      }

      .base-meta div {
        padding: 12px;
        border-radius: 14px;
        background: rgba(15, 118, 110, 0.06);
      }

      .base-meta span {
        display: block;
        color: var(--ink-soft);
        font-size: 0.82rem;
      }

      .base-meta strong {
        display: block;
        margin-top: 4px;
      }

      .base-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
        color: var(--brand-deep);
        text-decoration: none;
        font-weight: 600;
      }

      .empty-state,
      .error-state {
        padding: 28px;
        text-align: center;
        border-radius: var(--radius-lg);
        background: rgba(255, 255, 255, 0.74);
        border: 1px dashed rgba(84, 56, 33, 0.18);
      }

      .error-state {
        background: rgba(196, 106, 45, 0.08);
        color: #7c3510;
      }

      .loading {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }

      .loading::before {
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: var(--brand);
        box-shadow: 18px 0 0 rgba(15, 118, 110, 0.32), 36px 0 0 rgba(15, 118, 110, 0.16);
        animation: pulse 900ms ease-in-out infinite;
      }

      .footer-note {
        margin-top: 22px;
        text-align: center;
        color: var(--ink-soft);
        font-size: 0.9rem;
      }

      @keyframes rise {
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%,
        100% {
          transform: translateX(0);
          opacity: 0.8;
        }

        50% {
          transform: translateX(4px);
          opacity: 1;
        }
      }

      @media (max-width: 1024px) {
        .hero,
        .analytics-grid,
        .dashboard-grid {
          grid-template-columns: 1fr;
        }

        .stats-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 720px) {
        .page {
          width: min(100% - 20px, 1180px);
          padding-top: 20px;
        }

        .hero-card,
        .panel {
          padding: 20px;
          border-radius: 22px;
        }

        .hero-meta,
        .stats-grid,
        .filters,
        .base-meta {
          grid-template-columns: 1fr;
        }

        .status-bar,
        .panel-head,
        .question-top,
        .base-top {
          flex-direction: column;
          align-items: start;
        }

        h1 {
          max-width: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <header class="hero">
        <section class="hero-card hero-copy">
          <div class="eyebrow">SECOP II / Dashboard publico</div>
          <h1>Lectura rapida de las bases del API</h1>
          <p>
            Explora preguntas, categorias y estadisticas agregadas de las tres bases mockeadas de
            SECOP II. La vista consume la API desplegada en el mismo Worker y se actualiza desde
            los endpoints ya expuestos.
          </p>
          <div class="hero-meta">
            <div class="meta-item">
              <span>Version del dataset</span>
              <strong id="meta-version">${meta.version}</strong>
            </div>
            <div class="meta-item">
              <span>Ultima actualizacion</span>
              <strong id="meta-date">${meta.ultima_actualizacion}</strong>
            </div>
            <div class="meta-item">
              <span>Fuente</span>
              <strong id="meta-source">${meta.fuente}</strong>
            </div>
            <div class="meta-item">
              <span>Ruta del dashboard</span>
              <strong>/dashboard</strong>
            </div>
          </div>
        </section>

        <aside class="hero-side">
          <section class="hero-card">
            <h2>Atajos de API</h2>
            <div class="hero-links">
              <a href="/api/bases" target="_blank" rel="noreferrer">
                <span>Listado de bases</span>
                <strong>/api/bases</strong>
              </a>
              <a href="/api/stats" target="_blank" rel="noreferrer">
                <span>Estadisticas agregadas</span>
                <strong>/api/stats</strong>
              </a>
              <a href="/api/preguntas/3" target="_blank" rel="noreferrer">
                <span>Ejemplo de pregunta</span>
                <strong>/api/preguntas/3</strong>
              </a>
            </div>
          </section>

          <section class="hero-card">
            <h2>Estado de carga</h2>
            <p class="muted" id="load-status">Esperando datos del Worker...</p>
          </section>
        </aside>
      </header>

      <main class="layout">
        <section class="stats-grid" id="stats-grid">
          <article class="panel stat-card">
            <span class="stat-label">Bases analizadas</span>
            <strong class="stat-value">-</strong>
            <span class="stat-foot">Cargando resumen general</span>
          </article>
          <article class="panel stat-card">
            <span class="stat-label">Preguntas totales</span>
            <strong class="stat-value">-</strong>
            <span class="stat-foot">Preparando indicadores</span>
          </article>
          <article class="panel stat-card">
            <span class="stat-label">Categorias activas</span>
            <strong class="stat-value">-</strong>
            <span class="stat-foot">Leyendo clasificacion</span>
          </article>
          <article class="panel stat-card">
            <span class="stat-label">Tipos de respuesta</span>
            <strong class="stat-value">-</strong>
            <span class="stat-foot">Contando formatos</span>
          </article>
        </section>

        <section class="analytics-grid">
          <article class="panel">
            <div class="panel-head">
              <div>
                <h2>Distribucion por tipo</h2>
                <p>Asi se reparten las respuestas del mock entre numero, texto, fecha y lista.</p>
              </div>
            </div>
            <div class="bar-list" id="type-bars">
              <div class="loading">Consultando tipos de respuesta...</div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <div>
                <h2>Carga por base</h2>
                <p>Comparativo del volumen de preguntas disponibles por dataset.</p>
              </div>
            </div>
            <div class="bar-list" id="base-bars">
              <div class="loading">Midiendo distribucion por base...</div>
            </div>
          </article>
        </section>

        <section class="dashboard-grid">
          <article class="panel">
            <div class="panel-head">
              <div>
                <h2>Explorador de preguntas</h2>
                <p>Filtra por texto, base o categoria para navegar rapidamente el contenido expuesto.</p>
              </div>
            </div>

            <div class="filters">
              <div class="field">
                <label for="search-input">Buscar por pregunta o respuesta</label>
                <input id="search-input" type="search" placeholder="Ej: proveedores, PDF, 2024" />
              </div>
              <div class="field">
                <label for="base-filter">Base</label>
                <select id="base-filter">
                  <option value="todas">Todas las bases</option>
                </select>
              </div>
              <div class="field">
                <label for="category-filter">Categoria</label>
                <select id="category-filter">
                  <option value="todas">Todas las categorias</option>
                </select>
              </div>
            </div>

            <div class="status-bar">
              <span id="results-count">Cargando preguntas...</span>
              <span id="results-meta">Sincronizando con el API</span>
            </div>

            <div class="question-list" id="question-list">
              <div class="loading">Armando el tablero de preguntas...</div>
            </div>
          </article>

          <aside class="panel">
            <div class="panel-head">
              <div>
                <h2>Bases disponibles</h2>
                <p>Resumen narrativo de cada base con sus categorias, volumen y enlace fuente.</p>
              </div>
            </div>

            <div class="base-list" id="base-list">
              <div class="loading">Cargando perfiles de base...</div>
            </div>

            <div class="panel-head" style="margin-top: 24px;">
              <div>
                <h2>Hallazgos rapidos</h2>
                <p>Senales utiles para demos, QA funcional y consumo desde frontend.</p>
              </div>
            </div>

            <div class="insight-list" id="insight-list">
              <div class="loading">Calculando insights...</div>
            </div>
          </aside>
        </section>
      </main>

      <p class="footer-note">
        Vista servida desde el mismo Cloudflare Worker. Los datos se leen con fetch relativo a
        <code>/api/*</code>.
      </p>
    </div>

    <script>
      const meta = ${JSON.stringify(meta)};
      const formatNumber = new Intl.NumberFormat("es-CO");
      const state = {
        bases: [],
        preguntas: [],
        stats: null,
        search: "",
        baseId: "todas",
        categoria: "todas"
      };

      const ui = {};

      document.addEventListener("DOMContentLoaded", () => {
        ui.loadStatus = document.getElementById("load-status");
        ui.statsGrid = document.getElementById("stats-grid");
        ui.typeBars = document.getElementById("type-bars");
        ui.baseBars = document.getElementById("base-bars");
        ui.questionList = document.getElementById("question-list");
        ui.baseList = document.getElementById("base-list");
        ui.insightList = document.getElementById("insight-list");
        ui.resultsCount = document.getElementById("results-count");
        ui.resultsMeta = document.getElementById("results-meta");
        ui.searchInput = document.getElementById("search-input");
        ui.baseFilter = document.getElementById("base-filter");
        ui.categoryFilter = document.getElementById("category-filter");

        ui.searchInput.addEventListener("input", (event) => {
          state.search = event.target.value.trim().toLowerCase();
          renderQuestions();
        });

        ui.baseFilter.addEventListener("change", (event) => {
          state.baseId = event.target.value;
          renderQuestions();
        });

        ui.categoryFilter.addEventListener("change", (event) => {
          state.categoria = event.target.value;
          renderQuestions();
        });

        loadDashboard();
      });

      async function loadDashboard() {
        setStatus("Cargando datos desde el Worker...");

        try {
          const [basesSummary, stats] = await Promise.all([
            fetchJson("/api/bases"),
            fetchJson("/api/stats")
          ]);

          const bases = await Promise.all(
            basesSummary.bases.map((base) => fetchJson("/api/bases/" + encodeURIComponent(base.id)))
          );

          state.bases = bases;
          state.stats = stats;
          state.preguntas = bases.flatMap((base) =>
            base.preguntas.map((pregunta) => ({
              ...pregunta,
              base_id: base.id,
              base_nombre: base.nombre,
              dataset_id: base.dataset_id
            }))
          );

          populateFilters();
          renderStats();
          renderTypeBars();
          renderBaseBars();
          renderBases();
          renderInsights();
          renderQuestions();
          setStatus("Dashboard listo. " + state.preguntas.length + " preguntas cargadas.");
        } catch (error) {
          console.error(error);
          const message = error instanceof Error ? error.message : "No fue posible cargar el dashboard";
          renderFailure(message);
          setStatus("No se pudieron cargar los datos.");
        }
      }

      async function fetchJson(url) {
        const response = await fetch(url, {
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          let message = "Error al consultar " + url;

          try {
            const errorPayload = await response.json();
            if (errorPayload && typeof errorPayload.error === "string") {
              message = errorPayload.error;
            }
          } catch (_error) {
            message = response.status + " " + response.statusText;
          }

          throw new Error(message);
        }

        return response.json();
      }

      function populateFilters() {
        const categories = [...new Set(state.preguntas.map((pregunta) => pregunta.categoria))].sort();

        ui.baseFilter.innerHTML =
          '<option value="todas">Todas las bases</option>' +
          state.bases
            .map(
              (base) =>
                '<option value="' +
                escapeHtml(base.id) +
                '">' +
                escapeHtml(base.nombre) +
                "</option>"
            )
            .join("");

        ui.categoryFilter.innerHTML =
          '<option value="todas">Todas las categorias</option>' +
          categories
            .map(
              (category) =>
                '<option value="' +
                escapeHtml(category) +
                '">' +
                escapeHtml(titleCase(category)) +
                "</option>"
            )
            .join("");
      }

      function renderStats() {
        const totalCategorias = new Set(state.preguntas.map((pregunta) => pregunta.categoria)).size;
        const totalTipos = Object.keys(state.stats.preguntas_por_tipo).length;
        const cards = [
          {
            label: "Bases analizadas",
            value: formatNumber.format(state.stats.total_bases),
            foot: "Tres datasets mockeados en el Worker"
          },
          {
            label: "Preguntas totales",
            value: formatNumber.format(state.stats.total_preguntas),
            foot: "Incluye preguntas estructurales y analiticas"
          },
          {
            label: "Categorias activas",
            value: formatNumber.format(totalCategorias),
            foot: "Agrupaciones listas para filtrar desde UI"
          },
          {
            label: "Tipos de respuesta",
            value: formatNumber.format(totalTipos),
            foot: "Numero, texto, fecha y lista disponibles"
          }
        ];

        ui.statsGrid.innerHTML = cards
          .map(
            (card) =>
              '<article class="panel stat-card">' +
              '<span class="stat-label">' +
              escapeHtml(card.label) +
              "</span>" +
              '<strong class="stat-value">' +
              escapeHtml(card.value) +
              "</strong>" +
              '<span class="stat-foot">' +
              escapeHtml(card.foot) +
              "</span>" +
              "</article>"
          )
          .join("");
      }

      function renderTypeBars() {
        const rows = Object.entries(state.stats.preguntas_por_tipo)
          .sort(([, first], [, second]) => second - first)
          .map(([type, count]) => buildBarRow(titleCase(type), count, state.stats.total_preguntas));

        ui.typeBars.innerHTML = rows.join("");
      }

      function renderBaseBars() {
        const maxValue = Math.max(...Object.values(state.stats.preguntas_por_base));
        const rows = state.bases.map((base) => buildBarRow(base.id + " / " + base.nombre, base.preguntas.length, maxValue));

        ui.baseBars.innerHTML = rows.join("");
      }

      function renderBases() {
        ui.baseList.innerHTML = state.bases
          .map((base) => {
            const categories = summarizeCategories(base.preguntas);
            const numericas = base.preguntas.filter((pregunta) => pregunta.tipo_respuesta === "numero").length;

            return (
              '<article class="base-card">' +
              '<div class="base-top">' +
              "<div>" +
              "<h3>" +
              escapeHtml(base.nombre) +
              "</h3>" +
              '<p class="muted" style="margin: 8px 0 0;">Dataset ' +
              escapeHtml(base.dataset_id) +
              "</p>" +
              "</div>" +
              '<span class="pill warm">' +
              formatNumber.format(base.preguntas.length) +
              " preguntas</span>" +
              "</div>" +
              '<div class="pill-row">' +
              categories.map((category) => '<span class="pill">' + escapeHtml(category) + "</span>").join("") +
              "</div>" +
              '<div class="base-meta">' +
              "<div><span>Tipos numericos</span><strong>" +
              formatNumber.format(numericas) +
              "</strong></div>" +
              "<div><span>Total categorias</span><strong>" +
              formatNumber.format(new Set(base.preguntas.map((pregunta) => pregunta.categoria)).size) +
              "</strong></div>" +
              "</div>" +
              '<a class="base-link" href="' +
              escapeHtml(base.url_fuente) +
              '" target="_blank" rel="noreferrer">Ver dataset fuente</a>' +
              "</article>"
            );
          })
          .join("");
      }

      function renderInsights() {
        const longestAnswer = [...state.preguntas].sort(
          (first, second) => second.respuesta.length - first.respuesta.length
        )[0];
        const topBase = [...state.bases].sort((first, second) => second.preguntas.length - first.preguntas.length)[0];
        const categories = summarizeCategories(state.preguntas);

        const insights = [
          {
            title: "Base con mayor densidad",
            text: topBase.nombre + " concentra " + topBase.preguntas.length + " preguntas."
          },
          {
            title: "Respuesta mas extensa",
            text: "La pregunta #" + longestAnswer.num + " tiene la respuesta mas larga del mock."
          },
          {
            title: "Categorias dominantes",
            text: categories.slice(0, 3).join(", ") + " aparecen con mayor frecuencia."
          }
        ];

        ui.insightList.innerHTML = insights
          .map(
            (insight) =>
              '<article class="insight-card">' +
              "<h3>" +
              escapeHtml(insight.title) +
              "</h3>" +
              '<p style="margin: 10px 0 0;">' +
              escapeHtml(insight.text) +
              "</p>" +
              "</article>"
          )
          .join("");
      }

      function renderQuestions() {
        const questions = getFilteredQuestions();
        const selectedBaseLabel =
          state.baseId === "todas"
            ? "todas las bases"
            : state.bases.find((base) => base.id === state.baseId)?.nombre || state.baseId;
        const selectedCategoryLabel = state.categoria === "todas" ? "todas las categorias" : state.categoria;

        ui.resultsCount.textContent =
          formatNumber.format(questions.length) + " resultados visibles de " + formatNumber.format(state.preguntas.length);
        ui.resultsMeta.textContent =
          selectedBaseLabel + " / " + selectedCategoryLabel + " / corte " + meta.ultima_actualizacion;

        if (questions.length === 0) {
          ui.questionList.innerHTML =
            '<div class="empty-state"><h3>Sin coincidencias</h3><p>Prueba otro texto o limpia alguno de los filtros.</p></div>';
          return;
        }

        ui.questionList.innerHTML = questions
          .map((question) => {
            const numericValue =
              question.valor_numerico === null ? "Sin valor numerico" : formatNumber.format(question.valor_numerico);

            return (
              '<article class="question-card">' +
              '<div class="question-top">' +
              '<span class="eyebrow">Pregunta #' +
              escapeHtml(String(question.num)) +
              "</span>" +
              '<span class="pill warm">' +
              escapeHtml(question.base_nombre) +
              "</span>" +
              "</div>" +
              '<h3 class="question-title">' +
              escapeHtml(question.pregunta) +
              "</h3>" +
              '<p class="question-answer">' +
              escapeHtml(question.respuesta) +
              "</p>" +
              '<div class="pill-row">' +
              '<span class="pill">' +
              escapeHtml(titleCase(question.categoria)) +
              "</span>" +
              '<span class="pill">' +
              escapeHtml(titleCase(question.tipo_respuesta)) +
              "</span>" +
              '<span class="pill">' +
              escapeHtml(numericValue) +
              "</span>" +
              "</div>" +
              "</article>"
            );
          })
          .join("");
      }

      function getFilteredQuestions() {
        return state.preguntas.filter((question) => {
          const matchesBase = state.baseId === "todas" || question.base_id === state.baseId;
          const matchesCategory = state.categoria === "todas" || question.categoria === state.categoria;
          const matchesText =
            state.search.length === 0 ||
            question.pregunta.toLowerCase().includes(state.search) ||
            question.respuesta.toLowerCase().includes(state.search) ||
            question.base_nombre.toLowerCase().includes(state.search) ||
            String(question.num).includes(state.search);

          return matchesBase && matchesCategory && matchesText;
        });
      }

      function summarizeCategories(questions) {
        const counts = {};

        for (const question of questions) {
          counts[question.categoria] = (counts[question.categoria] || 0) + 1;
        }

        return Object.entries(counts)
          .sort(([, first], [, second]) => second - first)
          .map(([name]) => titleCase(name));
      }

      function buildBarRow(label, count, maxValue) {
        const percent = maxValue === 0 ? 0 : Math.max(8, Math.round((count / maxValue) * 100));

        return (
          '<div class="bar-row">' +
          '<div class="bar-head"><span>' +
          escapeHtml(label) +
          "</span><strong>" +
          formatNumber.format(count) +
          "</strong></div>" +
          '<div class="bar-track"><div class="bar-fill" style="width:' +
          String(percent) +
          '%"></div></div>' +
          "</div>"
        );
      }

      function renderFailure(message) {
        const errorMarkup =
          '<div class="error-state"><h3>Error cargando datos</h3><p>' +
          escapeHtml(message) +
          "</p></div>";

        ui.typeBars.innerHTML = errorMarkup;
        ui.baseBars.innerHTML = errorMarkup;
        ui.questionList.innerHTML = errorMarkup;
        ui.baseList.innerHTML = errorMarkup;
        ui.insightList.innerHTML = errorMarkup;
      }

      function setStatus(message) {
        ui.loadStatus.textContent = message;
      }

      function titleCase(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");
      }
    </script>
  </body>
</html>`;
};
