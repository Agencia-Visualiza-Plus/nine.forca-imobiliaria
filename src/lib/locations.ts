export interface LocationCategory {
  name: string;
  slug: string;
  image: string;
  description: string;
}

/**
 * Zonas usadas como categorias de navegação. A presença destas zonas não
 * significa que exista inventário disponível em todas elas.
 */
export const locationCategories: LocationCategory[] = [
  {
    name: "Maputo",
    slug: "maputo",
    image: "/locations/maputo-v2.jpg",
    description: "Capital de Moçambique, com forte procura residencial e comercial.",
  },
  {
    name: "Matola",
    slug: "matola",
    image: "/locations/matola.jpg",
    description: "Cidade vizinha de Maputo, com bairros residenciais em crescimento.",
  },
  {
    name: "Costa do Sol",
    slug: "costa-do-sol",
    image: "/locations/costa-do-sol.jpg",
    description: "Zona costeira junto à marginal, procurada pela proximidade ao mar.",
  },
  {
    name: "Polana",
    slug: "polana",
    image: "/locations/polana-v2.jpg",
    description: "Zona residencial central, próxima de serviços e avenidas principais.",
  },
  {
    name: "Sommerschield",
    slug: "sommerschield",
    image: "/locations/sommerschield-v2.jpg",
    description: "Bairro central de Maputo, com edifícios e moradias de referência.",
  },
  {
    name: "Coop",
    slug: "coop",
    image: "/locations/coop-v2.jpg",
    description: "Zona residencial consolidada, com boa acessibilidade ao centro.",
  },
  {
    name: "Triunfo",
    slug: "triunfo",
    image: "/locations/triunfo.jpg",
    description: "Área residencial tranquila, com comércio e serviços próximos.",
  },
  {
    name: "Magoanine",
    slug: "magoanine",
    image: "/locations/magoanine-v2.jpg",
    description: "Zona em expansão, com opções de habitação e terrenos.",
  },
  {
    name: "Zimpeto",
    slug: "zimpeto",
    image: "/locations/zimpeto-v2.jpg",
    description: "Zona com boas vias de acesso e procura por habitação e serviços.",
  },
  {
    name: "Marracuene",
    slug: "marracuene",
    image: "/locations/marracuene-v2.jpg",
    description: "Distrito a norte de Maputo, com espaço e ambiente mais calmo.",
  },
];
