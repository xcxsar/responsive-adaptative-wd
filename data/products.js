/**
 * Catálogo de Hardware / Componentes de Servidor
 * 12 productos con especificaciones técnicas completas y métricas de benchmark
 * Las imágenes utilizan la API de Unsplash con parámetros de optimización dinámica (w, fm, q)
 */

const products = [
  {
    id: 1,
    name: "AMD EPYC™ 9654 Genoa",
    category: "processor",
    categoryLabel: "Procesadores",
    badge: "96 Cores / 192 Threads",
    price: "$11,805 USD",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
    shortSpecs: {
      "Núcleos / Hilos": "96C / 192T",
      "Frecuencia Base / Boost": "2.40 GHz / 3.70 GHz",
      "Caché L3": "384 MB",
      "TDP": "360W (Socket SP5)"
    },
    fullSpecs: [
      { key: "Arquitectura", val: "Zen 4 (5nm FinFET)" },
      { key: "Líneas PCIe", val: "128x PCIe 5.0" },
      { key: "Soporte de Memoria", val: "DDR5-4800 (12 Canales, hasta 6TB)" },
      { key: "Seguridad por Hardware", val: "AMD Infinity Guard, SEV-SNP, SME" },
      { key: "Throughput FP64", val: "5.68 TFLOPS" },
      { key: "Factor de Forma de Socket", val: "LGA 6096 (Socket SP5)" }
    ],
    benchmarkScore: 98,
    benchmarkMetric: "98k SpecInt Rate"
  },
  {
    id: 2,
    name: "Intel® Xeon® Platinum 8490H",
    category: "processor",
    categoryLabel: "Procesadores",
    badge: "Sapphire Rapids",
    price: "$17,000 USD",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    shortSpecs: {
      "Núcleos / Hilos": "60C / 120T",
      "Frecuencia Base / Max Turbo": "1.90 GHz / 3.50 GHz",
      "Caché L3": "112.5 MB Intel Smart Cache",
      "TDP": "350W (LGA4677)"
    },
    fullSpecs: [
      { key: "Aceleradores Integrados", val: "Intel AMX, QAT, DLB, DSA" },
      { key: "Líneas PCIe", val: "80x PCIe 5.0 con soporte CXL 1.1" },
      { key: "Soporte de Memoria", val: "DDR5-4800 (8 Canales, hasta 4TB)" },
      { key: "Enlace UPI", val: "4 enlaces Intel UPI a 16 GT/s" },
      { key: "Aceleración AI", val: "Intel Advanced Matrix Extensions (AMX/BF16)" },
      { key: "Enclave Seguro", val: "Intel SGX con 512 GB Enclave Page Cache" }
    ],
    benchmarkScore: 91,
    benchmarkMetric: "91k SpecInt Rate"
  },
  {
    id: 3,
    name: "NVIDIA H100 SXM5 80GB",
    category: "gpu",
    categoryLabel: "Aceleradores & GPUs",
    badge: "Tensor Core Hopper",
    price: "$33,500 USD",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    shortSpecs: {
      "VRAM": "80GB HBM3",
      "Ancho de Banda de Memoria": "3.35 TB/s",
      "Rendimiento FP8": "2,000 TFLOPS",
      "TDP": "700W SXM5"
    },
    fullSpecs: [
      { key: "Arquitectura GPU", val: "NVIDIA Hopper (TSMC 4N)" },
      { key: "Tensor Cores", val: "4th Generation (FP8, FP16, BF16, TF32, INT8)" },
      { key: "NVLink Interconnect", val: "900 GB/s bidireccional (NVLink 4)" },
      { key: "Motor Transformer", val: "Aceleración FP8 adaptativa automática" },
      { key: "Multi-Instance GPU (MIG)", val: "Hasta 7 instancias GPU autónomas" },
      { key: "Virtualización", val: "NVIDIA vGPU / AI Enterprise Certified" }
    ],
    benchmarkScore: 100,
    benchmarkMetric: "100k TFLOPS AI"
  },
  {
    id: 4,
    name: "NVIDIA A100 Tensor Core 80GB",
    category: "gpu",
    categoryLabel: "Aceleradores & GPUs",
    badge: "Ampere Datacenter",
    price: "$14,800 USD",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97",
    shortSpecs: {
      "VRAM": "80GB HBM2e",
      "Ancho de Banda": "2.0 TB/s",
      "Rendimiento FP16/BF16": "312 TFLOPS",
      "Factor de Forma": "PCIe 4.0 x16 / 300W"
    },
    fullSpecs: [
      { key: "CUDA Cores", val: "6,912 Cores" },
      { key: "Tensor Cores", val: "432 Tensor Cores (3ª Generación)" },
      { key: "NVLink Bridge", val: "600 GB/s bi-direccional" },
      { key: "Soporte MIG", val: "Hasta 7 slices de 10GB c/u" },
      { key: "Interconexión Host", val: "PCIe Gen4 a 64 GB/s" },
      { key: "Certificación", val: "Data Center Grade 24/7 Mission Critical" }
    ],
    benchmarkScore: 84,
    benchmarkMetric: "84k TFLOPS AI"
  },
  {
    id: 5,
    name: "Samsung PM1733 15.36TB NVMe U.2",
    category: "storage",
    categoryLabel: "Almacenamiento NVMe",
    badge: "PCIe Gen4 x4 Enterprise",
    price: "$2,290 USD",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
    shortSpecs: {
      "Capacidad": "15.36 TB",
      "Lectura Secuencial": "7,000 MB/s",
      "Escritura Secuencial": "3,800 MB/s",
      "IOPS Aleatorios (4K)": "1,000,000 IOPS"
    },
    fullSpecs: [
      { key: "Tipo de NAND", val: "Samsung V-NAND TLC de 128 capas" },
      { key: "Controlador", val: "Samsung Enterprise NVMe Controller" },
      { key: "Factor de Forma", val: "U.2 (2.5 pulgadas, 15mm)" },
      { key: "Resistencia (DWPD)", val: "1 DWPD durante 5 años" },
      { key: "MTBF", val: "2,000,000 horas" },
      { key: "Protección de Datos", val: "End-to-End Data Protection con Power Loss Protection" }
    ],
    benchmarkScore: 89,
    benchmarkMetric: "89k IOPS Index"
  },
  {
    id: 6,
    name: "Solidigm D5-P5336 61.44TB U.2",
    category: "storage",
    categoryLabel: "Almacenamiento NVMe",
    badge: "Alta Densidad QLC",
    price: "$5,100 USD",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    shortSpecs: {
      "Capacidad": "61.44 TB",
      "Lectura Secuencial": "7,000 MB/s",
      "Lectura Aleatoria (4K)": "1,005,000 IOPS",
      "Interfaz": "PCIe 4.0 x4, NVMe 1.4c"
    },
    fullSpecs: [
      { key: "Densidad por Rack", val: "Hasta 2 Petabytes por 1U" },
      { key: "Tipo de NAND", val: "192-layer BiCS QLC Enterprise" },
      { key: "Factor de Forma", val: "U.2 15mm / E1.L / E3.S" },
      { key: "Consumo Activo", val: "25W Máximo en carga pesada" },
      { key: "Resistencia", val: "Hasta 65 PBW (Petabytes Escritos)" },
      { key: "Encriptación", val: "AES 256-bit Hardware Encryption, TCG Opal" }
    ],
    benchmarkScore: 92,
    benchmarkMetric: "92k IOPS Index"
  },
  {
    id: 7,
    name: "Micron 128GB DDR5-4800 ECC Reg",
    category: "memory",
    categoryLabel: "Memoria Servidor",
    badge: "RDIMM 1Rx4 288-Pin",
    price: "$890 USD",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186",
    shortSpecs: {
      "Capacidad Módulo": "128 GB",
      "Velocidad de Datos": "4800 MT/s",
      "Latencia CAS": "CL40",
      "Voltaje Operativo": "1.1V con PMIC On-Die"
    },
    fullSpecs: [
      { key: "Tecnología DRAM", val: "Micron 1-alpha nm 16Gb Monolithic" },
      { key: "Corrección de Errores", val: "On-die ECC + Sideband ECC multi-bit" },
      { key: "Ancho de Banda", val: "38.4 GB/s por módulo" },
      { key: "Sensor Térmico", val: "SPD Hub con sensor de temperatura dual" },
      { key: "Compatibilidad", val: "Intel 4th/5th Gen Xeon & AMD EPYC 9004" },
      { key: "Estándar JEDEC", val: "JEDEC Solid State Technology Association" }
    ],
    benchmarkScore: 82,
    benchmarkMetric: "82k Bandwidth Score"
  },
  {
    id: 8,
    name: "Broadcom NetXtreme-E 100GbE NIC",
    category: "networking",
    categoryLabel: "Redes e Interconexión",
    badge: "Dual-Port QSFP28 PCIe",
    price: "$1,120 USD",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
    shortSpecs: {
      "Puertos": "2x 100GbE QSFP28",
      "Throughput": "200 Gbps Bidireccional",
      "Descarga por Hardware": "RoCEv2, VXLAN, NVMe-oF",
      "Interfaz de Bus": "PCIe 4.0 x16"
    },
    fullSpecs: [
      { key: "Protocolos RDMA", val: "RoCE v1 y RoCE v2 con control de congestión DCQCN" },
      { key: "Offload de Red", val: "TCP/IP, UDP, LSO, LRO, RSS, TSS" },
      { key: "Latencia", val: "< 1.5 microsegundos extremo a extremo" },
      { key: "Virtualización SR-IOV", val: "Hasta 256 Funciones Virtuales (VFs)" },
      { key: "Seguridad de Red", val: "IPsec y MACsec a velocidad de línea" },
      { key: "Gestión Fuera de Banda", val: "NC-SI sobre MCTP/SMBus y RBT" }
    ],
    benchmarkScore: 88,
    benchmarkMetric: "88k Network Throughput"
  },
  {
    id: 9,
    name: "Supermicro H13DSH Dual SP5 Board",
    category: "motherboard",
    categoryLabel: "Placas Madre Servidor",
    badge: "Dual AMD Socket SP5",
    price: "$1,450 USD",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    shortSpecs: {
      "Sockets": "2x LGA 6096 (AMD EPYC 9004)",
      "Ranuras DIMM": "24x DDR5 (Hasta 6TB)",
      "Ranuras de Expansión": "6x PCIe 5.0 x16",
      "Factor de Forma": "Proprietary E-ATX Server"
    },
    fullSpecs: [
      { key: "Chipset", val: "System-on-Chip (SoC) Integrado" },
      { key: "Almacenamiento Directo", val: "4x MCIO conectores (8x NVMe PCIe 5.0)" },
      { key: "Gestión IPMI", val: "ASPEED AST2600 BMC con puerto dedicado GbE" },
      { key: "Red Integrada", val: "Dual 10GBase-T LAN vía Intel X710-AT2" },
      { key: "Fuente de Alimentación", val: "Conectores estándar EPS 12V 8-pin x4" },
      { key: "Módulo TPM", val: "Header TPM 2.0 integrado" }
    ],
    benchmarkScore: 85,
    benchmarkMetric: "85k I/O Bandwidth"
  },
  {
    id: 10,
    name: "LSI MegaRAID 9560-16i SAS/NVMe",
    category: "storage",
    categoryLabel: "Controladoras RAID",
    badge: "16 Puertos Tri-Mode PCIe 4.0",
    price: "$1,380 USD",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    shortSpecs: {
      "Puertos Internos": "16x SAS/SATA/NVMe Tri-Mode",
      "Caché Integrada": "8GB DDR4-2666 con CacheVault",
      "Niveles RAID": "0, 1, 5, 6, 10, 50, 60",
      "Tasa de Transferencia": "PCIe 4.0 x8 a 16 GT/s"
    },
    fullSpecs: [
      { key: "Procesador RAID", val: "Broadcom SAS3916 Dual-Core ARM A15" },
      { key: "Rendimiento IOPS", val: "Hasta 3,000,000 IOPS en lectura aleatoria" },
      { key: "Protección de Caché", val: "Módulo Flash CacheVault CVPM05 sin batería" },
      { key: "Capacidad de Conexión", val: "Hasta 240 unidades SAS/SATA o 32 NVMe" },
      { key: "Detección de Errores", val: "SafeStore con encriptación instantánea segura" },
      { key: "Gestión", val: "LSI Storage Authority (LSA) y StorCLI" }
    ],
    benchmarkScore: 87,
    benchmarkMetric: "87k RAID Ops"
  },
  {
    id: 11,
    name: "Corsair AX1600i Titanium 1600W",
    category: "power",
    categoryLabel: "Fuentes Redundantes",
    badge: "80 PLUS Titanium 96%",
    price: "$620 USD",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
    shortSpecs: {
      "Potencia Continua": "1600 Watts",
      "Eficiencia": "80 PLUS Titanium (>96%)",
      "Transistores": "GaN (Nitruro de Galio) Totem-Pole",
      "DSP Control": "Controlador Digital de 3ª Generación"
    },
    fullSpecs: [
      { key: "Topología Interna", val: "PFC Activo con Transistores GaN de Grado Servidor" },
      { key: "Regulación de Voltaje", val: "< 0.5% en todos los rieles primarios (+12V, +5V, +3.3V)" },
      { key: "Ventilador", val: "140mm FDB silencioso con Zero-RPM Mode" },
      { key: "Conectores PCIe/EPS", val: "10x PCIe 8-pin y 2x EPS 8-pin dedicados" },
      { key: "Monitoreo Digital", val: "Corsair iCUE USB con telemetría en tiempo real" },
      { key: "Garantía y MTBF", val: "10 años con 100,000 horas continuas a 50°C" }
    ],
    benchmarkScore: 79,
    benchmarkMetric: "79k Power Stability"
  },
  {
    id: 12,
    name: "Alphacool Eiszeit 2000 Chiller",
    category: "cooling",
    categoryLabel: "Refrigeración Líquida Servidor",
    badge: "Compresor 1500W TDP",
    price: "$1,690 USD",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c",
    shortSpecs: {
      "Capacidad de Enfriamiento": "1500W Continuos",
      "Bomba Integrada": "Caudal de 600 L/h (Altura 10m)",
      "Rango de Temperatura": "15°C a 40°C regulable",
      "Factor de Montaje": "Rack 4U o Unidad Externa"
    },
    fullSpecs: [
      { key: "Tipo de Refrigerante", val: "Compresor R134a ecológico" },
      { key: "Depósito de Líquido", val: "Tanque interno de 9 Litros de acero inoxidable" },
      { key: "Sensores de Flujo", val: "Telemetría digital con alarma sonora y corte automático" },
      { key: "Conexiones de Puerto", val: "Rosca G1/4\" estándar con desconexión rápida" },
      { key: "Consumo Eléctrico", val: "680W nominal a máxima carga de compresión" },
      { key: "Certificaciones", val: "CE, RoHS, Industrial 24/7 Heavy Load" }
    ],
    benchmarkScore: 81,
    benchmarkMetric: "81k Thermal Dissipation"
  }
];

module.exports = products;
