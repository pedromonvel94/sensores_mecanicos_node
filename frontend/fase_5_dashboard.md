# Fase 5: Integración del Dashboard

## El Ciclo de Vida y el Estado

La unión de todos los componentes ocurre en `src/components/Dashboard/Dashboard.jsx`. 

El flujo de información es el siguiente:
1. **Montaje Inicial (`useEffect`)**: Cuando la aplicación carga, se dispara `fetchSensores(tipoFiltro)`. El estado por defecto del filtro es `""` (todos).
2. **Petición HTTP**: Muestra el `<Loader />`. El servicio `api.js` contacta con el backend de Node.js.
3. **Respuesta Exitosa**: Se oculta el Loader y se actualiza la variable de estado `sensores` con la respuesta JSON.
4. **Respuesta Errónea**: Se captura el error en el bloque `catch` y se muestra el `<ErrorMessage />`.
5. **Renderizado**: El Dashboard le pasa el arreglo `sensores` a `<SensorTable />` y a `<SensorChart />`. Ambos se dibujan instantáneamente en la pantalla.
6. **Interacción del Usuario**: Si el usuario cambia el filtro en `<SensorFilter />`, se actualiza el estado `tipoFiltro`, lo que vuelve a disparar el `useEffect` (paso 1), comenzando el ciclo de nuevo de manera asíncrona y reactiva.
