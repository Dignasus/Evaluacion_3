import './App.css'
import { useState, useEffect } from 'react';
import ListaDesembarque from './components/ListaDesembarque';

function App() {
  const [desembarques, setDesembarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');

  // R4: Estado inicial para los prioritarios leyendo de Local Storage
  const [prioritarios, setPrioritarios] = useState(() => {
    try {
      const guardados = localStorage.getItem('lotes_prioritarios');
      return guardados ? JSON.parse(guardados) : [];
    } catch (e) {
      console.error('Error al leer Local Storage', e);
      return [];
    }
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  // R4: Guardar automáticamente en Local Storage cuando cambien los prioritarios
  useEffect(() => {
    localStorage.setItem('lotes_prioritarios', JSON.stringify(prioritarios));
  }, [prioritarios]);

  async function cargarDatos() {
    try {
      // R6: Uso de la variable de entorno
      const response = await fetch(import.meta.env.VITE_API_URL);

      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }

      const data = await response.json();
      setDesembarques(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // R4: Función para activar/desactivar la prioridad de un lote
  function togglePrioridad(id) {
    setPrioritarios((prevPrioritarios) => {
      if (prevPrioritarios.includes(id)) {
        return prevPrioritarios.filter((itemId) => itemId !== id);
      } else {
        return [...prevPrioritarios, id];
      }
    });
  }

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>Error: {error}</p>;

  // R5 & R6: Saneamiento y filtrado seguro por especie o estado
  const desembarquesFiltrados = desembarques.filter((item) => {
    const filtroSaneado = filtro.replace(/[<>%/&'"]/g, "").toLowerCase().trim();

    if (!filtroSaneado) return true;
    
    const especie = String(item.especie || '').toLowerCase();
    const estado = String(item.estado || '').toLowerCase();

    return especie.includes(filtroSaneado) || estado.includes(filtroSaneado);
  });

  return (
    <>
      <h1>Panel de Desembarques</h1>

      <input
        type="text"
        placeholder="Filtrar por especie o estado"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {/* R4: Le pasamos los datos de prioridad y la función al componente hijo */}
      <ListaDesembarque 
        desembarques={desembarquesFiltrados} 
        prioritarios={prioritarios}
        onTogglePrioridad={togglePrioridad}
      />
    </>
  );
}

export default App;