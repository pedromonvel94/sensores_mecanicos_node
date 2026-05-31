# Fase 6: Estilos y UI/UX

## Diseño y Buenas Prácticas CSS

Se aplicó una arquitectura de **CSS tradicional modularizada** a nivel de componentes o variables globales. No se utilizó Tailwind para mantener un control granular exacto del diseño tal como dicta el estándar académico.

### Estilos Implementados
- **Variables Globales (`variables.css`)**: Definimos una paleta de colores moderna (tonos oscuros y acentos azulados brillantes), tipografías seguras y sombreados (box-shadow) uniformes.
- **Glassmorphism y Tarjetas**: El Dashboard se divide en tarjetas (Cards) con bordes redondeados y ligeras sombras que resaltan sobre el fondo, dando una sensación visual muy premium y estructurada.
- **Micro-animaciones**: Los botones, el selector de filtros y las filas de la tabla tienen efectos de `:hover` y transiciones suaves (`transition: all 0.2s ease`) que responden a la interacción del cursor.
- **Responsive Web Design (RWD)**: Utilizando CSS Grid y Flexbox junto con media queries (`@media`), garantizamos que:
  - En pantallas anchas (Desktop), el gráfico y la tabla se posicionan en columnas u ocupan el 100% de manera estéticamente proporcionada.
  - En pantallas pequeñas (Mobile), el diseño se colapsa a una sola columna para facilitar la lectura, y la tabla activa su propio scroll horizontal si es necesario (`overflow-x: auto`).
