// Indonesian Stock Exchange (IDX) - Major stocks
export const IDX_STOCKS = [
  // Index
  { symbol: "^JKSE", name: "IHSG - Indeks Harga Saham Gabungan", sector: "Index" },

  // Banking
  { symbol: "BBCA.JK", name: "Bank Central Asia", sector: "Perbankan" },
  { symbol: "BBRI.JK", name: "Bank Rakyat Indonesia", sector: "Perbankan" },
  { symbol: "BMRI.JK", name: "Bank Mandiri", sector: "Perbankan" },
  { symbol: "BBNI.JK", name: "Bank Negara Indonesia", sector: "Perbankan" },
  { symbol: "BRIS.JK", name: "Bank Syariah Indonesia", sector: "Perbankan" },
  { symbol: "BTPS.JK", name: "Bank BTPN Syariah", sector: "Perbankan" },
  { symbol: "BNGA.JK", name: "Bank CIMB Niaga", sector: "Perbankan" },

  // Consumer
  { symbol: "UNVR.JK", name: "Unilever Indonesia", sector: "Konsumer" },
  { symbol: "ICBP.JK", name: "Indofood CBP Sukses Makmur", sector: "Konsumer" },
  { symbol: "INDF.JK", name: "Indofood Sukses Makmur", sector: "Konsumer" },
  { symbol: "MYOR.JK", name: "Mayora Indah", sector: "Konsumer" },
  { symbol: "GGRM.JK", name: "Gudang Garam", sector: "Konsumer" },
  { symbol: "HMSP.JK", name: "H.M. Sampoerna", sector: "Konsumer" },

  // Telecom & Tech
  { symbol: "TLKM.JK", name: "Telkom Indonesia", sector: "Telekomunikasi" },
  { symbol: "EXCL.JK", name: "XL Axiata", sector: "Telekomunikasi" },
  { symbol: "ISAT.JK", name: "Indosat Ooredoo Hutchison", sector: "Telekomunikasi" },
  { symbol: "GOTO.JK", name: "GoTo Gojek Tokopedia", sector: "Teknologi" },
  { symbol: "BUKA.JK", name: "Bukalapak", sector: "Teknologi" },
  { symbol: "EMTK.JK", name: "Elang Mahkota Teknologi", sector: "Teknologi" },

  // Energy & Mining
  { symbol: "ADRO.JK", name: "Adaro Energy Indonesia", sector: "Energi" },
  { symbol: "PTBA.JK", name: "Bukit Asam", sector: "Energi" },
  { symbol: "ITMG.JK", name: "Indo Tambangraya Megah", sector: "Energi" },
  { symbol: "INDY.JK", name: "Indika Energy", sector: "Energi" },
  { symbol: "MEDC.JK", name: "Medco Energi Internasional", sector: "Energi" },
  { symbol: "PGAS.JK", name: "Perusahaan Gas Negara", sector: "Energi" },

  // Property & Construction
  { symbol: "SMGR.JK", name: "Semen Indonesia", sector: "Konstruksi" },
  { symbol: "WIKA.JK", name: "Wijaya Karya", sector: "Konstruksi" },
  { symbol: "PTPP.JK", name: "PP (Pembangunan Perumahan)", sector: "Konstruksi" },
  { symbol: "WSKT.JK", name: "Waskita Karya", sector: "Konstruksi" },
  { symbol: "BSDE.JK", name: "Bumi Serpong Damai", sector: "Properti" },
  { symbol: "CTRA.JK", name: "Ciputra Development", sector: "Properti" },
  { symbol: "PWON.JK", name: "Pakuwon Jati", sector: "Properti" },

  // Healthcare
  { symbol: "KLBF.JK", name: "Kalbe Farma", sector: "Kesehatan" },
  { symbol: "SIDO.JK", name: "Industri Jamu Sido Muncul", sector: "Kesehatan" },
  { symbol: "MIKA.JK", name: "Mitra Keluarga Karyasehat", sector: "Kesehatan" },

  // Automotive & Manufacturing
  { symbol: "ASII.JK", name: "Astra International", sector: "Otomotif" },
  { symbol: "AUTO.JK", name: "Astra Otoparts", sector: "Otomotif" },

  // Palm Oil & Agriculture
  { symbol: "AALI.JK", name: "Astra Agro Lestari", sector: "Agrikultur" },
  { symbol: "LSIP.JK", name: "PP London Sumatra Indonesia", sector: "Agrikultur" },
  { symbol: "SSMS.JK", name: "Sawit Sumbermas Sarana", sector: "Agrikultur" },

  // Metals
  { symbol: "ANTM.JK", name: "Aneka Tambang", sector: "Logam" },
  { symbol: "TINS.JK", name: "Timah", sector: "Logam" },
  { symbol: "INCO.JK", name: "Vale Indonesia", sector: "Logam" },
  { symbol: "MDKA.JK", name: "Merdeka Copper Gold", sector: "Logam" },
];

export const SECTORS = [...new Set(IDX_STOCKS.map(s => s.sector))];
