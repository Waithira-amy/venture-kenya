export type CategorySlug =
  | "models-actors"
  | "fashion-designers"
  | "photographers-videographers"
  | "makeup-artists";

export interface ChallengeCategory {
  slug: CategorySlug;
  title: string;
  description: string;
  codePrefix: string;
}

export interface Nominee {
  id: string;
  code: string;
  name: string;
  age: number;
  category: CategorySlug;
  categoryLabel: string;
  image: string;
  votes: number;
}

export const CHALLENGE_CATEGORIES: ChallengeCategory[] = [
  {
    slug: "models-actors",
    title: "Models/Actors",
    description:
      "Runway models, commercial talent, and screen actors representing Kenyan heritage and contemporary style.",
    codePrefix: "VK-MA",
  },
  {
    slug: "fashion-designers",
    title: "Fashion Designers",
    description:
      "Visionary Kenyan apparel creators, stylists, and textile designers crafting cultural couture.",
    codePrefix: "VK-FD",
  },
  {
    slug: "photographers-videographers",
    title: "Photographers/Videographers",
    description:
      "Visual storytellers, directors of photography, and filmmakers capturing Kenya through the lens.",
    codePrefix: "VK-PV",
  },
  {
    slug: "makeup-artists",
    title: "Makeup Artists",
    description:
      "Editorial beauty artists and creative MUAs bringing bold cultural concepts to life.",
    codePrefix: "VK-MU",
  },
];

export const NOMINEES: Nominee[] = [
  // ==========================================
  // 1. MODELS/ACTORS (89 Nominees)
  // ==========================================
  { id: "ma-001", code: "VK-MA-001", name: "Stanley Ochieng Owuor", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/stanley-ochieng-owuor.jpg", votes: 0 },
  { id: "ma-002", code: "VK-MA-002", name: "Diana Leisha", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/diana-leisha.jpg", votes: 0 },
  { id: "ma-003", code: "VK-MA-003", name: "Nyandusi Benedict Nyam", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/nyandusi-benedict-nyam.jpg", votes: 0 },
  { id: "ma-004", code: "VK-MA-004", name: "Hellen Achungo", age: 23, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/hellen-achungo.jpg", votes: 0 },
  { id: "ma-005", code: "VK-MA-005", name: "Murimi Kogi", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/murimi-kogi.jpg", votes: 0 },
  { id: "ma-006", code: "VK-MA-006", name: "Amos Bundi", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/amos-bundi.jpg", votes: 0 },
  { id: "ma-007", code: "VK-MA-007", name: "Eva Gacheri", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/eva-gacheri.jpg", votes: 0 },
  { id: "ma-008", code: "VK-MA-008", name: "Juliet Anyango", age: 32, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/juliet-anyango.jpg", votes: 0 },
  { id: "ma-009", code: "VK-MA-009", name: "Richard Muchilwa Ongeri", age: 31, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/richard-muchilwa-ongeri.jpg", votes: 0 },
  { id: "ma-010", code: "VK-MA-010", name: "Sarah Kuria", age: 30, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/sarah-kuria.jpg", votes: 0 },
  { id: "ma-011", code: "VK-MA-011", name: "Rabell Humphrey", age: 23, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/rabell-humphrey.jpg", votes: 0 },
  { id: "ma-012", code: "VK-MA-012", name: "Mary Wanja", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/mary-wanja.jpg", votes: 0 },
  { id: "ma-013", code: "VK-MA-013", name: "Purity Wambui Njuguna", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/purity-wambui-njuguna.jpg", votes: 0 },
  { id: "ma-014", code: "VK-MA-014", name: "Yvonne Atieno", age: 20, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/yvonne-atieno.jpg", votes: 0 },
  { id: "ma-015", code: "VK-MA-015", name: "Risper Akinyi Rita", age: 23, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/risper-akinyi-rita.jpg", votes: 0 },
  { id: "ma-016", code: "VK-MA-016", name: "George Mugambi", age: 28, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/george-mugambi.jpg", votes: 0 },
  { id: "ma-017", code: "VK-MA-017", name: "Samuel Oyole Nambute", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/samuel-oyole-nambute.jpg", votes: 0 },
  { id: "ma-018", code: "VK-MA-018", name: "Muthoni Jesca", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/muthoni-jesca.jpg", votes: 0 },
  { id: "ma-019", code: "VK-MA-019", name: "Johnny Kuria", age: 56, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/johnny-kuria.jpg", votes: 0 },
  { id: "ma-020", code: "VK-MA-020", name: "Nurah Elizabeth Njambi", age: 26, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/nurah-elizabeth-njambi.jpg", votes: 0 },
  { id: "ma-021", code: "VK-MA-021", name: "Wendy Ancient Oluoch", age: 19, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/wendy-ancient-oluoch.jpg", votes: 0 },
  { id: "ma-022", code: "VK-MA-022", name: "Shalom Nkirote", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/shalom-nkirote.jpg", votes: 0 },
  { id: "ma-023", code: "VK-MA-023", name: "Noella Uwimana", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/noella-uwimana.jpg", votes: 0 },
  { id: "ma-024", code: "VK-MA-024", name: "Tessy Agness Atieno", age: 13, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/tessy-agness-atieno.jpg", votes: 0 },
  { id: "ma-025", code: "VK-MA-025", name: "Weruh Joseph", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/weruh-joseph.jpg", votes: 0 },
  { id: "ma-026", code: "VK-MA-026", name: "Martin Indusah", age: 20, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/martin-indusah.jpg", votes: 0 },
  { id: "ma-027", code: "VK-MA-027", name: "Josephat Owino", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/josephat-owino.jpg", votes: 0 },
  { id: "ma-028", code: "VK-MA-028", name: "John Kolia", age: 46, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/john-kolia.jpg", votes: 0 },
  { id: "ma-029", code: "VK-MA-029", name: "Winnie Gitau", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/winnie-gitau.jpg", votes: 0 },
  { id: "ma-030", code: "VK-MA-030", name: "Ellen Lituitsa", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/ellen-lituitsa.jpg", votes: 0 },
  { id: "ma-031", code: "VK-MA-031", name: "Muhia Ngwiri", age: 39, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/muhia-ngwiri.jpg", votes: 0 },
  { id: "ma-032", code: "VK-MA-032", name: "Faith Kiilu", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/faith-kiilu.jpg", votes: 0 },
  { id: "ma-033", code: "VK-MA-033", name: "Natasha Murugi Mureithi", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/natasha-murugi-mureithi.jpg", votes: 0 },
  { id: "ma-034", code: "VK-MA-034", name: "Winney Aryong", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/winney-aryong.jpg", votes: 0 },
  { id: "ma-035", code: "VK-MA-035", name: "Njoroge Ivy Magiri", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/njoroge-ivy-magiri.jpg", votes: 0 },
  { id: "ma-036", code: "VK-MA-036", name: "Lorna Wairimu Wanjiru", age: 20, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/lorna-wairimu-wanjiru.jpg", votes: 0 },
  { id: "ma-037", code: "VK-MA-037", name: "Mwongela Gregory", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/mwongela-gregory.jpg", votes: 0 },
  { id: "ma-038", code: "VK-MA-038", name: "Said Hussein", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/said-hussein.jpg", votes: 0 },
  { id: "ma-039", code: "VK-MA-039", name: "Nelson Gatonye", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/nelson-gatonye.jpg", votes: 0 },
  { id: "ma-040", code: "VK-MA-040", name: "Angela Wanjiku", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/angela-wanjiku.jpg", votes: 0 },
  { id: "ma-041", code: "VK-MA-041", name: "Molent Bonareri", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/molent-bonareri.jpg", votes: 0 },
  { id: "ma-042", code: "VK-MA-042", name: "Stanley Odundo", age: 31, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/stanley-odundo.jpg", votes: 0 },
  { id: "ma-043", code: "VK-MA-043", name: "Faith Mumbua", age: 23, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/faith-mumbua.jpg", votes: 0 },
  { id: "ma-044", code: "VK-MA-044", name: "Isaac Wanjala Muhonja", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/isaac-wanjala-muhonja.jpg", votes: 0 },
  { id: "ma-045", code: "VK-MA-045", name: "Robert Musyoka Mutua", age: 28, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/robert-musyoka-mutua.jpg", votes: 0 },
  { id: "ma-046", code: "VK-MA-046", name: "Lewis Kamande Ndun", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/lewis-kamande-ndun.jpg", votes: 0 },
  { id: "ma-047", code: "VK-MA-047", name: "Teddy Ambani", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/teddy-ambani.jpg", votes: 0 },
  { id: "ma-048", code: "VK-MA-048", name: "Antony Miano Kirima", age: 37, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/antony-miano-kirima.jpg", votes: 0 },
  { id: "ma-049", code: "VK-MA-049", name: "Grace Wahito", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/grace-wahito.jpg", votes: 0 },
  { id: "ma-050", code: "VK-MA-050", name: "Sallie George", age: 30, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/sallie-george.jpg", votes: 0 },
  { id: "ma-051", code: "VK-MA-051", name: "Phenis Mulesi", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/phenis-mulesi.jpg", votes: 0 },
  { id: "ma-052", code: "VK-MA-052", name: "Jane Omondi", age: 26, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/jane-omondi.jpg", votes: 0 },
  { id: "ma-053", code: "VK-MA-053", name: "Siso Lilian", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/siso-lilian.jpg", votes: 0 },
  { id: "ma-054", code: "VK-MA-054", name: "Brian Muranda", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/brian-muranda.jpg", votes: 0 },
  { id: "ma-055", code: "VK-MA-055", name: "Dalene Lynn", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/dalene-lynn.jpg", votes: 0 },
  { id: "ma-056", code: "VK-MA-056", name: "Achieng Odindo", age: 36, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/achieng-odindo.jpg", votes: 0 },
  { id: "ma-057", code: "VK-MA-057", name: "Omondi Hudson Josiah", age: 23, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/omondi-hudson-josiah.jpg", votes: 0 },
  { id: "ma-058", code: "VK-MA-058", name: "Allan Kimanthi Mwanzia", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/allan-kimanthi-mwanzia.jpg", votes: 0 },
  { id: "ma-059", code: "VK-MA-059", name: "Brightny Janet Omolo", age: 23, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/brightny-janet-omolo.jpg", votes: 0 },
  { id: "ma-060", code: "VK-MA-060", name: "Shaneez Alika Verah", age: 8, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/shaneez-alika-verah.jpg", votes: 0 },
  { id: "ma-061", code: "VK-MA-061", name: "Amy", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/amy.jpg", votes: 0 },
  { id: "ma-062", code: "VK-MA-062", name: "Florence Wangari", age: 26, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/florence-wangari.jpg", votes: 0 },
  { id: "ma-063", code: "VK-MA-063", name: "Tom Ojwang Oduor", age: 28, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/tom-ojwang-oduor.jpg", votes: 0 },
  { id: "ma-064", code: "VK-MA-064", name: "Ashlyne Kaveza", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/ashlyne-kaveza.jpg", votes: 0 },
  { id: "ma-065", code: "VK-MA-065", name: "Black Tycoon", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/black-tycoon.jpg", votes: 0 },
  { id: "ma-066", code: "VK-MA-066", name: "Innocent Raphael", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/innocent-raphael.jpg", votes: 0 },
  { id: "ma-067", code: "VK-MA-067", name: "Brenda Chebet", age: 28, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/brenda-chebet.jpg", votes: 0 },
  { id: "ma-068", code: "VK-MA-068", name: "Teto Ole Tutuma", age: 46, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/teto-ole-tutuma.jpg", votes: 0 },
  { id: "ma-069", code: "VK-MA-069", name: "Molyne Otieno", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/molyne-otieno.jpg", votes: 0 },
  { id: "ma-070", code: "VK-MA-070", name: "Enoch Kipkemoi", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/enoch-kipkemoi.jpg", votes: 0 },
  { id: "ma-071", code: "VK-MA-071", name: "Makau Zach.", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/makau-zach.jpg", votes: 0 },
  { id: "ma-072", code: "VK-MA-072", name: "Maison Mose Osoro", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/maison-mose-osoro.jpg", votes: 0 },
  { id: "ma-073", code: "VK-MA-073", name: "Jeff Mutugi Kinyua", age: 23, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/jeff-mutugi-kinyua.jpg", votes: 0 },
  { id: "ma-074", code: "VK-MA-074", name: "Jeptoo Staicy", age: 21, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/jeptoo-staicy.jpg", votes: 0 },
  { id: "ma-075", code: "VK-MA-075", name: "Paul Kasyoki", age: 20, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/paul-kasyoki.jpg", votes: 0 },
  { id: "ma-076", code: "VK-MA-076", name: "Michael Ouma Ongir", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/michael-ouma-ongir.jpg", votes: 0 },
  { id: "ma-077", code: "VK-MA-077", name: "Sandra Wangira", age: 31, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/sandra-wangira.jpg", votes: 0 },
  { id: "ma-078", code: "VK-MA-078", name: "Hanington Odhiambo", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/hanington-odhiambo.jpg", votes: 0 },
  { id: "ma-079", code: "VK-MA-079", name: "Skylar Muhonja", age: 16, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/skylar-muhonja.jpg", votes: 0 },
  { id: "ma-080", code: "VK-MA-080", name: "Andrew Muema", age: 20, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/andrew-muema.jpg", votes: 0 },
  { id: "ma-081", code: "VK-MA-081", name: "Sara Brooklyn", age: 20, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/sara-brooklyn.jpg", votes: 0 },
  { id: "ma-082", code: "VK-MA-082", name: "Jayden Mackenzie Much", age: 10, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/jayden-mackenzie-much.jpg", votes: 0 },
  { id: "ma-083", code: "VK-MA-083", name: "Hellen Njeri Wachira", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/hellen-njeri-wachira.jpg", votes: 0 },
  { id: "ma-084", code: "VK-MA-084", name: "Travis Kilatya", age: 24, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/travis-kilatya.jpg", votes: 0 },
  { id: "ma-085", code: "VK-MA-085", name: "Alice Wanjiru Chege", age: 22, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/alice-wanjiru-chege.jpg", votes: 0 },
  { id: "ma-086", code: "VK-MA-086", name: "Roy Timbiti", age: 29, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/roy-timbiti.jpg", votes: 0 },
  { id: "ma-087", code: "VK-MA-087", name: "Faith Atieno", age: 19, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/faith-atieno.jpg", votes: 0 },
  { id: "ma-088", code: "VK-MA-088", name: "Colin Kennedy Mwai", age: 27, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/colin-kennedy-mwai.jpg", votes: 0 },
  { id: "ma-089", code: "VK-MA-089", name: "Rachael Warigia", age: 25, category: "models-actors", categoryLabel: "Models/Actors", image: "/nominees/rachael-warigia.jpg", votes: 0 },

  // ==========================================
  // 2. FASHION DESIGNERS (10 Nominees)
  // ==========================================
  { id: "fd-001", code: "VK-FD-001", name: "Stanley Ochieng Owuor", age: 24, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/stanley-ochieng-owuor-fd.jpg", votes: 0 },
  { id: "fd-002", code: "VK-FD-002", name: "Stephen Omondi", age: 35, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/stephen-omondi.jpg", votes: 0 },
  { id: "fd-003", code: "VK-FD-003", name: "Elizabeth Nangila", age: 29, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/elizabeth-nangila.jpg", votes: 0 },
  { id: "fd-004", code: "VK-FD-004", name: "Abigael Opondo", age: 25, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/abigael-opondo.jpg", votes: 0 },
  { id: "fd-005", code: "VK-FD-005", name: "Richard Oguna", age: 24, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/richard-oguna.jpg", votes: 0 },
  { id: "fd-006", code: "VK-FD-006", name: "Shelize Itangakubuntu", age: 20, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/shelize-itangakubuntu.jpg", votes: 0 },
  { id: "fd-007", code: "VK-FD-007", name: "Rosemary Akinyi Omondi", age: 28, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/rosemary-akinyi-omondi.jpg", votes: 0 },
  { id: "fd-008", code: "VK-FD-008", name: "Mitchell Vaati Nthenya", age: 26, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/mitchell-vaati-nthenya.jpg", votes: 0 },
  { id: "fd-009", code: "VK-FD-009", name: "Ashley Ngeru", age: 26, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/ashley-ngeru.jpg", votes: 0 },
  { id: "fd-010", code: "VK-FD-010", name: "Janet Oside", age: 23, category: "fashion-designers", categoryLabel: "Fashion Designers", image: "/nominees/janet-oside.jpg", votes: 0 },

  // ==========================================
  // 3. PHOTOGRAPHERS/VIDEOGRAPHERS (24 Nominees)
  // ==========================================
  { id: "pv-001", code: "VK-PV-001", name: "Awuor Emanuel Otieno", age: 20, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/awuor-emanuel-otieno.jpg", votes: 0 },
  { id: "pv-002", code: "VK-PV-002", name: "Muriet Kipkorir Rono", age: 26, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/muriet-kipkorir-rono.jpg", votes: 0 },
  { id: "pv-003", code: "VK-PV-003", name: "Evans Opiyo Odhiambo", age: 26, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/evans-opiyo-odhiambo.jpg", votes: 0 },
  { id: "pv-004", code: "VK-PV-004", name: "Samwel Webo", age: 27, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/samwel-webo.jpg", votes: 0 },
  { id: "pv-005", code: "VK-PV-005", name: "Wendy Cynthia", age: 29, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/wendy-cynthia.jpg", votes: 0 },
  { id: "pv-006", code: "VK-PV-006", name: "Pacifique Munezero", age: 21, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/pacifique-munezero.jpg", votes: 0 },
  { id: "pv-007", code: "VK-PV-007", name: "Boniface Amollo", age: 23, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/boniface-amollo.jpg", votes: 0 },
  { id: "pv-008", code: "VK-PV-008", name: "Brian Ochieng", age: 23, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/brian-ochieng.jpg", votes: 0 },
  { id: "pv-009", code: "VK-PV-009", name: "Joshua Kadere", age: 29, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/joshua-kadere.jpg", votes: 0 },
  { id: "pv-010", code: "VK-PV-010", name: "Maya Faith", age: 23, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/maya-faith.jpg", votes: 0 },
  { id: "pv-011", code: "VK-PV-011", name: "Brian Olela", age: 22, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/brian-olela.jpg", votes: 0 },
  { id: "pv-012", code: "VK-PV-012", name: "Brian Ogeto Kuria", age: 21, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/brian-ogeto-kuria.jpg", votes: 0 },
  { id: "pv-013", code: "VK-PV-013", name: "Valentine Flackia Ochien", age: 21, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/valentine-flackia-ochien.jpg", votes: 0 },
  { id: "pv-014", code: "VK-PV-014", name: "Phiona Atieno Ouma", age: 21, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/phiona-atieno-ouma.jpg", votes: 0 },
  { id: "pv-015", code: "VK-PV-015", name: "Esther Wairimu", age: 20, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/esther-wairimu.jpg", votes: 0 },
  { id: "pv-016", code: "VK-PV-016", name: "Tony Shammah", age: 23, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/tony-shammah.jpg", votes: 0 },
  { id: "pv-017", code: "VK-PV-017", name: "Maximillian Odiwuor", age: 26, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/maximillian-odiwuor.jpg", votes: 0 },
  { id: "pv-018", code: "VK-PV-018", name: "Stephen Mukuria Kiruga", age: 23, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/stephen-mukuria-kiruga.jpg", votes: 0 },
  { id: "pv-019", code: "VK-PV-019", name: "Luis Kiprono", age: 23, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/luis-kiprono.jpg", votes: 0 },
  { id: "pv-020", code: "VK-PV-020", name: "Benard Collince", age: 23, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/benard-collince.jpg", votes: 0 },
  { id: "pv-021", code: "VK-PV-021", name: "Meshack Odhiambo Oloc", age: 22, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/meshack-odhiambo-oloc.jpg", votes: 0 },
  { id: "pv-022", code: "VK-PV-022", name: "Henry Meritei Lemein", age: 42, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/henry-meritei-lemein.jpg", votes: 0 },
  { id: "pv-023", code: "VK-PV-023", name: "Roy Muriithi Wangui", age: 26, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/roy-muriithi-wangui.jpg", votes: 0 },
  { id: "pv-024", code: "VK-PV-024", name: "Oscar Murimi Njiru", age: 27, category: "photographers-videographers", categoryLabel: "Photographers/Videographers", image: "/nominees/oscar-murimi-njiru.jpg", votes: 0 },

  // ==========================================
  // 4. MAKEUP ARTISTS (1 Nominee)
  // ==========================================
  { id: "mu-001", code: "VK-MU-001", name: "Rippy Joan Jaoko", age: 26, category: "makeup-artists", categoryLabel: "Makeup Artists", image: "/nominees/rippy-joan-jaoko.jpg", votes: 0 },
];