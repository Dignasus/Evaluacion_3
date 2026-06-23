# Evaluación 3: Panel de Desembarques Pesqueros - SPA con React

Asignatura: Programación Front End (TI3031)
Estudiante: Cristian Millaqueo
Empresa simulada: Pesquera Talcahuano Sur SpA

---

## 1. Identificación de Elementos de React (Requerimiento R1)

Para la construcción de este panel web interactivo, se utilizaron los siguientes elementos fundamentales de React:

* Componentes: Se dividió la interfaz en partes modulares y reutilizables (App, ListaDesembarque, y FilaDesembarque). Esto mejora el orden, facilita el mantenimiento y permite escalar la aplicación.
* Props: Se utilizaron para comunicar los componentes padre con los componentes hijos. Por ejemplo, App le pasa la lista de desembarques, el arreglo de prioritarios y la función onTogglePrioridad al componente ListaDesembarque, permitiendo que la información fluya unidireccionalmente.
* Estado (useState): Se implementó para manejar datos dinámicos que, al cambiar, deben actualizar la interfaz gráfica. Se usó para almacenar los datos de la API (desembarques), el texto de búsqueda (filtro), el estado de carga (loading), los errores (error) y los lotes marcados (prioritarios).
* Efectos (useEffect): Se utilizó para manejar efectos secundarios en el ciclo de vida del componente. Un useEffect se encarga de consumir la API REST solo al montar el componente (con arreglo de dependencias vacío), y otro se encarga de vigilar los cambios en el estado prioritarios para guardarlos automáticamente en el Local Storage.
* JSX: Se aplicó esta extensión de sintaxis para escribir estructuras similares a HTML directamente dentro del código JavaScript, permitiendo renderizar dinámicamente la tabla y las clases CSS según los estados.
* Manejo de Eventos: Se usaron eventos sintéticos de React como onChange (para capturar lo que el usuario escribe en el input de filtro y actualizar el estado) y onClick (para detectar cuándo el usuario interactúa con la casilla de prioridad).

---

## 2. Apoyo de Inteligencia Artificial: GitHub Copilot (Requerimiento R1)

Sugerencia recibida (Transcripción de Copilot):
Durante la creación de la función de filtrado, Copilot sugirió el siguiente bloque de código base para buscar coincidencias:

const desembarquesFiltrados = desembarques.filter((item) =>
  item.especie.toLowerCase().includes(filtro.toLowerCase()) ||
  item.estado.toLowerCase().includes(filtro.toLowerCase())
);

Decisión: Modificada.
Si bien la sugerencia inicial de la IA era funcional, decidí modificarla para cumplir con las buenas prácticas de desarrollo seguro relativas al saneamiento de entradas. Incorporé una expresión regular para limpiar la entrada del usuario antes de procesarla, previniendo así posibles inyecciones de código. Además, forcé la conversión a String de los campos para evitar errores si la API retorna datos nulos.

---

## 3. Análisis de Código Estático y Buenas Prácticas (Requerimiento R7)

El proyecto fue analizado utilizando la herramienta SonarQube para IDE en VS Code. A continuación se detallan los dos hallazgos identificados y las acciones tomadas:

### Hallazgo 1 (Maintainability / Intentionality Issue - Regla javascript:S2486)
* Reporte de SonarQube: "Handle this exception or don't catch it at all. Exceptions should not be ignored." (Detectado en App.jsx, línea 16).
* Corrección / Justificación: Se aceptó la recomendación. El bloque catch encargado de manejar posibles fallas al leer del Local Storage se encontraba vacío, lo que silenciaba los errores en tiempo de ejecución. Se corrigió agregando un console.error(e) para registrar la excepción de manera adecuada en la consola del desarrollador antes de retornar el arreglo vacío de respaldo, mejorando la robustez del código.

### Hallazgo 2 (Maintainability Issue - Regla javascript:S6774)
* Reporte de SonarQube: "'desembarques' is missing in props validation. React components should validate prop types" (Detectado en ListaDesembarque.jsx, línea 4).
* Corrección / Justificación: Se justifica su omisión. SonarQube sugiere utilizar la librería externa prop-types para validar estrictamente los tipos de datos que reciben los componentes por props. Dado que este proyecto es una SPA controlada, desarrollada en JavaScript puro, y la estructura de los datos que retorna la API interna es conocida y predecible, se decidió no instalar esta dependencia extra para mantener el proyecto liviano y enfocado en los requerimientos principales de la pauta.