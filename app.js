/**
 * PORTAL DEMO CLIENTE — FINANZAS PERSONALES
 * JavaScript Vanilla Standalone con Datos Embebidos y Persistencia Local
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CONFIGURACIÓN Y TAXONOMÍA
  // =========================================================================
  const CONFIG = {
    moneda: "BOB",
    simbolo: "Bs",
    fecha_inicio_periodo: "2026-07-01",
    flujos_validos: ["Personal", "Mi Trabajo", "Mis Negocios", "Mis Inversiones"],
    taxonomia: {
      "Personal": {
        "Alimentación": ["Supermercado", "Restaurantes", "Café y antojos"],
        "Transporte": ["Uber/Taxi", "Combustible", "Transporte público"],
        "Entretenimiento": ["Cine", "Streaming", "Salidas"],
        "Tecnología": ["Software/Apps", "Hardware"],
        "Salud": ["Consulta médica", "Medicamentos"],
        "Otros": []
      },
      "Mi Trabajo": {
        "Salario": ["Sueldo Base", "Bono de Producción"],
        "Bonificación": ["Aguinaldo", "Prima"],
        "Otros ingresos": ["Horas Extras", "Viáticos"]
      },
      "Mis Negocios": {
        "Ingresos netos": ["Ventas Directas", "Servicios", "Contratos"],
        "Gastos operativos": ["Materiales", "Logística", "Publicidad"],
        "Reinversión": ["Equipo", "Infraestructura"]
      },
      "Mis Inversiones": {
        "Dividendos": ["Acciones Locales", "Fondos de Inversión", "Renta Fija"],
        "Ganancias de capital": ["Criptoactivos", "Inmuebles"],
        "Gastos de gestión": ["Comisiones", "Mantenimiento"]
      }
    }
  };

  // =========================================================================
  // 2. DATOS EMBEBIDOS (3 MESES: JULIO - SEPTIEMBRE 2026)
  // =========================================================================
  const REGISTROS_BASE = [
    // --- JULIO 2026 ---
    {
      registro_id: "TX-20260701-001",
      fecha: "2026-07-01",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Supermercado",
      detalle: "Compra semanal Hipermaxi",
      proveedor: "Hipermaxi",
      monto: 320,
      cuenta: "Tarjeta de Débito BCP",
      metodo_pago: "Tarjeta de Débito BCP",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-07-01T10:30:00"
    },
    {
      registro_id: "TX-20260703-001",
      fecha: "2026-07-03",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Transporte",
      subcategoria: "Uber/Taxi",
      detalle: "Traslado a reunión de trabajo",
      proveedor: "Uber",
      monto: 65,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-07-03T08:45:00"
    },
    {
      registro_id: "TX-20260705-001",
      fecha: "2026-07-05",
      tipo: "Ingreso",
      flujo: "Mi Trabajo",
      categoria: "Salario",
      subcategoria: "Sueldo Base",
      detalle: "Salario mensual de empresa",
      proveedor: "Empleador Central",
      monto: 10000,
      cuenta: "Cuenta Corriente BCP",
      metodo_pago: "Transferencia Bancaria",
      estado: "Confirmado",
      naturaleza: "Ingreso Activo",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-07-05T09:00:00"
    },
    {
      registro_id: "TX-20260708-001",
      fecha: "2026-07-08",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Entretenimiento",
      subcategoria: "Streaming",
      detalle: "Suscripción Netflix Premium",
      proveedor: "Netflix",
      monto: 85,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Deseo",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-07-08T14:10:00"
    },
    {
      registro_id: "TX-20260710-001",
      fecha: "2026-07-10",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Tecnología",
      subcategoria: "Software/Apps",
      detalle: "Licencia de software productividad",
      proveedor: "Cloud Provider",
      monto: 120,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-07-10T11:20:00"
    },
    {
      registro_id: "TX-20260712-001",
      fecha: "2026-07-12",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Restaurantes",
      detalle: "Cena fin de semana",
      proveedor: "Restaurante La Casona",
      monto: 180,
      cuenta: "Tarjeta de Débito BCP",
      metodo_pago: "Tarjeta de Débito BCP",
      estado: "Confirmado",
      naturaleza: "Deseo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-07-12T20:40:00"
    },
    {
      registro_id: "TX-20260715-001",
      fecha: "2026-07-15",
      tipo: "Ingreso",
      flujo: "Mis Negocios",
      categoria: "Ingresos netos",
      subcategoria: "Servicios",
      detalle: "Cobro cliente Proyecto Secundario",
      proveedor: "Cliente Corporativo",
      monto: 2500,
      cuenta: "Cuenta Ahorros BCP",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Ingreso Negocio",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-07-15T16:00:00"
    },
    {
      registro_id: "TX-20260718-001",
      fecha: "2026-07-18",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Transporte",
      subcategoria: "Combustible",
      detalle: "Carga de combustible mensual",
      proveedor: "GasCenter Estación",
      monto: 200,
      cuenta: "Efectivo",
      metodo_pago: "Efectivo",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-07-18T12:00:00"
    },
    {
      registro_id: "TX-20260720-001",
      fecha: "2026-07-20",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Salud",
      subcategoria: "Medicamentos",
      detalle: "Botiquín y vitaminas",
      proveedor: "Farmacia Farmacorp",
      monto: 90,
      cuenta: "Transferencia QR",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-07-20T17:15:00"
    },
    {
      registro_id: "TX-20260722-001",
      fecha: "2026-07-22",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Café y antojos",
      detalle: "Café de especialidad con cliente",
      proveedor: "Café Typica",
      monto: 40,
      cuenta: "Transferencia QR",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Deseo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-07-22T16:30:00"
    },
    {
      registro_id: "TX-20260725-001",
      fecha: "2026-07-25",
      tipo: "Gasto",
      flujo: "Mis Inversiones",
      categoria: "Gastos de gestión",
      subcategoria: "Comisiones",
      detalle: "Comisión custodia broker",
      proveedor: "Broker Internacional",
      monto: 150,
      cuenta: "Cuenta Inversiones",
      metodo_pago: "Débito Automático",
      estado: "Confirmado",
      naturaleza: "Inversión",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-07-25T09:10:00"
    },
    {
      registro_id: "TX-20260728-001",
      fecha: "2026-07-28",
      tipo: "Ingreso",
      flujo: "Mis Inversiones",
      categoria: "Dividendos",
      subcategoria: "Fondos de Inversión",
      detalle: "Rendimiento trimestral fondo mutuo",
      proveedor: "SAFI Fondo de Inversión",
      monto: 800,
      cuenta: "Cuenta Inversiones",
      metodo_pago: "Depósito",
      estado: "Confirmado",
      naturaleza: "Ingreso Pasivo",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-07-28T15:00:00"
    },

    // --- AGOSTO 2026 ---
    {
      registro_id: "TX-20260802-001",
      fecha: "2026-08-02",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Supermercado",
      detalle: "Abastecimiento mensual",
      proveedor: "Hipermaxi",
      monto: 380,
      cuenta: "Tarjeta de Débito BCP",
      metodo_pago: "Tarjeta de Débito BCP",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-08-02T11:00:00"
    },
    {
      registro_id: "TX-20260805-001",
      fecha: "2026-08-05",
      tipo: "Ingreso",
      flujo: "Mi Trabajo",
      categoria: "Salario",
      subcategoria: "Sueldo Base",
      detalle: "Salario mensual de empresa",
      proveedor: "Empleador Central",
      monto: 10000,
      cuenta: "Cuenta Corriente BCP",
      metodo_pago: "Transferencia Bancaria",
      estado: "Confirmado",
      naturaleza: "Ingreso Activo",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-08-05T09:00:00"
    },
    {
      registro_id: "TX-20260808-001",
      fecha: "2026-08-08",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Entretenimiento",
      subcategoria: "Streaming",
      detalle: "Servicios digitales streaming",
      proveedor: "Spotify & Prime",
      monto: 85,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Deseo",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-08-08T10:15:00"
    },
    {
      registro_id: "TX-20260810-001",
      fecha: "2026-08-10",
      tipo: "Gasto",
      flujo: "Mis Negocios",
      categoria: "Gastos operativos",
      subcategoria: "Materiales",
      detalle: "Compra de insumos y materiales",
      proveedor: "Distribuidora Mayorista",
      monto: 600,
      cuenta: "Cuenta Ahorros BCP",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Operativo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-08-10T14:30:00"
    },
    {
      registro_id: "TX-20260812-001",
      fecha: "2026-08-12",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Tecnología",
      subcategoria: "Software/Apps",
      detalle: "Licencias hosting y servidores",
      proveedor: "Vercel / GitHub",
      monto: 200,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-08-12T13:45:00"
    },
    {
      registro_id: "TX-20260815-001",
      fecha: "2026-08-15",
      tipo: "Ingreso",
      flujo: "Mis Negocios",
      categoria: "Ingresos netos",
      subcategoria: "Ventas Directas",
      detalle: "Entrega Proyecto A culminado",
      proveedor: "Grupo Empresarial",
      monto: 3200,
      cuenta: "Cuenta Ahorros BCP",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Ingreso Negocio",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-08-15T17:20:00"
    },
    {
      registro_id: "TX-20260818-001",
      fecha: "2026-08-18",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Transporte",
      subcategoria: "Uber/Taxi",
      detalle: "Viajes de la semana en Uber",
      proveedor: "Uber",
      monto: 120,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-08-18T19:00:00"
    },
    {
      registro_id: "TX-20260820-001",
      fecha: "2026-08-20",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Salud",
      subcategoria: "Consulta médica",
      detalle: "Chequeo médico de rutina",
      proveedor: "Clínica Los Olivos",
      monto: 250,
      cuenta: "Transferencia QR",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-08-20T10:00:00"
    },
    {
      registro_id: "TX-20260825-001",
      fecha: "2026-08-25",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Restaurantes",
      detalle: "Almuerzo familiar",
      proveedor: "Restaurante Jardín",
      monto: 220,
      cuenta: "Tarjeta de Débito BCP",
      metodo_pago: "Tarjeta de Débito BCP",
      estado: "Confirmado",
      naturaleza: "Deseo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-08-25T14:00:00"
    },
    {
      registro_id: "TX-20260828-001",
      fecha: "2026-08-28",
      tipo: "Ingreso",
      flujo: "Mis Inversiones",
      categoria: "Dividendos",
      subcategoria: "Acciones Locales",
      detalle: "Pago de dividendos Acción XYZ",
      proveedor: "Bolsa de Valores",
      monto: 450,
      cuenta: "Cuenta Inversiones",
      metodo_pago: "Depósito",
      estado: "Confirmado",
      naturaleza: "Ingreso Pasivo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-08-28T16:30:00"
    },

    // --- SEPTIEMBRE 2026 ---
    {
      registro_id: "TX-20260902-001",
      fecha: "2026-09-02",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Supermercado",
      detalle: "Compra de víveres quincena",
      proveedor: "Hipermaxi",
      monto: 350,
      cuenta: "Tarjeta de Débito BCP",
      metodo_pago: "Tarjeta de Débito BCP",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-09-02T10:45:00"
    },
    {
      registro_id: "TX-20260903-001",
      fecha: "2026-09-03",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Transporte",
      subcategoria: "Uber/Taxi",
      detalle: "Taxi nocturno retorno",
      proveedor: "Radio Móvil",
      monto: 75,
      cuenta: "Efectivo",
      metodo_pago: "Efectivo",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-09-03T23:15:00"
    },
    {
      registro_id: "TX-20260905-001",
      fecha: "2026-09-05",
      tipo: "Ingreso",
      flujo: "Mi Trabajo",
      categoria: "Salario",
      subcategoria: "Sueldo Base",
      detalle: "Salario mensual de empresa",
      proveedor: "Empleador Central",
      monto: 10000,
      cuenta: "Cuenta Corriente BCP",
      metodo_pago: "Transferencia Bancaria",
      estado: "Confirmado",
      naturaleza: "Ingreso Activo",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-09-05T09:00:00"
    },
    {
      registro_id: "TX-20260908-001",
      fecha: "2026-09-08",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Entretenimiento",
      subcategoria: "Cine",
      detalle: "Salida al cine estreno y snacks",
      proveedor: "Multicine",
      monto: 120,
      cuenta: "Transferencia QR",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Deseo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-09-08T19:30:00"
    },
    {
      registro_id: "TX-20260910-001",
      fecha: "2026-09-10",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Tecnología",
      subcategoria: "Hardware",
      detalle: "Monitor externo secundario",
      proveedor: "Tienda de Computación",
      monto: 800,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Extraordinario",
      origen: "Demo",
      timestamp: "2026-09-10T15:10:00"
    },
    {
      registro_id: "TX-20260912-001",
      fecha: "2026-09-12",
      tipo: "Ingreso",
      flujo: "Mis Negocios",
      categoria: "Ingresos netos",
      subcategoria: "Contratos",
      detalle: "Adelanto contrato Proyecto B",
      proveedor: "Cliente Soluciones Tech",
      monto: 2800,
      cuenta: "Cuenta Ahorros BCP",
      metodo_pago: "Transferencia QR",
      estado: "Confirmado",
      naturaleza: "Ingreso Negocio",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-09-12T11:00:00"
    },
    {
      registro_id: "TX-20260915-001",
      fecha: "2026-09-15",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Restaurantes",
      detalle: "Cena de negocios/celebración",
      proveedor: "Restaurante Gourmet",
      monto: 280,
      cuenta: "Tarjeta de Crédito",
      metodo_pago: "Tarjeta de Crédito",
      estado: "Confirmado",
      naturaleza: "Deseo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-09-15T21:00:00"
    },
    {
      registro_id: "TX-20260918-001",
      fecha: "2026-09-18",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Transporte",
      subcategoria: "Combustible",
      detalle: "Carga de combustible completo",
      proveedor: "GasCenter Estación",
      monto: 250,
      cuenta: "Efectivo",
      metodo_pago: "Efectivo",
      estado: "Confirmado",
      naturaleza: "Necesario",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-09-18T08:30:00"
    },
    {
      registro_id: "TX-20260920-001",
      fecha: "2026-09-20",
      tipo: "Gasto",
      flujo: "Mis Negocios",
      categoria: "Reinversión",
      subcategoria: "Equipo",
      detalle: "Herramientas de trabajo y periféricos",
      proveedor: "Distribuidora Tech",
      monto: 1200,
      cuenta: "Cuenta Ahorros BCP",
      metodo_pago: "Transferencia Bancaria",
      estado: "Confirmado",
      naturaleza: "Inversión Negocio",
      recurrencia: "Extraordinario",
      origen: "Demo",
      timestamp: "2026-09-20T16:00:00"
    },
    {
      registro_id: "TX-20260922-001",
      fecha: "2026-09-22",
      tipo: "Gasto",
      flujo: "Personal",
      categoria: "Alimentación",
      subcategoria: "Café y antojos",
      detalle: "Café y postre por verificar",
      proveedor: "Cafetería Buena Vista",
      monto: 35,
      cuenta: "Transferencia QR",
      metodo_pago: "Transferencia QR",
      estado: "Pendiente de revisión",
      naturaleza: "Deseo",
      recurrencia: "Ocasional",
      origen: "Demo",
      timestamp: "2026-09-22T17:40:00"
    },
    {
      registro_id: "TX-20260925-001",
      fecha: "2026-09-25",
      tipo: "Ingreso",
      flujo: "Mis Inversiones",
      categoria: "Dividendos",
      subcategoria: "Renta Fija",
      detalle: "Cupón mensual DPF",
      proveedor: "Banco Fiduciario",
      monto: 600,
      cuenta: "Cuenta Inversiones",
      metodo_pago: "Depósito",
      estado: "Confirmado",
      naturaleza: "Ingreso Pasivo",
      recurrencia: "Recurrente",
      origen: "Demo",
      timestamp: "2026-09-25T14:30:00"
    }
  ];

  // Desgloses de compras grandes
  const DETALLES_BASE = [
    {
      detalle_id: "DT-20260701-001",
      registro_id: "TX-20260701-001",
      producto: "Café en grano especial 500g",
      cantidad: 1,
      precio_unitario: 65,
      monto: 65,
      estado: "Confirmado"
    },
    {
      detalle_id: "DT-20260701-002",
      registro_id: "TX-20260701-001",
      producto: "Leche descremada pack x6",
      cantidad: 2,
      precio_unitario: 48,
      monto: 96,
      estado: "Confirmado"
    },
    {
      detalle_id: "DT-20260701-003",
      registro_id: "TX-20260701-001",
      producto: "Frutas y verduras frescas",
      cantidad: 1,
      precio_unitario: 85,
      monto: 85,
      estado: "Confirmado"
    },
    {
      detalle_id: "DT-20260701-004",
      registro_id: "TX-20260701-001",
      producto: "Artículos de limpieza hogar",
      cantidad: 1,
      precio_unitario: 74,
      monto: 74,
      estado: "Confirmado"
    },
    {
      detalle_id: "DT-20260802-001",
      registro_id: "TX-20260802-001",
      producto: "Carnes magras y proteínas",
      cantidad: 1,
      precio_unitario: 140,
      monto: 140,
      estado: "Confirmado"
    },
    {
      detalle_id: "DT-20260802-002",
      registro_id: "TX-20260802-001",
      producto: "Abarrotes y granos integrales",
      cantidad: 1,
      precio_unitario: 110,
      monto: 110,
      estado: "Confirmado"
    },
    {
      detalle_id: "DT-20260802-003",
      registro_id: "TX-20260802-001",
      producto: "Lácteos y quesos",
      cantidad: 1,
      precio_unitario: 130,
      monto: 130,
      estado: "Confirmado"
    }
  ];

  const STORAGE_KEY = "finanzas_demo_registros_nueva";
  const THEME_KEY = "finanzas_demo_theme";

  // =========================================================================
  // 3. ESTADO DE LA APLICACIÓN
  // =========================================================================
  let state = {
    registros: [],
    detalles: [...DETALLES_BASE],
    filtroArea: "Dashboard", // "Dashboard" o cualquier flujo ("Mi Trabajo", "Mis Negocios", etc.)
    filtros: {
      periodo: "3m",
      fechaInicio: "2026-07-01",
      fechaFin: "2026-09-30",
      flujo: "Todos",
      estado: "Confirmado",
      busqueda: ""
    }
  };

  // Instancias de Gráficos Chart.js
  let chartEvolucionInstance = null;
  let chartCategoriasInstance = null;
  let chartIngresosFlujoInstance = null;

  // =========================================================================
  // 4. PERSISTENCIA EN LOCALSTORAGE CON TRY/CATCH SEGURO
  // =========================================================================
  function cargarDesdeLocalStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.registros = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn("Error leyendo de localStorage, usando datos base:", e);
    }
    // Fallback a datos base
    state.registros = JSON.parse(JSON.stringify(REGISTROS_BASE));
    guardarEnLocalStorage();
  }

  function guardarEnLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.registros));
    } catch (e) {
      console.error("Error guardando en localStorage:", e);
      mostrarToast("⚠️ No se pudo guardar la sesión en tu navegador.", "warning");
    }
  }

  // =========================================================================
  // 5. FILTRADO Y CÁLCULO DE KPIS
  // =========================================================================
  function obtenerRegistrosFiltrados() {
    return state.registros.filter(item => {
      // 1. Filtro por Área Activa (si no estamos en Dashboard Global)
      if (state.filtroArea !== "Dashboard" && item.flujo !== state.filtroArea) {
        return false;
      }

      // 2. Filtro por Flujo secundario (si se usa en la barra de filtros)
      if (state.filtros.flujo !== "Todos" && item.flujo !== state.filtros.flujo) {
        return false;
      }

      // 3. Filtro de Estado
      if (state.filtros.estado !== "Todos" && item.estado !== state.filtros.estado) {
        return false;
      }

      // 4. Filtro por Periodo / Fecha
      const fecha = item.fecha;
      if (state.filtros.periodo === "2026-09") {
        if (!fecha.startsWith("2026-09")) return false;
      } else if (state.filtros.periodo === "2026-08") {
        if (!fecha.startsWith("2026-08")) return false;
      } else if (state.filtros.periodo === "2026-07") {
        if (!fecha.startsWith("2026-07")) return false;
      } else if (state.filtros.periodo === "custom") {
        if (fecha < state.filtros.fechaInicio || fecha > state.filtros.fechaFin) return false;
      }

      // 5. Filtro de Búsqueda de texto
      if (state.filtros.busqueda.trim() !== "") {
        const query = state.filtros.busqueda.toLowerCase();
        const matchDetalle = item.detalle ? item.detalle.toLowerCase().includes(query) : false;
        const matchProveedor = item.proveedor ? item.proveedor.toLowerCase().includes(query) : false;
        const matchCat = item.categoria ? item.categoria.toLowerCase().includes(query) : false;
        if (!matchDetalle && !matchProveedor && !matchCat) return false;
      }

      return true;
    });
  }

  function calcularKPIs(registrosFiltrados) {
    const ingresos = registrosFiltrados
      .filter(r => r.tipo === "Ingreso" && r.estado === "Confirmado")
      .reduce((sum, r) => sum + Number(r.monto), 0);

    const gastos = registrosFiltrados
      .filter(r => r.tipo === "Gasto" && r.estado === "Confirmado")
      .reduce((sum, r) => sum + Number(r.monto), 0);

    const balance = ingresos - gastos;
    const tasaAhorro = ingresos > 0 ? ((balance / ingresos) * 100).toFixed(1) : "0.0";

    // Conteo de pendientes en la selección
    const pendientes = registrosFiltrados.filter(r => r.estado === "Pendiente de revisión");
    const countPendientes = pendientes.length;
    const sumPendientes = pendientes.reduce((sum, r) => sum + Number(r.monto), 0);

    return { ingresos, gastos, balance, tasaAhorro, countPendientes, sumPendientes };
  }

  // =========================================================================
  // 6. RENDERIZADO DE LA INTERFAZ
  // =========================================================================
  function renderizarTodo() {
    const registrosFiltrados = obtenerRegistrosFiltrados();
    const kpis = calcularKPIs(registrosFiltrados);

    renderizarBannerArea();
    renderizarAlertaPendientes(kpis);
    renderizarKPIs(kpis);
    renderizarGraficos(registrosFiltrados);
    renderizarTablaFlujos();
    renderizarTablaMovimientos(registrosFiltrados);
  }

  function formatMonto(monto) {
    return `${CONFIG.simbolo} ${Number(monto).toLocaleString("es-BO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function renderizarBannerArea() {
    const banner = document.getElementById("areaHeaderBanner");
    const title = document.getElementById("areaBannerTitle");
    const desc = document.getElementById("areaBannerDesc");
    const flowSection = document.getElementById("flowSummarySection");

    if (state.filtroArea === "Dashboard") {
      banner.style.display = "none";
      if (flowSection) flowSection.style.display = "block";
    } else {
      banner.style.display = "block";
      if (flowSection) flowSection.style.display = "none";

      title.textContent = `Área: ${state.filtroArea}`;
      switch (state.filtroArea) {
        case "Mi Trabajo":
          desc.textContent = "Seguimiento de salarios, bonificaciones laborales e ingresos en relación de dependencia.";
          break;
        case "Mis Negocios":
          desc.textContent = "Ingresos netos por contratos/servicios, gastos operativos, adquisición de insumos y reinversión.";
          break;
        case "Mis Inversiones":
          desc.textContent = "Rendimientos de fondos mutuos, dividendos por acciones locales y costos de custodia bursátil.";
          break;
        case "Personal":
          desc.textContent = "Gestión de estilo de vida: alimentación, transporte, entretenimiento, salud y tecnología.";
          break;
        default:
          desc.textContent = "Visualización filtrada por área patrimonial.";
      }
    }
  }

  function renderizarAlertaPendientes(kpis) {
    const banner = document.getElementById("pendingAlertBanner");
    const countSpan = document.getElementById("pendingCount");
    const sumSpan = document.getElementById("pendingSum");

    if (kpis.countPendientes > 0) {
      banner.style.display = "flex";
      countSpan.textContent = kpis.countPendientes;
      sumSpan.textContent = formatMonto(kpis.sumPendientes);
    } else {
      banner.style.display = "none";
    }
  }

  function renderizarKPIs(kpis) {
    document.getElementById("kpiIngresos").textContent = formatMonto(kpis.ingresos);
    document.getElementById("kpiGastos").textContent = formatMonto(kpis.gastos);
    document.getElementById("kpiBalance").textContent = formatMonto(kpis.balance);

    const ahorroEl = document.getElementById("kpiAhorro");
    const ahorroBar = document.getElementById("kpiAhorroBar");
    ahorroEl.textContent = `${kpis.tasaAhorro}%`;

    const pctNum = Math.max(0, Math.min(100, parseFloat(kpis.tasaAhorro)));
    ahorroBar.style.width = `${pctNum}%`;

    // Clases dinámicas según balance
    const balanceSub = document.getElementById("kpiBalanceSub");
    if (kpis.balance >= 0) {
      balanceSub.className = "kpi-footer text-success";
      balanceSub.textContent = "Superávit neto acumulado";
    } else {
      balanceSub.className = "kpi-footer text-danger";
      balanceSub.textContent = "Déficit en el período";
    }
  }

  // =========================================================================
  // 7. GRÁFICOS CHART.JS
  // =========================================================================
  function getThemeColors() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      textColor: isDark ? "#cbd5e1" : "#475569",
      gridColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
      fontFamily: "'Inter', sans-serif"
    };
  }

  function renderizarGraficos(registrosFiltrados) {
    const theme = getThemeColors();

    // -------------------------------------------------------------
    // GRÁFICO 1: Evolución Temporal (Líneas por Mes)
    // -------------------------------------------------------------
    const mesesMap = { "2026-07": { ing: 0, gas: 0 }, "2026-08": { ing: 0, gas: 0 }, "2026-09": { ing: 0, gas: 0 } };

    registrosFiltrados.forEach(r => {
      if (r.estado !== "Confirmado") return;
      const mesKey = r.fecha.substring(0, 7);
      if (!mesesMap[mesKey]) {
        mesesMap[mesKey] = { ing: 0, gas: 0 };
      }
      if (r.tipo === "Ingreso") {
        mesesMap[mesKey].ing += Number(r.monto);
      } else if (r.tipo === "Gasto") {
        mesesMap[mesKey].gas += Number(r.monto);
      }
    });

    const labelsMeses = Object.keys(mesesMap).sort();
    const nombresMeses = labelsMeses.map(m => {
      const parts = m.split("-");
      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      return `${monthNames[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
    });

    const dataIngresos = labelsMeses.map(m => mesesMap[m].ing);
    const dataGastos = labelsMeses.map(m => mesesMap[m].gas);

    const ctxEvolucion = document.getElementById("chartEvolucion").getContext("2d");
    if (chartEvolucionInstance) chartEvolucionInstance.destroy();

    chartEvolucionInstance = new Chart(ctxEvolucion, {
      type: "line",
      data: {
        labels: nombresMeses,
        datasets: [
          {
            label: "Ingresos (BOB)",
            data: dataIngresos,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            borderWidth: 3,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: "#10b981",
            pointRadius: 5
          },
          {
            label: "Gastos (BOB)",
            data: dataGastos,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            borderWidth: 3,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: "#ef4444",
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { color: theme.textColor, font: { family: theme.fontFamily, weight: 600 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${formatMonto(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor, font: { family: theme.fontFamily } }
          },
          y: {
            grid: { color: theme.gridColor },
            ticks: {
              color: theme.textColor,
              font: { family: theme.fontFamily },
              callback: (val) => `${CONFIG.simbolo} ${val.toLocaleString()}`
            }
          }
        }
      }
    });

    // -------------------------------------------------------------
    // GRÁFICO 2: Gastos por Categoría (Barras)
    // -------------------------------------------------------------
    const catGastosMap = {};
    registrosFiltrados.forEach(r => {
      if (r.tipo === "Gasto" && r.estado === "Confirmado") {
        const cat = r.categoria || "Otros";
        catGastosMap[cat] = (catGastosMap[cat] || 0) + Number(r.monto);
      }
    });

    // Ordenar de mayor a menor y tomar top
    const sortedCats = Object.keys(catGastosMap).sort((a, b) => catGastosMap[b] - catGastosMap[a]);
    const catLabels = sortedCats.slice(0, 6);
    const catData = catLabels.map(c => catGastosMap[c]);

    const ctxCategorias = document.getElementById("chartCategorias").getContext("2d");
    if (chartCategoriasInstance) chartCategoriasInstance.destroy();

    const barColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#64748b"];

    chartCategoriasInstance = new Chart(ctxCategorias, {
      type: "bar",
      data: {
        labels: catLabels.length > 0 ? catLabels : ["Sin datos"],
        datasets: [
          {
            label: "Monto de Gasto (BOB)",
            data: catData.length > 0 ? catData : [0],
            backgroundColor: barColors.slice(0, catLabels.length),
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Gasto: ${formatMonto(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: theme.textColor, font: { family: theme.fontFamily } }
          },
          y: {
            grid: { color: theme.gridColor },
            ticks: {
              color: theme.textColor,
              font: { family: theme.fontFamily },
              callback: (val) => `${CONFIG.simbolo} ${val.toLocaleString()}`
            }
          }
        }
      }
    });

    // -------------------------------------------------------------
    // GRÁFICO 3: Distribución de Ingresos por Flujo (Dona)
    // -------------------------------------------------------------
    const flujoIngMap = {};
    CONFIG.flujos_validos.forEach(f => { flujoIngMap[f] = 0; });

    registrosFiltrados.forEach(r => {
      if (r.tipo === "Ingreso" && r.estado === "Confirmado") {
        const fl = r.flujo || "Personal";
        flujoIngMap[fl] = (flujoIngMap[fl] || 0) + Number(r.monto);
      }
    });

    const flujoLabels = Object.keys(flujoIngMap).filter(f => flujoIngMap[f] > 0);
    const flujoData = flujoLabels.map(f => flujoIngMap[f]);

    const ctxIngresosFlujo = document.getElementById("chartIngresosFlujo").getContext("2d");
    if (chartIngresosFlujoInstance) chartIngresosFlujoInstance.destroy();

    const donutColors = ["#f59e0b", "#10b981", "#8b5cf6", "#3b82f6"];

    chartIngresosFlujoInstance = new Chart(ctxIngresosFlujo, {
      type: "doughnut",
      data: {
        labels: flujoLabels.length > 0 ? flujoLabels : ["Sin Ingresos"],
        datasets: [
          {
            data: flujoData.length > 0 ? flujoData : [1],
            backgroundColor: flujoLabels.length > 0 ? donutColors.slice(0, flujoLabels.length) : ["#94a3b8"],
            borderWidth: 2,
            borderColor: document.documentElement.getAttribute("data-theme") === "dark" ? "#111827" : "#ffffff"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: theme.textColor, font: { family: theme.fontFamily, size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${formatMonto(ctx.parsed)}`
            }
          }
        },
        cutout: "68%"
      }
    });
  }

  // =========================================================================
  // 8. TABLAS DE DATOS
  // =========================================================================
  function renderizarTablaFlujos() {
    const tbody = document.getElementById("tbodyResumenFlujos");
    if (!tbody) return;
    tbody.innerHTML = "";

    const periodFilter = state.filtros.periodo;
    const activeRecords = state.registros.filter(r => {
      if (r.estado !== "Confirmado") return false;
      if (periodFilter === "2026-09" && !r.fecha.startsWith("2026-09")) return false;
      if (periodFilter === "2026-08" && !r.fecha.startsWith("2026-08")) return false;
      if (periodFilter === "2026-07" && !r.fecha.startsWith("2026-07")) return false;
      if (periodFilter === "custom" && (r.fecha < state.filtros.fechaInicio || r.fecha > state.filtros.fechaFin)) return false;
      return true;
    });

    const totalIngresosGlobal = activeRecords
      .filter(r => r.tipo === "Ingreso")
      .reduce((s, r) => s + Number(r.monto), 0);

    CONFIG.flujos_validos.forEach(flujo => {
      const flujoTxs = activeRecords.filter(r => r.flujo === flujo);
      const ing = flujoTxs.filter(r => r.tipo === "Ingreso").reduce((s, r) => s + Number(r.monto), 0);
      const gas = flujoTxs.filter(r => r.tipo === "Gasto").reduce((s, r) => s + Number(r.monto), 0);
      const net = ing - gas;
      const part = totalIngresosGlobal > 0 ? ((ing / totalIngresosGlobal) * 100).toFixed(1) : "0.0";

      let badgeFlowClass = "badge-flow-personal";
      if (flujo === "Mi Trabajo") badgeFlowClass = "badge-flow-trabajo";
      if (flujo === "Mis Negocios") badgeFlowClass = "badge-flow-negocios";
      if (flujo === "Mis Inversiones") badgeFlowClass = "badge-flow-inversiones";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="badge-flow ${badgeFlowClass}">${flujo}</span></td>
        <td class="text-right text-success font-medium">${formatMonto(ing)}</td>
        <td class="text-right text-danger font-medium">${formatMonto(gas)}</td>
        <td class="text-right font-bold ${net >= 0 ? "text-success" : "text-danger"}">${formatMonto(net)}</td>
        <td class="text-right font-medium">${part}%</td>
        <td class="text-center">
          <span class="badge-status confirmed">✓ Operativo</span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderizarTablaMovimientos(registrosFiltrados) {
    const tbody = document.getElementById("tbodyMovimientos");
    const countBadge = document.getElementById("txCountBadge");
    const emptyState = document.getElementById("emptyState");

    tbody.innerHTML = "";
    countBadge.textContent = `${registrosFiltrados.length} movimientos`;

    if (registrosFiltrados.length === 0) {
      emptyState.style.display = "block";
      return;
    }
    emptyState.style.display = "none";

    // Ordenar por fecha descendente
    const sorted = [...registrosFiltrados].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    sorted.forEach(r => {
      const tr = document.createElement("tr");
      if (r.estado === "Pendiente de revisión") {
        tr.classList.add("row-pending");
      }

      const isIncome = r.tipo === "Ingreso";
      const montoFormatted = `${isIncome ? "+ " : "- "}${formatMonto(r.monto)}`;
      const montoClass = isIncome ? "text-success font-bold" : "text-danger font-bold";

      let badgeFlowClass = "badge-flow-personal";
      if (r.flujo === "Mi Trabajo") badgeFlowClass = "badge-flow-trabajo";
      if (r.flujo === "Mis Negocios") badgeFlowClass = "badge-flow-negocios";
      if (r.flujo === "Mis Inversiones") badgeFlowClass = "badge-flow-inversiones";

      const hasDetails = state.detalles.some(d => d.registro_id === r.registro_id);

      tr.innerHTML = `
        <td class="font-medium">${formatearFechaCorta(r.fecha)}</td>
        <td><span class="badge-flow ${badgeFlowClass}">${r.flujo}</span></td>
        <td>
          <div class="font-medium">${r.categoria || "—"}</div>
          <div class="text-xs text-muted">${r.subcategoria || ""}</div>
        </td>
        <td>
          <div class="font-medium">${escapeHtml(r.detalle || "")}</div>
          <div class="text-xs text-muted">${escapeHtml(r.proveedor || "Sin proveedor")}</div>
        </td>
        <td class="text-right ${montoClass}">${montoFormatted}</td>
        <td class="text-center">
          ${r.estado === "Confirmado"
            ? '<span class="badge-status confirmed">✓ Confirmado</span>'
            : '<span class="badge-status pending">⚠️ Pendiente</span>'}
        </td>
        <td class="text-center">
          <div class="table-row-actions">
            ${hasDetails ? `<button class="btn-action btn-action-details" data-id="${r.registro_id}" title="Ver desglose de compra">👁️</button>` : ""}
            <button class="btn-action btn-action-edit" data-id="${r.registro_id}" title="Editar movimiento">✏️</button>
            <button class="btn-action btn-action-delete" data-id="${r.registro_id}" title="Eliminar movimiento">🗑️</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Conectar eventos a los botones de la tabla
    tbody.querySelectorAll(".btn-action-details").forEach(btn => {
      btn.addEventListener("click", () => mostrarDetallesModal(btn.getAttribute("data-id")));
    });

    tbody.querySelectorAll(".btn-action-edit").forEach(btn => {
      btn.addEventListener("click", () => abrirModalEdicion(btn.getAttribute("data-id")));
    });

    tbody.querySelectorAll(".btn-action-delete").forEach(btn => {
      btn.addEventListener("click", () => eliminarMovimiento(btn.getAttribute("data-id")));
    });
  }

  function formatearFechaCorta(fechaStr) {
    if (!fechaStr) return "";
    const parts = fechaStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return fechaStr;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // 9. GESTIÓN DE MODALES (REGISTRO / EDICIÓN / DESGLOSE)
  // =========================================================================
  const modalTx = document.getElementById("modalTx");
  const formTx = document.getElementById("formTx");
  const modalDetails = document.getElementById("modalDetails");

  function actualizarSelectCategorias(flujoSeleccionado, categoriaPrevia, subcategoriaPrevia) {
    const selectCat = document.getElementById("txCategoria");
    const selectSub = document.getElementById("txSubcategoria");
    selectCat.innerHTML = "";
    selectSub.innerHTML = "";

    const cats = CONFIG.taxonomia[flujoSeleccionado] || {};
    const catKeys = Object.keys(cats);

    catKeys.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      if (categoriaPrevia && categoriaPrevia === cat) opt.selected = true;
      selectCat.appendChild(opt);
    });

    actualizarSelectSubcategorias(flujoSeleccionado, selectCat.value, subcategoriaPrevia);
  }

  function actualizarSelectSubcategorias(flujoSeleccionado, categoriaSeleccionada, subcategoriaPrevia) {
    const selectSub = document.getElementById("txSubcategoria");
    selectSub.innerHTML = "";

    const subs = (CONFIG.taxonomia[flujoSeleccionado] && CONFIG.taxonomia[flujoSeleccionado][categoriaSeleccionada]) || [];
    if (subs.length === 0) {
      const opt = document.createElement("option");
      opt.value = "General";
      opt.textContent = "General";
      selectSub.appendChild(opt);
      return;
    }

    subs.forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.textContent = sub;
      if (subcategoriaPrevia && subcategoriaPrevia === sub) opt.selected = true;
      selectSub.appendChild(opt);
    });
  }

  function abrirModalNuevo() {
    document.getElementById("modalTxTitle").textContent = "Registrar Nuevo Movimiento";
    document.getElementById("txIdHidden").value = "";
    formTx.reset();

    const flujoDefault = state.filtroArea !== "Dashboard" ? state.filtroArea : "Personal";
    document.getElementById("txFlujo").value = flujoDefault;
    document.querySelector("input[name='txTipo'][value='Gasto']").checked = true;
    document.getElementById("txFecha").value = new Date().toISOString().split("T")[0];
    document.getElementById("txEstado").value = "Confirmado";

    actualizarSelectCategorias(flujoDefault);
    modalTx.classList.add("active");
  }

  function abrirModalEdicion(registroId) {
    const tx = state.registros.find(r => r.registro_id === registroId);
    if (!tx) return;

    document.getElementById("modalTxTitle").textContent = "Editar Movimiento";
    document.getElementById("txIdHidden").value = tx.registro_id;

    const radioTipo = document.querySelector(`input[name='txTipo'][value='${tx.tipo}']`);
    if (radioTipo) radioTipo.checked = true;

    document.getElementById("txFlujo").value = tx.flujo;
    document.getElementById("txFecha").value = tx.fecha;
    document.getElementById("txMonto").value = tx.monto;
    document.getElementById("txDetalle").value = tx.detalle || "";
    document.getElementById("txProveedor").value = tx.proveedor || "";
    document.getElementById("txMetodo").value = tx.metodo_pago || "Efectivo";
    document.getElementById("txEstado").value = tx.estado || "Confirmado";

    actualizarSelectCategorias(tx.flujo, tx.categoria, tx.subcategoria);
    modalTx.classList.add("active");
  }

  function cerrarModalTx() {
    modalTx.classList.remove("active");
  }

  function generarRegistroId(fecha) {
    const fechaStr = (fecha || "20260904").replace(/-/g, '').slice(0, 8);
    const contador = state.registros.filter(r => r.fecha.startsWith(fecha.slice(0, 10))).length + 1;
    return `TX-${fechaStr}-${String(contador).padStart(3, '0')}`;
  }

  function manejarGuardarMovimiento(e) {
    e.preventDefault();

    const txId = document.getElementById("txIdHidden").value;
    const tipo = document.querySelector("input[name='txTipo']:checked").value;
    const flujo = document.getElementById("txFlujo").value;
    const fecha = document.getElementById("txFecha").value;
    const monto = parseFloat(document.getElementById("txMonto").value);
    const categoria = document.getElementById("txCategoria").value;
    const subcategoria = document.getElementById("txSubcategoria").value;
    const detalle = document.getElementById("txDetalle").value.trim();
    const proveedor = document.getElementById("txProveedor").value.trim();
    const metodo = document.getElementById("txMetodo").value;
    const estado = document.getElementById("txEstado").value;

    if (!monto || monto <= 0) {
      mostrarToast("⚠️ El monto debe ser un valor numérico positivo mayor a 0.", "warning");
      return;
    }

    if (!detalle) {
      mostrarToast("⚠️ La descripción o detalle es obligatoria.", "warning");
      return;
    }

    if (txId) {
      // Edición
      const idx = state.registros.findIndex(r => r.registro_id === txId);
      if (idx !== -1) {
        state.registros[idx] = {
          ...state.registros[idx],
          tipo,
          flujo,
          fecha,
          monto,
          categoria,
          subcategoria,
          detalle,
          proveedor,
          metodo_pago: metodo,
          estado
        };
        mostrarToast(`✓ Movimiento editado exitosamente: ${detalle}`, "success");
      }
    } else {
      // Creación
      const nuevoMov = {
        registro_id: generarRegistroId(fecha),
        fecha,
        tipo,
        flujo,
        categoria,
        subcategoria,
        detalle,
        proveedor,
        monto,
        cuenta: metodo,
        metodo_pago: metodo,
        estado,
        naturaleza: tipo === "Ingreso" ? "Ingreso" : "Necesario",
        recurrencia: "Ocasional",
        origen: "Demo Cliente",
        timestamp: new Date().toISOString()
      };
      state.registros.unshift(nuevoMov);
      mostrarToast(`✓ Nuevo movimiento registrado: ${detalle} (Bs ${monto.toFixed(2)})`, "success");
    }

    guardarEnLocalStorage();
    renderizarTodo();
    cerrarModalTx();
  }

  function eliminarMovimiento(registroId) {
    const tx = state.registros.find(r => r.registro_id === registroId);
    if (!tx) return;

    if (confirm(`¿Estás seguro de eliminar el movimiento "${tx.detalle}" por ${formatMonto(tx.monto)}?`)) {
      state.registros = state.registros.filter(r => r.registro_id !== registroId);
      guardarEnLocalStorage();
      renderizarTodo();
      mostrarToast(`🗑️ Movimiento eliminado: ${tx.detalle}`, "warning");
    }
  }

  function mostrarDetallesModal(registroId) {
    const tx = state.registros.find(r => r.registro_id === registroId);
    const subitems = state.detalles.filter(d => d.registro_id === registroId);
    if (!tx || subitems.length === 0) return;

    document.getElementById("detailTxSummary").textContent = `${tx.detalle} • ${formatearFechaCorta(tx.fecha)} • Total: ${formatMonto(tx.monto)}`;
    const tbody = document.getElementById("tbodyDetallesDesglose");
    tbody.innerHTML = "";

    subitems.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="font-medium">${escapeHtml(item.producto)}</td>
        <td class="text-center">${item.cantidad}</td>
        <td class="text-right text-muted">${formatMonto(item.precio_unitario)}</td>
        <td class="text-right font-bold text-danger">${formatMonto(item.monto)}</td>
      `;
      tbody.appendChild(tr);
    });

    modalDetails.classList.add("active");
  }

  function cerrarModalDetalles() {
    modalDetails.classList.remove("active");
  }

  // =========================================================================
  // 10. EXPORTACIÓN A CSV
  // =========================================================================
  function exportarACSV() {
    const registrosFiltrados = obtenerRegistrosFiltrados();
    if (registrosFiltrados.length === 0) {
      mostrarToast("⚠️ No hay movimientos para exportar con los filtros actuales.", "warning");
      return;
    }

    const headers = ["ID", "Fecha", "Tipo", "Flujo", "Categoria", "Subcategoria", "Detalle", "Proveedor", "Monto", "Metodo_Pago", "Estado"];
    const rows = registrosFiltrados.map(r => [
      `"${r.registro_id}"`,
      `"${r.fecha}"`,
      `"${r.tipo}"`,
      `"${r.flujo}"`,
      `"${r.categoria || ""}"`,
      `"${r.subcategoria || ""}"`,
      `"${(r.detalle || "").replace(/"/g, '""')}"`,
      `"${(r.proveedor || "").replace(/"/g, '""')}"`,
      r.monto,
      `"${r.metodo_pago || ""}"`,
      `"${r.estado}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,﻿" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `finanzas_demo_${state.filtroArea.toLowerCase()}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    mostrarToast("📥 Archivo CSV descargado con éxito.", "success");
  }

  // =========================================================================
  // 11. GESTIÓN DE TEMAS (DARK / LIGHT) & TOASTS
  // =========================================================================
  function initTheme() {
    let savedTheme = "light";
    try {
      savedTheme = localStorage.getItem(THEME_KEY) || "light";
    } catch (e) {}

    document.documentElement.setAttribute("data-theme", savedTheme);
    actualizarIconoTema(savedTheme);

    document.getElementById("themeToggle").addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
      actualizarIconoTema(next);
      renderizarGraficos(obtenerRegistrosFiltrados());
    });
  }

  function actualizarIconoTema(theme) {
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function mostrarToast(mensaje, tipo = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // 12. INICIALIZACIÓN Y EVENT LISTENERS
  // =========================================================================
  function inicializar() {
    cargarDesdeLocalStorage();
    initTheme();

    // Eventos de Pestañas de Área
    document.querySelectorAll(".nav-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        state.filtroArea = tab.getAttribute("data-area");
        renderizarTodo();
      });
    });

    // Eventos de Filtros Globales
    const filterPeriodo = document.getElementById("filterPeriodo");
    const customRange = document.getElementById("customDateRange");
    const dateStart = document.getElementById("dateStart");
    const dateEnd = document.getElementById("dateEnd");
    const filterFlujo = document.getElementById("filterFlujo");
    const filterEstado = document.getElementById("filterEstado");
    const filterSearch = document.getElementById("filterSearch");
    const btnResetFilters = document.getElementById("btnResetFilters");

    filterPeriodo.addEventListener("change", () => {
      state.filtros.periodo = filterPeriodo.value;
      customRange.style.display = filterPeriodo.value === "custom" ? "flex" : "none";
      renderizarTodo();
    });

    dateStart.addEventListener("change", () => {
      state.filtros.fechaInicio = dateStart.value;
      renderizarTodo();
    });

    dateEnd.addEventListener("change", () => {
      state.filtros.fechaFin = dateEnd.value;
      renderizarTodo();
    });

    filterFlujo.addEventListener("change", () => {
      state.filtros.flujo = filterFlujo.value;
      renderizarTodo();
    });

    filterEstado.addEventListener("change", () => {
      state.filtros.estado = filterEstado.value;
      renderizarTodo();
    });

    filterSearch.addEventListener("input", () => {
      state.filtros.busqueda = filterSearch.value;
      renderizarTodo();
    });

    btnResetFilters.addEventListener("click", () => {
      filterPeriodo.value = "3m";
      customRange.style.display = "none";
      filterFlujo.value = "Todos";
      filterEstado.value = "Confirmado";
      filterSearch.value = "";
      state.filtros = {
        periodo: "3m",
        fechaInicio: "2026-07-01",
        fechaFin: "2026-09-30",
        flujo: "Todos",
        estado: "Confirmado",
        busqueda: ""
      };
      renderizarTodo();
      mostrarToast("Filtros restablecidos.", "info");
    });

    // Botón de banner de pendientes
    document.getElementById("btnShowPendingOnly").addEventListener("click", () => {
      filterEstado.value = "Pendiente de revisión";
      state.filtros.estado = "Pendiente de revisión";
      renderizarTodo();
    });

    // Eventos Modal Registro
    document.getElementById("btnOpenNewTx").addEventListener("click", abrirModalNuevo);
    document.getElementById("btnCloseModalTx").addEventListener("click", cerrarModalTx);
    document.getElementById("btnCancelModalTx").addEventListener("click", cerrarModalTx);
    formTx.addEventListener("submit", manejarGuardarMovimiento);

    document.getElementById("txFlujo").addEventListener("change", (e) => {
      actualizarSelectCategorias(e.target.value);
    });

    document.getElementById("txCategoria").addEventListener("change", (e) => {
      const flujo = document.getElementById("txFlujo").value;
      actualizarSelectSubcategorias(flujo, e.target.value);
    });

    // Eventos Modal Detalles
    document.getElementById("btnCloseModalDetails").addEventListener("click", cerrarModalDetalles);
    document.getElementById("btnCloseDetailsBtn").addEventListener("click", cerrarModalDetalles);

    // Evento Exportar CSV
    document.getElementById("btnExportCsv").addEventListener("click", exportarACSV);

    // Restablecer Datos Demo
    document.getElementById("btnResetDemoData").addEventListener("click", () => {
      if (confirm("¿Deseas restaurar todos los datos a la versión inicial de la demo (35 movimientos base)?")) {
        state.registros = JSON.parse(JSON.stringify(REGISTROS_BASE));
        guardarEnLocalStorage();
        renderizarTodo();
        mostrarToast("✓ Datos iniciales de la demo restaurados.", "success");
      }
    });

    // Render Inicial
    renderizarTodo();
  }

  // Ejecución al cargar DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
  } else {
    inicializar();
  }
})();
