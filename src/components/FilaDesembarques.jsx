import FilaDesembarque from './FilaDesembarque'


function ListaDesembarques(){
    return (
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Especie</th>
            <th>Embarcacion</th>
            <th>Fecha</th>
            <th>Kilos</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          desembarques.map(item ()=>
            <FilaDesembarque
              key={item.id}
              desembarque={item}
            />
          )
        </tbody>
      </table>
    );
}

export default ListaDesembarques