export type DeckCard = {
  title: string;
  text: string;
  pillar?: string;
};

export type DeckSlide = {
  tag?: string;
  phase?: string;
  timeline?: string;
  title: string;
  subtitle?: string;
  stats?: { n: string; l: string }[];
  list?: string[];
  cards?: DeckCard[];
  note?: string;
  ask?: {
    title: string;
    text: string;
    button: string;
    href: string;
  };
  map?: boolean;
  routes?: boolean;
  footer?: string;
};

export type Deck = {
  slug: string;
  eyebrow: string;
  title: string;
  blurb: string;
  metaDescription: string;
  slides: DeckSlide[];
};

const contact = "Payton Byrd · 615-574-8101 · plbyrd@gmail.com";

export const decks: Deck[] = [
  {
    slug: "seo",
    eyebrow: "Phase 1 — Quick Wins",
    title: "SEO & Content Optimization",
    blurb:
      "A two-week on-page pilot so pasture-raised meat in Adams and Clarksville shows up with the right title, snippet, and local listing.",
    metaDescription:
      "Phase 1 rewrites titles, descriptions, headings, alt text, and schema. Later phases finish the Google listing and a short content calendar.",
    slides: [
      {
        tag: "SEO & Content Audit",
        title: "Findable Where<br>It __ACCENT__Matters.__",
        subtitle:
          "The farm already has the story and the certifications. The site does not tell Google. This proposal closes that gap in three phases, starting with a two-week pilot.",
        stats: [
          { n: "0", l: "Meta Descriptions" },
          { n: "Thin", l: "GBP Listing" },
          { n: "No", l: "LocalBusiness Schema" },
        ],
      },
      {
        tag: "What's Working",
        title: "What's Working",
        list: [
          "Clear mission: regenerative, faith-driven, River Friendly Farm certified",
          "Useful product copy — pasture-raised chicken, eggs, lamb, pork, turkey, dog supplements",
          "Correct canonicals, a working sitemap, and a standard Squarespace robots.txt",
          "Some product images already have meaningful alt text",
          "A real backlink from the Cumberland River Compact",
        ],
      },
      {
        tag: "What's Holding It Back",
        title: "What's Holding It Back",
        cards: [
          {
            title: "Titles & Snippets",
            text: "The homepage title is only the brand name. No location, no offer. Meta descriptions are missing, so Google writes the snippet.",
          },
          {
            title: "Local Signals",
            text: "A Google listing exists, and it is thin. Clarksville shows up in the footer, not the page. No service area, no map, and the listing is not tied to the site.",
          },
          {
            title: "Structure",
            text: "More than one H1 on the homepage. Many images have no alt text. No structured data for the farm, the products, or the organization.",
          },
        ],
      },
      {
        phase: "01",
        timeline: "Weeks 1–2 · Quick Wins",
        title: "On-Page Foundations",
        list: [
          "Pull a Search Console baseline before the first title changes, so the lift is a number",
          "Rewrite titles: offer, brand, and place — Pasture-Raised Meat | Agape Farmstead | Clarksville, TN",
          "Write a 150–160 character description for the homepage, each product, and the story page",
          "One H1 per page, and alt text on every image",
          "LocalBusiness schema only after one decision: publish the address, or run as a service-area business",
        ],
      },
      {
        phase: "02",
        timeline: "Weeks 2–4 · Local Visibility",
        title: "Finish the Listing",
        list: [
          "Complete the Google listing that already exists: Farm and Meat Shop, photos, products, hours, and the site link",
          "Ask for reviews that name the town and the product",
          "Say Adams, Clarksville, and Middle Tennessee in the copy, not only in the footer",
          "Add an ordering FAQ for the questions people already ask at the market",
        ],
      },
      {
        phase: "03",
        timeline: "Months 2–3 · Content",
        title: "Tell the Story",
        list: [
          "Four to six seasonal posts: market days, the certification, the grazing, the interns",
          "Keep the combination in every post: regenerative, River Friendly, faith-driven",
          "Link the Cumberland River Compact profile where it earns its place",
          "Track the long-tails, not the vanity terms: pasture-raised chicken Clarksville TN, River Friendly Farm Adams",
        ],
      },
      {
        tag: "The Differentiation",
        title: "Nobody Else Combines<br>All Three.",
        subtitle:
          "Regenerative practices. River Friendly Farm certification. A faith-driven mission. That is the moat. Content should say it once the technical basics are in place.",
        cards: [
          {
            title: "Search Intent",
            text: "Someone searching for local meat wants provenance they can check. Agape can answer that. A freezer aisle cannot.",
          },
          {
            title: "Winnable Keywords",
            text: "Farm store near me is a crowd. River Friendly Farm Adams and pasture-raised turkey Clarksville are not.",
          },
        ],
      },
      {
        tag: "The Ask",
        title: "The Ask",
        subtitle:
          "Phase 1 is a fixed pilot. Payton drafts the titles, descriptions, heading map, alt text, and schema. The farm approves every page before it goes live.",
        ask: {
          title: "Phase 1 Pilot",
          text: "Two weeks. Then we compare against the baseline and decide on Phase 2.",
          button: "Start Phase 1",
          href: "mailto:plbyrd@gmail.com?subject=Agape%20Farmstead%20SEO%20Phase%201%20Pilot",
        },
        footer: contact,
      },
      {
        tag: "Next Step",
        title: "Own Your<br>__ACCENT2__Search Results.__",
        subtitle:
          "The farm is already doing the hard part. This makes the search result say so.",
        list: [
          "The deliverable is the list on the Phase 1 slide",
          "Call Payton Byrd at 615-574-8101",
        ],
        footer: contact,
      },
    ],
  },
  {
    slug: "thanksgiving",
    eyebrow: "200-Mile Delivery",
    title: "Thanksgiving Delivery",
    blurb:
      "Fresh birds batched on six corridors out of Nashville, inside 200 miles. Payton runs the routes. Last drop November 24.",
    metaDescription:
      "Thanksgiving delivery inside 200 miles of Nashville, in six batches: both directions of I-24, I-65, and I-40. Last drop November 24.",
    slides: [
      {
        tag: "Thanksgiving 2026",
        title: "Fresh Poultry,<br>__ACCENT__Delivered.__",
        subtitle:
          "The agreement is a 200-mile radius, centered on Nashville. Payton delivers in six batches, one for each corridor leaving the city. Last drop is Tuesday, November 24.",
        stats: [
          { n: "200", l: "Mile Radius" },
          { n: "11/24", l: "Last Drop" },
          { n: "6", l: "Corridors" },
        ],
      },
      {
        tag: "The Agreement",
        title: "The Agreement",
        subtitle:
          "Thanksgiving is the poultry week, and the delivery area is already decided. Fresh local birds are scarce. The limit is the processor's count, not the map.",
        list: [
          "Payton delivers inside 200 miles. Nashville is the hub.",
          "The farm keeps production, processing, and food safety up to the handoff.",
          "Six corridors leave Nashville. One corridor, one route day.",
          "A stop rides with the rest of its corridor, or it waits for the next batch.",
        ],
      },
      {
        tag: "The Zone Map",
        title: "Nashville at the Center",
        map: true,
      },
      {
        tag: "The Route Map",
        title: "Six Routes Out",
        routes: true,
      },
      {
        tag: "The Batches",
        title: "The Batches",
        cards: [
          {
            title: "I-24 Northwest",
            text: "Adams, Clarksville, Hopkinsville, and Paducah.",
          },
          {
            title: "I-24 Southeast",
            text: "Murfreesboro and Chattanooga.",
          },
          {
            title: "I-65 North",
            text: "Bowling Green.",
          },
          {
            title: "I-65 South",
            text: "Toward Huntsville.",
          },
          {
            title: "I-40 East",
            text: "Cookeville and Knoxville.",
          },
          {
            title: "I-40 West",
            text: "Jackson.",
          },
        ],
        note: "Kentucky stops on I-24 Northwest and I-65 North still need the processor clear on the state line. The six corridors do not change.",
      },
      {
        phase: "01",
        timeline: "October 24–31 · Open It",
        title: "Set the Routes",
        list: [
          "Bird count from the processor. That count is the only cap.",
          "Six batches, one for each corridor leaving Nashville.",
          "Orders close November 10. Payton's last drop is November 24.",
        ],
        note: "The page goes live this week with the roads on it. If the processor date is already gone, say so before anyone orders.",
      },
      {
        phase: "02",
        timeline: "November 1–10 · Orders",
        title: "Fill the Routes",
        list: [
          "Take orders anywhere inside the radius, and stop at the cap.",
          "A waitlist is fine. A promise past the bird count is not.",
          "Cold chain is an insulated box, ice, and a window measured in hours.",
          "Add-ons only in the same box: eggs, ground chicken.",
        ],
        subtitle: "No batch on that corridor that day, no delivery.",
      },
      {
        phase: "03",
        timeline: "November 11–24 · On the Road",
        title: "Payton Delivers",
        list: [
          "Each route day is one corridor out of Nashville.",
          "Last drop Tuesday, November 24. Nothing on Thanksgiving Day.",
          "The same cutoff on the page, the text, and the voicemail.",
          "Ask for the review when the bird is in the fridge.",
        ],
        subtitle: "This November is the agreement, running.",
      },
      {
        tag: "Why This Holds",
        title: "Why This Holds",
        cards: [
          {
            title: "Scarcity Is Real",
            text: "A fresh local turkey that week is hard to find. The farm already raises the birds.",
          },
          {
            title: "The Driver Is Set",
            text: "Payton delivers. The farm does not have to become a trucking company to reach the radius.",
          },
          {
            title: "Batched on Purpose",
            text: "Ten birds on one corridor ride together. A single door does not get its own trip.",
          },
        ],
      },
      {
        tag: "The Ask",
        title: "The Ask",
        subtitle:
          "Run the radius this Thanksgiving. The farm brings the birds and the processor. Payton brings the deliveries, the route sheet, and the order page.",
        ask: {
          title: "200-Mile Delivery",
          text: "Six corridors out of Nashville. One batch each. Orders through November 10. Last drop November 24.",
          button: "Open the Radius",
          href: "mailto:plbyrd@gmail.com?subject=Agape%20Farmstead%20Thanksgiving%20200-Mile%20Delivery",
        },
        footer: contact,
      },
      {
        tag: "The Table",
        title: "From Farm<br>to __ACCENT2__Table.__",
        subtitle:
          "The radius is the work. Orders open once the bird count and the six routes are written down.",
        list: [
          "Payton Byrd delivers inside 200 miles",
          "Call 615-574-8101",
        ],
        footer: contact,
      },
    ],
  },
  {
    slug: "brand",
    eyebrow: "Long-Term Vision",
    title: "Brand Sustainability & Growth",
    blurb:
      "A five-year direction: findable this year, recurring next year, and nothing later that the repeat orders have not earned.",
    metaDescription:
      "Year one is search, a customer list, and a record of the farm. Later years open only if repeat orders and processing capacity can carry them.",
    slides: [
      {
        tag: "Five-Year Brand Vision",
        title: "Built to __ACCENT__Last.__",
        subtitle:
          "This is the sequence, not a contract for year five. Year one makes the farm findable, listed, and photographed. The rest opens when the numbers say so.",
        stats: [
          { n: "5", l: "Year Horizon" },
          { n: "3", l: "Pillars" },
          { n: "1", l: "Year to Sign" },
        ],
      },
      {
        tag: "Three Pillars",
        title: "Three Pillars",
        cards: [
          {
            pillar: "Land",
            title: "Stewardship First",
            text: "Soil, rotational grazing, and the River Friendly certification are the operating system. The land gets better, so the product does too.",
          },
          {
            pillar: "People",
            title: "Community as Infrastructure",
            text: "Market regulars, interns, church networks, and delivery customers compound. Ad spend does not replace them.",
          },
          {
            pillar: "Purpose",
            title: "Faith-Driven Consistency",
            text: "The biblical foundation is the spine. In a market full of wellness claims, depth is what people remember and repeat.",
          },
        ],
      },
      {
        tag: "Year One",
        timeline: "Months 1–12",
        title: "Foundation",
        list: [
          "SEO on the home turf, with a baseline before anything changes",
          "An email list from every market day and every order",
          "A photo library and a short founder story",
          "River Friendly and regenerative language on every page that sells meat",
          "Thanksgiving delivery inside 200 miles, batched on the six corridors out of Nashville",
        ],
        subtitle: "Year one is findable, remembered, and delivered.",
      },
      {
        tag: "Year Two",
        timeline: "Months 13–24",
        title: "Channels",
        list: [
          "Eggs, seasonal boxes, and the holidays, delivered more than once a year",
          "Wholesale conversations with Nashville kitchens and grocers who already ask",
          "A simple subscription for eggs or a monthly meat share",
          "A monthly note from the farm, not a content mill",
          "Farm visits and school trips tied to the internship, if the family wants guests",
        ],
        subtitle: "Year two turns a holiday buyer into someone who comes back.",
      },
      {
        tag: "Year Three",
        timeline: "Months 25–36",
        title: "Scale",
        list: [
          "A second processor only if the current date is the bottleneck",
          "Part-time marketing help only after repeat orders can carry it",
          "The internship named as a path into farm work",
          "Adjacent products after the meat boxes are already repeating",
          "Three numbers: repeat rate, list size, and which channels bring people back",
        ],
        subtitle: "Year three is when repeat orders carry the year.",
      },
      {
        tag: "Years Four & Five",
        timeline: "Months 37–60 · Direction",
        title: "Not a Commitment",
        list: [
          "These open only if repeat orders and the processor can take more",
          "Being the name people search is the result of the first three years, not a project",
          "A Nashville presence is a separate decision",
          "Succession and the land stay on the family's clock",
          "Publish soil tests when the farm wants that proof public",
        ],
        subtitle: "The name becomes the trust. That is the point. It is not a deadline.",
      },
      {
        tag: "What Sustainability Really Means",
        title: "What Sustainability Really Means",
        cards: [
          {
            title: "Ecological",
            text: "Grazing that rebuilds soil and protects the water. The River Friendly certification is the receipt.",
          },
          {
            title: "Economic",
            text: "Market, delivery, wholesale, and a subscription. No single channel gets to sink the year.",
          },
          {
            title: "Purpose",
            text: "Faith and the people around the farm are the third leg. Soil alone, or revenue alone, is not Agape.",
          },
        ],
        note: "Most farms optimize for this quarter. The advantage is refusing to — without pretending year five is already decided.",
      },
      {
        tag: "The Ask",
        title: "The Ask",
        subtitle:
          "Adopt year one. SEO, the list, and Thanksgiving delivery inside the 200-mile radius.",
        ask: {
          title: "Year One",
          text: "Quarterly reviews start after Phase 1. We look at search, list size, and repeat orders. No dashboard until there is something to put on it.",
          button: "Start Year One",
          href: "mailto:plbyrd@gmail.com?subject=Agape%20Farmstead%20Year%20One",
        },
        footer: contact,
      },
      {
        tag: "The Long View",
        title: "Plant Trees<br>You'll Never<br>__ACCENT__Sit Under.__",
        subtitle:
          "The farm already lives this. The proposal names the order, and leaves the later years closed until they are earned.",
        list: [
          "Year one is search, the list, and delivery across the radius",
          "Call Payton Byrd at 615-574-8101",
        ],
        footer: contact,
      },
    ],
  },
];

export function getDeck(slug: string): Deck | undefined {
  return decks.find((deck) => deck.slug === slug);
}

export function plainTitle(text: string): string {
  return text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/__(ACCENT2|ACCENT)__(.+?)__/g, "$2");
}
