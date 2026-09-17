export const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Maputo: { lat: -25.9653, lng: 32.5892 },
  Matola: { lat: -25.9622, lng: 32.4589 },
  Marracuene: { lat: -25.736, lng: 32.674 },
  Polana: { lat: -25.9707, lng: 32.6045 },
  Sommerschield: { lat: -25.9628, lng: 32.6116 },
  "Costa do Sol": { lat: -25.934, lng: 32.64 },
  Coop: { lat: -25.956, lng: 32.589 },
  Triunfo: { lat: -25.94, lng: 32.61 },
  Magoanine: { lat: -25.89, lng: 32.56 },
  Zimpeto: { lat: -25.88, lng: 32.57 },
};

export function coordinatesFor(neighborhood: string, city: string) {
  return cityCoordinates[neighborhood] ?? cityCoordinates[city] ?? cityCoordinates.Maputo;
}
