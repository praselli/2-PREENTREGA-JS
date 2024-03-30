// PREENTREGA N° 2
// CALCULADORA DE COSTOS DE VIAJES
// PABLO JAVIER RASELLI

//------------------------------------------------------------------

// Variables y arrays:

let cantidadPersonas;
let cantidadDiasViaje;
const transporteOpciones = ["Auto", "Avión", "AutoBus"];
const alojamientoOpciones = ["Hotel", "Departamento", "Casa"];
let costoNafta;
let precioLitroNafta;
let gastoPromedioComida;
const gastosExtras = [];

//------------------------------------------------------------------

// Alert de bienvenida:

alert("¡BIENVENIDO A SU CALCULADORA DE GASTOS DE VIAJE!");

// Alert para avisar el pedido de información:

alert(`A continuación le solicitaremos información
para poder calcular su viaje.
IMPORTANTE: Solo puedes ingresar valores numéricos.
Los valores calculados son estimativos.`);

//------------------------------------------------------------------

// Alert para cantidad de personas y días de viaje:

alert("CANTIDAD DE PERSONAS y DÍAS DEL VIAJE:");

// Función para solicitar la cantidad de personas y la cantidad de días de viaje:

function solicitarCantidadPersonasYDias() {
  do {
    cantidadPersonas = parseInt(prompt("Ingrese la cantidad de personas que viajarán."));
  } while (isNaN(cantidadPersonas)); // Ciclo para que el usuario ingrese un valor numérico

  do {
    cantidadDiasViaje = parseInt(prompt("Ingrese la cantidad de días de su viaje."));
  } while (isNaN(cantidadDiasViaje)); // Ciclo para que el usuario ingrese un valor numérico
};

// Llamada a la función para solicitar cantidad de personas y días de viaje:

solicitarCantidadPersonasYDias();

//------------------------------------------------------------------

// Alert para gastos de traslado:

alert("TRASLADO:");

// Llama a la función para el tipo de transporte:

let costoTotalTransporte = 0;
let costoBoletoIda = 0;
let costoBoletoVuelta = 0;
let costoTotalAvionYBus = costoBoletoIda + costoBoletoVuelta;

let transporte = parseInt(prompt("Elija su opción de transporte:\n" + transporteOpciones.map((option, index) => `${index + 1}. ${option}`).join("\n")));
if (transporte === 1) { // si el transporte es "Auto", entonces:
  costoTotalTransporte = calcularGastosNafta();
} else { // Y si el transporte no es "Auto", es Avión o AutoBus:
  costoBoletoIda = parseFloat(prompt("Ingrese el costo del boleto de ida por persona:"));
  costoBoletoVuelta = parseFloat(prompt("Ingrese el costo del boleto de vuelta por persona:"));
  costoTotalTransporte = costoTotalAvionYBus * cantidadPersonas; // Costo total del transporte (si es avión o autobus) sumando los costos de ida y vuelta
};

// Función para calcular los gastos de nafta:

function calcularGastosNafta() {
  let kmHastaDestino, precioLitroNafta;
  
  do {
    kmHastaDestino = parseFloat(prompt("Ingrese la cantidad de kilómetros hasta su destino:"));
  } while (isNaN(kmHastaDestino)); // Ciclo para que el usuario ingrese un valor numérico
  
  do {
    precioLitroNafta = parseFloat(prompt("Ingrese el precio de litro de nafta:"));
  } while (isNaN(precioLitroNafta)); // Ciclo para que el usuario ingrese un valor numérico

  let consumoPromedio = 15; // km/litro (Consumo promedio de un auto)
  let gastosNaftaIdaYVuelta = (kmHastaDestino * 2) / consumoPromedio * precioLitroNafta; // calcula el gasto de nafta haciendo (km hasta el destino x 2) dividido el consumo promedio (15) y multiplicandolo por el precio de la nafta que ingresa el usuario.
  let gastosNaftaEnDestino = gastosNaftaIdaYVuelta * 0.10; // se considera un 10% más para circular en el destino

  return gastosNaftaIdaYVuelta + gastosNaftaEnDestino;
};

//------------------------------------------------------------------

// Alert para gastos de alojamiento:

alert("GASTOS DE ALOJAMIENTO:");

// Función para solicitar el costo del alojamiento por noche:

function solicitarCostoAlojamientoPorNoche() {
  let costoAlojamientoPorNoche;

  do {
    costoAlojamientoPorNoche = parseFloat(prompt("Ingrese el costo del alojamiento por noche:"));
  } while (isNaN(costoAlojamientoPorNoche)); // Ciclo para que el usuario ingrese un valor numérico

  return costoAlojamientoPorNoche;
};

// Llamada a la función para solicitar el costo del alojamiento por noche:

let costoAlojamientoPorNoche = solicitarCostoAlojamientoPorNoche();

//------------------------------------------------------------------

// Alert para gastos de comida:

alert("GASTOS DE COMIDA:");

// Función para solicitar un gasto promedio de comida por día y por persona:

function solicitarGastoPromedioComida() {
  let gastoPromedio;

  do {
    gastoPromedio = parseFloat(prompt("Ingrese el gasto promedio para gastos de comida por persona y por día:"));
  } while (isNaN(gastoPromedio)); // Ciclo para que el usuario ingrese un valor numérico

  return gastoPromedio; // Devolver el valor ingresado por el usuario
};

// Llamada a la función para solicitar gasto promedio de comida y almacenarlo en la variable correspondiente:

gastoPromedioComida = solicitarGastoPromedioComida();

//------------------------------------------------------------------

// Alert para gastos extras:

alert("GASTOS EXTRAS:");

// Función para solicitar gastos extras:

function solicitarGastosExtras() {
  let continuar = true;
  while (continuar) {
    let gastoExtra = parseFloat(prompt(`Ingrese el valor de algún gasto extra que ya haya contemplado:
Ejemplo: Excursión, Alquiler de equipos, Ropa deportiva, etc.
(O ingrese '0' para finalizar):`));
    if (!isNaN(gastoExtra)) {
      if (gastoExtra === 0) {
        continuar = false;
      } else {
        gastosExtras.push(gastoExtra);
      }
    } else {
      alert("Por favor, ingrese un valor numérico válido.");
    }
  }
};

// Llamada a la función para solicitar gastos extras:

solicitarGastosExtras();

// Función para calcular el total de los gastos de comida:

function calcularTotalComida() {
  return gastoPromedioComida * cantidadDiasViaje * cantidadPersonas;
};

// Función para calcular el total de los gastos extras:

function calcularTotalExtras() {
  let porcentajeExtras = 0.5; // 50% de los gastos totales de comida
  let totalComida = calcularTotalComida();
  return totalComida * porcentajeExtras;
};

// Función para calcular datos y mostrar los gastos totales del viaje:

function calcularGastosViaje() {
  let costoTotalComida = calcularTotalComida();
  let costoTotalExtras = calcularTotalExtras();

  let costoTotalAlojamiento = costoAlojamientoPorNoche * cantidadDiasViaje * Math.ceil(cantidadPersonas / 2); // Suponiendo que las habitaciones son para dos personas

  // Pasar los valores a moneda con dos decimales y separador de miles:

  let costoTotalComidaFormateado = costoTotalComida.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  let costoTotalTransporteFormateado = costoTotalTransporte.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  let costoTotalExtrasFormateado = costoTotalExtras.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  let costoTotalAlojamientoFormateado = costoTotalAlojamiento.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  // Alert y Console.log para mostrar gastos por cada rubro:

  alert(`GASTOS POR RUBRO:
    - Traslado: ${costoTotalTransporteFormateado}
    - Alojamiento: ${costoTotalAlojamientoFormateado}
    - Comida: ${costoTotalComidaFormateado}
    - Gastos extras: ${costoTotalExtrasFormateado}`);

  console.log(`GASTOS POR RUBRO:
- Traslado: ${costoTotalTransporteFormateado}
- Alojamiento: ${costoTotalAlojamientoFormateado}
- Comida: ${costoTotalComidaFormateado}
- Gastos extras: ${costoTotalExtrasFormateado}`);

  // Calcular el costo total del viaje:

  let costoTotalViaje = costoTotalComida + costoTotalTransporte + costoTotalExtras + costoTotalAlojamiento;

  // Pasar el costo total del viaje a moneda con dos decimales y separador de miles:

  let costoTotalViajeFormateado = costoTotalViaje.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  // Alert y Console.log para mostrar el costo total del viaje:

  alert(`Para su viaje de ${cantidadDiasViaje} días y ${cantidadPersonas} personas
el costo estimado total es de: ${costoTotalViajeFormateado}`);

  console.log(`Para su viaje de ${cantidadDiasViaje} días y ${cantidadPersonas} personas
el costo estimado total es de: ${costoTotalViajeFormateado}`);
};

// Llamar a la función principal para calcular los gastos del viaje:

calcularGastosViaje();