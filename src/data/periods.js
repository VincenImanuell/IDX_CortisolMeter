export const PERIOD_OPTIONS = [
  {
    value: 7,
    label: "7 Hari",
    description: "Volatilitas jangka pendek. Cocok buat trader aktif yang suka begadang mantengin chart.",
    tag: "Short-term",
    tagColor: "var(--color-blue)",
  },
  {
    value: 14,
    label: "14 Hari",
    description: "Dua minggu terakhir. Sweet spot antara noise harian dan tren mingguan.",
    tag: "Mid-term",
    tagColor: "var(--color-purple)",
  },
  {
    value: 30,
    label: "30 Hari",
    description: "Satu bulan penuh. Gambaran volatilitas yang lebih stabil dan representatif.",
    tag: "Standard",
    tagColor: "var(--color-green)",
  },
  {
    value: 60,
    label: "60 Hari",
    description: "Dua bulan. Untuk investor jangka menengah yang mau lihat tren lebih besar.",
    tag: "Long-term",
    tagColor: "var(--color-yellow)",
  },
];

export const DEFAULT_PERIOD = 30;
