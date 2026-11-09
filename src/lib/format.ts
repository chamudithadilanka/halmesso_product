export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(value);
}
