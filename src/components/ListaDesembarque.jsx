import FilaDesembarque from './FilaDesembarque'


function ListaDesembarque({ desembarques, prioritarios, onTogglePrioridad }) {
    return (
      <div className="tabla-contenedor">
        <table className="tabla-desembarques">
          <thead>
            <tr>
              <th>Prioritario</th>
              <th>Id</th>
              <th>Especie</th>
              <th>Embarcacion</th>
              <th>Fecha</th>
              <th>Kilos</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {desembarques.map((item) => (
              <FilaDesembarque
                key={item.id}
                desembarque={item}
                esPrioritario={prioritarios.includes(item.id)}
                onTogglePrioridad={onTogglePrioridad}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default ListaDesembarque;