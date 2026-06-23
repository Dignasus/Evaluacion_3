function FilaDesembarque({ desembarque }) { 

  const claseEstado = 'badge-estado estado-${desembarque.estado.toLowerCase().replace(/\s+/g, '-')}';

  return (
    <tr>
      <td>{desembarque.id}</td>
      <td>{desembarque.especie}</td>
      <td>{desembarque.embarcacion}</td>
      <td>{desembarque.fecha}</td>
      <td>{desembarque.kilos}</td>
      <td>
        <span className={claseEstado}>{desembarque.estado}</span>
      </td>
    </tr>
  );
}

export default FilaDesembarque;