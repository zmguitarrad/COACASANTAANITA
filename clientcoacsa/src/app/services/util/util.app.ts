
export function getMonthsOfYear(){
  return [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
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