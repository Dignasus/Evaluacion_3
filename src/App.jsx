import './App.css'
import {useState, useEffect} from 'react';
import ListaDesembarque from './components/ListaDesembarque';

function App() {
  const [desembarques, setDesembarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
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

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>Error: {error}</p>;

  const desembarquesFiltrados = desembarques.filter((item) => {
    // Eliminamos caracteres especiales sospechosos para evitar inyecciones de código básicas
    const filtroSaneado = filtro.replace(/[<>%/&'"]/g, "").toLowerCase().trim();

    // Si el usuario no ha escrito nada, mostramos todo
    if (!filtroSaneado) return true;
    
    // Obtenemos los campos solicitados
    const especie = String(item.especie || '').toLowerCase();
    const estado = String(item.estado || '').toLowerCase();

    // Filtramos estrictamente por especie o por estado
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

      <ListaDesembarque desembarques={desembarquesFiltrados} />
    </>
  );
}


export default App
