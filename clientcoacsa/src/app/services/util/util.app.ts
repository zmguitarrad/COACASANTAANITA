
export function getMonthsOfYear(){
  return [
    {month: "Enero", "id": 1},
    {month: "Febrero", "id": 2},
    {month: "Marzo", "id": 3},
    {month: "Abril", "id": 4},
    {month: "Mayo", "id": 5},
    {month: "Junio", "id": 6},
    {month: "Julio", "id": 7},
    {month: "Agosto", "id": 8},
    {month: "Septiembre", "id": 9},
    {month: "Octubre", "id": 10},
    {month: "Noviembre", "id": 11},
    {month: "Diciembre", "id": 12}
  ]
}


export function getTitle(id: number) {
  switch (id) {
    case 1:
      return "FINANCIERA";
    case 2:
      return "CLIENTES Y MERCADO";
    default:
      return "GENERALES";
  }
}