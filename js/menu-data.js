// Menu Data
const menuData = {
    starters: [
        {
            id: 1,
            name: "Seared Scallops",
            price: "$28",
            description: "Pan-seared scallops with cauliflower purée, crispy pancetta, and truffle oil",
            image: "images/scallops.jpg",
            dietary: ["GF"]
        },
        {
            id: 2,
            name: "Foie Gras Terrine",
            price: "$32",
            description: "House-made foie gras with fig compote, toasted brioche, and aged balsamic",
            image: "images/foie-gras.jpg",
            dietary: []
        },
        {
            id: 3,
            name: "Burrata & Heirloom Tomatoes",
            price: "$24",
            description: "Creamy burrata, heirloom tomatoes, basil oil, and aged balsamic reduction",
            image: "images/burrata.jpg",
            dietary: ["V", "GF"]
        },
        {
            id: 4,
            name: "Tuna Tartare",
            price: "$26",
            description: "Yellowfin tuna, avocado, cucumber, sesame, and ponzu dressing",
            image: "images/tuna-tartare.jpg",
            dietary: ["GF"]
        },
        {
            id: 5,
            name: "Wild Mushroom Risotto",
            price: "$22",
            description: "Arborio rice, wild mushrooms, parmesan, white truffle oil",
            image: "images/mushroom-risotto.jpg",
            dietary: ["V", "GF"]
        },
        {
            id: 6,
            name: "Oysters Rockefeller",
            price: "$30",
            description: "Fresh oysters, spinach, pernod, parmesan crust",
            image: "images/oysters.jpg",
            dietary: ["GF"]
        }
    ],
    mains: [
        {
            id: 7,
            name: "Wagyu Beef Tenderloin",
            price: "$68",
            description: "A5 Wagyu beef, potato gratin, roasted vegetables, red wine reduction",
            image: "images/wagyu.jpg",
            dietary: ["GF"]
        },
        {
            id: 8,
            name: "Pan-Roasted Sea Bass",
            price: "$48",
            description: "Mediterranean sea bass, saffron risotto, asparagus, lemon beurre blanc",
            image: "images/sea-bass.jpg",
            dietary: ["GF"]
        },
        {
            id: 9,
            name: "Duck Breast à l'Orange",
            price: "$52",
            description: "Roasted duck breast, orange gastrique, sweet potato purée, green beans",
            image: "images/duck.jpg",
            dietary: ["GF"]
        },
        {
            id: 10,
            name: "Lobster Thermidor",
            price: "$62",
            description: "Whole lobster, brandy cream sauce, gruyère, served with seasonal vegetables",
            image: "images/lobster.jpg",
            dietary: ["GF"]
        },
        {
            id: 11,
            name: "Rack of Lamb",
            price: "$58",
            description: "Herb-crusted lamb, rosemary jus, roasted fingerling potatoes, broccolini",
            image: "images/lamb.jpg",
            dietary: ["GF"]
        },
        {
            id: 12,
            name: "Vegetable Wellington",
            price: "$42",
            description: "Seasonal vegetables, wild mushrooms, puff pastry, red wine jus",
            image: "images/wellington.jpg",
            dietary: ["V"]
        }
    ],
    desserts: [
        {
            id: 13,
            name: "Chocolate Soufflé",
            price: "$18",
            description: "Dark chocolate soufflé, vanilla bean ice cream, raspberry coulis",
            image: "images/souffle.jpg",
            dietary: ["V"]
        },
        {
            id: 14,
            name: "Crème Brûlée",
            price: "$16",
            description: "Classic vanilla bean custard with caramelized sugar, fresh berries",
            image: "images/creme-brulee.jpg",
            dietary: ["V", "GF"]
        },
        {
            id: 15,
            name: "Tarte Tatin",
            price: "$17",
            description: "Caramelized apple tart, vanilla ice cream, salted caramel sauce",
            image: "images/tarte-tatin.jpg",
            dietary: ["V"]
        },
        {
            id: 16,
            name: "Tiramisu",
            price: "$16",
            description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
            image: "images/tiramisu.jpg",
            dietary: ["V"]
        },
        {
            id: 17,
            name: "Lemon Tart",
            price: "$15",
            description: "Tangy lemon curd, almond crust, Italian meringue, candied lemon",
            image: "images/lemon-tart.jpg",
            dietary: ["V"]
        },
        {
            id: 18,
            name: "Cheese Selection",
            price: "$22",
            description: "Artisanal cheese board with accompaniments, house-made crackers",
            image: "images/cheese.jpg",
            dietary: ["V"]
        }
    ],
    drinks: [
        {
            id: 19,
            name: "Château Margaux 2015",
            price: "$450",
            description: "Premier Grand Cru Classé, Bordeaux blend with exceptional depth",
            image: "images/wine-red.jpg",
            dietary: []
        },
        {
            id: 20,
            name: "Dom Pérignon 2012",
            price: "$380",
            description: "Vintage champagne with notes of white fruit and toasted brioche",
            image: "images/champagne.jpg",
            dietary: []
        },
        {
            id: 21,
            name: "Puligny-Montrachet",
            price: "$180",
            description: "Premier Cru white Burgundy, elegant with mineral notes",
            image: "images/wine-white.jpg",
            dietary: []
        },
        {
            id: 22,
            name: "Signature Cocktail",
            price: "$18",
            description: "House-crafted cocktail with premium spirits and fresh ingredients",
            image: "images/cocktail.jpg",
            dietary: []
        },
        {
            id: 23,
            name: "Craft Beer Selection",
            price: "$12",
            description: "Rotating selection of local and imported craft beers",
            image: "images/beer.jpg",
            dietary: []
        },
        {
            id: 24,
            name: "Artisan Coffee",
            price: "$6",
            description: "Single-origin espresso, cappuccino, or pour-over",
            image: "images/coffee.jpg",
            dietary: ["V"]
        }
    ]
};

// Dietary badge labels
const dietaryLabels = {
    'V': 'Vegetarian',
    'GF': 'Gluten-Free',
    'VG': 'Vegan',
    'DF': 'Dairy-Free'
};
