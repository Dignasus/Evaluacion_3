function FilaDesembarque({ desembarque, esPrioritario, onTogglePrioridad }) { 
  const claseEstado = `badge-estado estado-${desembarque.estado.toLowerCase().replace(/\s+/g, '-')}`;

  return (
  <tr className={esPrioritario ? 'fila-prioritaria' : ''}>
    <td style={{ textAlign: 'center' }}>
      <input 
        type="checkbox" 
        checked={esPrioritario}
        onChange={() => onTogglePrioridad(desembarque.id)}
        title="Marcar como prioritario"
        style={{ cursor: 'pointer', transform: 'scale(1.3)' }}
      />
    </td>
    <td>{desembarque.id}</td>
    <td>{desembarque.especie}</td>
    <td>{desembarque.embarcacion}</td>
    <td>{desembarque.fecha}</td>
    <td>{desembarque.kilos} kg</td>
    <td>
      <span className={claseEstado}>{desembarque.estado}</span>
    </td>

  </tr>
);
}

export default FilaDesembarque;