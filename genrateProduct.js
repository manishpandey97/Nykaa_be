const mongoose = require('mongoose');
const productModel = require(`./models/product.model`); // Adjust the path as needed

const generateProducts = async () => {
    try {
        await mongoose.connect(`mongodb+srv://manish123:manish1234@cluster0.7sj0y25.mongodb.net/Nykaa?retryWrites=true&w=majority&appName=Cluster0`
            // ,{ useNewUrlParser: true, useUnifiedTopology: true }
        );

        const categories = {

            makeup: ["Face Primer", "Concealer", "Foundation", "Compact", "Contour", "Loose Powder", "Tinted Moisturizer", "Blush", "Bronzer", "BB & CC cream", "Highlighters",
                "Setting Spray", "Makeup Remover", "Sindoor", "Kajal", "Eyeliner", "Mascara", "Eye Shadow", "Eye Brow Enhancers", "Eye Primer", "False Eyelashes", "Eye Makeup Remover",
                "Under Eye Concealer", "Contact Lenses", "Makeup Kits", "Makeup Combos", "Lipstick", "liquid Lipstick", "Lip Crayon", "Lip Gloss", "Lip Liner", "Lip Plumper", "Lip Tint",
                "Nail Polish", "Nail Art Kits", "Nail Care", "Nail Polish Remover", "Face Brush", "Eye Brush", "Lip Brush", "Brush Sets", "Brush Cleaners", "Sponges & Applicators",
                "Eyelash Curlers", "Tweezers", "Sharpeners", "Mirrors", "Makeup Pouches", "Multi-Functional Makeup Palettes", "Kay Beauty", "Huda Beauty", "Charlotte Tilbury", "M.A.C",
                "Maybelline New York", "Lakme", "Nykaa Cosmetics", "Nyx Pro.Makeup", "Nude Lipstick", "Matte Lipstick", "Red Lipstick", "Pink Lipstick"],

            skin: ["Face Moisturizer & Day Cream", "Night Cream", "Face Oils", "Serums & Essence", "All Purpose Gels/Creams", "Cleansers", "Face Wash", "Micellar Water", "Face Wipes",
                "Makeup Remover", "Scrubs & Exfoliators", "Toners Under 1000", "Face wash for Oily Skin", "Oil Free Face Moisturizers", "Lip Balm Under 500", "Vitamin C Serum", "Sheet Masks",
                "Sleeping Masks", "Masks & Peels", "Face Packs", "Face Bleach", "Toners & Mists", "Rose Water", "Lotions & Creams", "Body Butter", "Massage Oils", "Shower Gels & Body Wash",
                "Soaps", "Scrubs & Loofahs", "Bath Salts", "Hand Creams", "Foot Creams", "Hand & Foot Masks", "Acne Spot Correctors", "Nose Strips", "Facial Peels", "Under Eye Cream & Serums",
                "Eye Masks", "Lip Balm", "Lip Scrubs", "Lip Masks", "Face Sunscreen",
                "Body Sunscreen", "Facial Kits", "Face Massagers", "Cleansing Brushes", "Blackhead Remover",
                "Vitamins & Minerals", "Ayurvedic Herbs", "Neck Creams", "Acne", "Dull Skin", "Pigmentation", "Wrinkles & Fine Lines", "Pores", "Dark Spots",
                "Face Tan", "Oil Control", "Quick Links", "The Gift Store"],

            hair: ["Shampoo", "Dry Shampoo", "Conditioner", "Hair Oil", "Hair Serum", "Hair Creams & Masks", "Hair Supplements",
                "Leave-in Conditioner", "Hair Brushes", "Hair Combs", "Dryers & Stylers", "Straighteners", "Rollers & Curlers", "Hair Extensions", "Hair Accessories",
                "Hair Color", "Hair Spray", "Gels & Waxes", "Straight", "Curly & Wavy", "Hairfall & Thinning", "Dandruff", "Dry & Frizzy Hair", "Split Ends", "Color Protection",
                "Damaged Hair", "Hair Growth", "Curl Enhancing", "Volume", "Length & Shine", "Bond Building", "Hair Kits", "Hair Combos", "Nykaa Naturals", "L'Oreal Paris",
                "Wella Professionals", "L'Oreal Professionnel", "BBlunt", "Herbal Essences", "Schwarzkopf Professional", "Hair Growth Oil", "Dandruff Shampoo",
                "Castor Oil For Hair", "Sulphate Free Shampoo", "Hair Straightener Brush", "The Beauty Ingredient Edit", "The Safe Beauty Edit"],

            appliances: ["Hair Dryers", "Straightening Brushes", "Curling Iron / Stylers", "Multi Stylers", "Blow Brushes", "Pro Hair Dryers", "Pro Straighteners",
                "Pro Curling Irons / Stylers", "Pro Multi Stylers", "Epilators", "Body Groomers", "Bikini Trimmers", "Shavers for Men", "Trimmers for Men", "Electric Toothbrushes"
                , "Electric Flossers", "Face Epilator", "Dermarollers", "Acne Removal", "FOREO", "Philips", "Alan Truman", "Dyson", "VEGA", "Braun", "Ikonic Professional", "Nova", "Flawless",
                "Combos @Nykaa", "Herbal Hair Care", "Routine Finder"],

            bathbody: ["Body Scrubs & Exfoliants", "Soaps", "Body Lotions & Moisturizers", "Body Butters", "Talcum Powder", "Essential Oils", "Hand Wash", "Hand Creams & Masks"
                , "Foot Care", "Sanitary Napkins", "Menstrual Cups", "Tampons", "Pantyliners", "Period Panties", "Cotton Buds & Balls", "Other Period Essentials", "Body Razors & Cartridges",
                "Face & Eyebrow Razors", "Wax & Wax Strips", "Hair Removal Creams", "Epilators & Bikini Trimmers", "Pre & Post Wax Essentials", "Razors & Catridges", "Shaving Cream", "Foams & Gels",
                , "Pre & Post Shaves", "Shaving Brush", "Shavers & Trimmers", "Beard & Moustache Care", "Intimate Care", "Deodorants / Roll - ons", "Body Mist / Spray", "Colognes", "Toothpaste", "Manual Toothbrush"
                , "Mouthwash", "Floss & Tongue Cleaners", "Manicure Pedicure Kits", "Loofahs", "Bath Accessories", "Bath & Body Kits", "Bath & Body Combos", "Bath & Body Works", "mCaffeine", "NIVEA", "The Body Shop",
                "Vaseline", "Dove", "Wanderlust", "Gillette Venus", "Be Bodywise", "Plum BodyLovin", "Chemist at Play", "Lux", "Carmesi",
                "Daily Essentials", "Body Wash", "Body Lotions", "Face Razors for women", "Body Scrubs", "Deodorants"],

            natural: ["Face Wash", "Cleanser", "Moisturizer", "Face Cream", "Face Mist", "Toner", "Face Oils", "Sunscreen", "Day Cream", "Under Eye Care", "Face Bleach", "Serums",
                "Sheet Masks", "Masks & Peels", "Scrubs & Exfoliators", "Face Tools", "Face Gel", "Bath Salts & Bath Bombs", "Hands & Feet Care", "Bath Tools & Accessories", "Oral Care",
                "Shampoo & Cleanser", "Hair Masks", "Tools & Accessories", "Massage Oils", "Carrier Oils", "Candles", "Diffuser", "Incense Sticks", "Lipstick", "Kajal",
                "Eyeliner", "Mascara", "Nail Polish", "Lip Balm & Gloss", "Foundation & Concealer", "Blush & Highlighter", "Tools & Brushes", "Tea Tree Oil",
                "Eucalyptus Oil", "Rosemary Oil", "Jojoba Oil", "Peppermint Oil", "Biotique", "Lotus Herbals", "The Body Shop", "Kama Ayurveda", "Forest Essentials",
                "Khadi Natural", "Himalaya", "VLCC", "Dry Skin", "Normal Skin", "Oily Skin", "Combination Skin", "Tan Removal", "Pigmentation",
                "Acne Treatment", "Skin Lightening", "Anti Aging", "Dark Circles", "Hairfall"],

            mombaby: ["Body Wash & Soaps", "Baby Oil", "Hair Oil", "Baby Powder", "Shampoo & Conditioner", "Wipes & Buds", "Teeth & Dental Care", "Rash Cream", "Diapers", "Diaper Accessories",
                "Baby Grooming", "Baby Bedding", "Hair Care", "Dental Care", "Kids Makeup", "Stretch Mark Creams & Oils", "Breast Firming Gels & Creams", "Nipple Creams", "Nutritional Supplements",
                "Feeding Bottle & Nipples", "Teethers & Soothers", "Breast Pumps", "Breast Pads", "Cleaning & Feeding Accessories", "Bibs", "Sippers & Cups", "Nose & Ear Care", "Gripe Water & Tummy Roll On",
                "Detergents & Cleansers", "Handwash & Sanitizer", "Mosquito Repellent", "Maternity Bra", "Maternity Dress", "Maternity Tops", "Baby Dry Skin", "Cracked Nipple Cream", "Scalp Treatment",
                "Coconut Oil", "Almond Oil", "Heat Rash", "Body Toning & Firming", "Baby Skin Concerns"],

            healthwellness: ["Multivitamins", "Calcium & Vitamin D", "Magnesium & Zinc", "Omega 3 & Fish Oil", "Immunity Boosters & Vitamin C", "Melatonin (Sleep Care)", "Brain Boost", "Eye Care (Lutein)",
                "Gut Health", "Collagen", "Biotin", "Vitamin E", "Glutathione", "Other Beauty Supplements", "Whey Protein", "Plant Protein", "BCAA & Other Muscle Support", "Protein & Energy Bars", "Protein Snacks",
                "Creatine", "L Glutamine", "Mass Gainer", "Weight Gain", "Apple Cider Vinegar (Weight Loss)", "Green Tea - Beverage", "Green Coffee - Beverage", "Fat Burner", "Slimming Shakes & Juices",
                "Sugar Substitutes", "Health Drinks", "Edible Honey", "Dry Fruits, Nuts & Berries", "Edible Seeds", "Oils & Ghee", "Black Tea & Coffee", "Herbal Teas", "Breakfast Cereals", "Peanut Butter", "Other Health Foods",
                "Cardio Equipment", "Strength Training", "Fitness Accessories", "Weighing Scales", "Fitness", "Supports & Braces", "Muscular & Ortho", "Period Cramps", "Other Pain", "Health & Wellness Kits",
                "Health & Wellness Combos", "Pregnancy Kits", "Smart Wearables", "Ashwagandha", "Neem (Powder & Tablets)", "Amla Juice", "Aloe Vera (Tablets & Juice)", "Milk Thistle (Liver)", "Wheatgrass (Powder & Juice)",
                "Tulsi (Tablets & Juices)", "Giloy & Guduchi (Tablets & Juice)", "Turmeric (Tablets & Juice)", "Spirulina & Moringa (Tablets & Powder)", "Chyavanprash", "Shilajit", "Other Herbal Supplements",
                "Diabetes", "Digestion (Gut Health)", "Organs - Liver, Heart, Kidney", "Safety & First Aid", "Weakness & Vitality", "Kids Nutrition", "Mental Wellness", "Blood Pressure",
                "Hormonal Balance", "Calm & Sleep"],

            men: ["Razors & cartridges", "Shavers", "Trimmers", "Shaving Creams", "Shaving Foams", "Shaving Gels", "Pre & Post Shaves", "Aftershave Lotion", "Shaving Brushes", "Beard Oil",
                "Beard Butter", "Beard Softener", "Beard Wash", "Beard Wax", "Moustache Oil", "Beard Comb", "Moustache Wax", "Beard Kits", "Beard Gel", "Beard Balm", "Beard Cream", "Beard Serum", "Beard Mist",
                "Beard Colour", "Beard Shampoo", "Shampoo", "Conditioner", "Hair Styling", "Hair Color", "Hair Oils", "Professional Products", "Face Wash", "Moisturizers", "Sunscreen", "Masks & Peels",
                "Scrubs & Exfoliators", "Fairness", "Bath/Shower Gels", "Soaps", "Body Scrubs", "Talc", "Dental Care", "Body Lotions", "Intimate Care", "Deodorants/Roll Ons", "Colognes & Perfumes (EDT & EDP)",
                "Luxe Fragrances", "Anti Dandruff", "Anti Hairfall", "Scalp Treatment", "Anti Acne", "Anti Ageing", "Sexual Wellness", "Health Supplements", "Weight Management", "Sports Nutrition",
                "Beardo", "Gilette", "Livon", "Nivea", "Park Avenue", "Routine Finder", "The Gift Store"],

            fragrance: ["Perfumes (EDT / EDP)", "Body Mists / Sprays", "Perfumes (EDT / EDP)", "Earthy & Woody", "Floral", "Fresh & Aquatic", "Spicy & Warm", "Oud Collection", "Fruity",
                "Aromatherapy", "Candles", "Diffuser", "Incense Sticks", "Dior", "Gucci", "Yves Saint Laurent", "Bvlgari", "Davidoff", "Versace", "Giorgio Armani", "Bella Vita organic", "Plum",
                "Victoria Secret", "Bath and Body Works", "Nykaa Perfumery", "Renee", "Carlton London perfume", "Engage", "explore all", "Dior", "Hermès", "Jo Malone London", "Guerlain", "BVLGARI",
                "Salvatore Ferragamo", "Calvin Klein", "Giorgio Armani", "Davidoff", "Paco Rabanne", "Carolina Herrera", "Yves Saint Laurent", "Elie Saab", "Dolce&Gabbana", "Narciso Rodriguez", "Hugo Boss",
                "Montblanc"],

            lingerieaccessories: ["Bras", "Underwear", "Sleep & Lounge", "Shapewear", "Swimwear", "Maternity Wear", "Activewear", "Smart Watches & Activity Tracker", "Sling Bags", "Handbags", "Wallets & Card Cases", "Tote Bags",
                "Backpacks & Duffel Bags", "Satchels", "Clutches", "Laptop Bags", "Vanity Bags & Pouches", "Batuas & Potlis", "Sports shoes & Sneakers", "Sandals", "Heels", "Flats", "Flip Flops", "Wedges", "Boots", "Jutttis",
                "Kolhapuris", "Stilletos", "Loafers", "Earrings", "Necklaces", "Jewellery Sets", "Maang Tikka", "Bracelets & Bangles", "Rings", "Mangalsutra", "Anklets", "Decor", "Bedding", "Storage", "Home Essentials",
                "NYKD by Nykaa", "Puma", "Jockey", "Zivame", "Pipa Bella by Nykaa Fashion", "Accessorize London", "Shoetopia", "Twenty Dresses", "NFI Essentials", "Enamor", "Titan"],

        };

        const categoryKeys = Object.keys(categories);

        const generateUniqueGender = (index) => {
            const baseGenders = ['Male', 'Female', 'Unisex'];
            const randomSuffix = `-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
            return `${baseGenders[index % baseGenders.length]}${randomSuffix}`;
        };

        // Generate 1000 products with unique gender values
        const totalData = 1000;

        const products = Array.from({ length: totalData }).map((_, index) => {

            const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
            const subCategories = categories[randomCategory];

            const validSubCategories = Array.isArray(subCategories) && subCategories.length > 0;

            if (!validSubCategories) {
                console.warn(`No subcategories found for category: ${randomCategory}`);
            }

            return ({
                _id: new mongoose.Types.ObjectId(),
                title: `Product ${index + 1} -${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                // gender: ['Male', 'Female', 'Unisex'][Math.floor(Math.random() * 100)],
                gender: generateUniqueGender(index),
                category: randomCategory,
                // subCategory: subCategories[Math.floor(Math.random() * subCategories.length)],
                subCategory: validSubCategories
                    ? subCategories[Math.floor(Math.random() * subCategories.length)]
                    : "General",

                brand_name: [
                    "A Big Indian Story", "A Clutch Story", "A Fragrance Story", "A'kin", "Aadita", "AANCHAL SAYAL", "AAPNO RAJASTHAN", "Aaranyaa", "Aaruvi Ruchi Verma"
                    , "Aastey", "Aatmana", "Abdesigns", "ABELARDO DE MODA", "Abelino", "Abena", "Absorbia", "Accessher", "Accessorize London", "Ace Nutrimony", "ACE THE SPACE", "Acne Squad"
                    , "Acne-X Topical", "Acnestar", "Actifit", "Adam Wulf", "Addery", "Addons", "Adhyay", "adidas", "Adidas Fragrances", "adidas Originals", "Adigo", "Adira", "ADITI WASAN"
                    , "Adwitiya", "ADYA", "Aeropostale", "Aesthetic Bodies", "AESTHETIC NATION", "Affaires", "AFFOREST", "Aflairza", "Afzal", "Agaro", "Agro Composites", "Ahaglow", "AHC"
                    , "Aigner", "Ajmal India", "Akira Furnishings", "Akiva", "Akulya Jewels", "Alainne", "Alan Truman", "ALANNA", "Albatross", "Alberto Torresi", "Alcis", "Alcove",
                    "Babila", "BABY FOREST", "Babyliss", "Babymama", "Bacca Bucci", "BadgePack Designs", "baes CLUB", "Baesic", "BAEYORK", "Bag of Small Things", "BAGATT", "Baggit"
                    , "Bagsy Malone", "Baidyanath", "Baise Gaba", "Bajaj", "BAKE", "Baked Beauty", "Baldessarini", "Balenzia", "Baller Athletik", "Balzano", "Bambo Nature", "Banana Republic"
                    , "Bangalore Refinery", "BANILA CO", "Bansri", "Baomi", "Barbie", "Barcode Professional", "C.A.L Los Angeles", "C2P Pro", "C9 Airwear", "Cacharel", "CADIVEU", "Caim by Arelang", "Calcimax", "Call It Spring"
                    , "Callesta", "Calvadoss", "Calvin Klein", "Camay", "Campus", "Candere by Kalyan Jewellers", "Candes", "Candyskin", "Canon", "Caprese", "d'you", "D1 Milano", "Da Firenzie",
                    "Da Intimo", "Da Milano", "Dab to Fab", "Dabur", "Dafni", "Daily Life Forever52", "DailyObjects", "Daisy Dixon", "Dame", "Daniel Klein", "Daniel Wellington", "Dartington",
                    "Dashing Diva", "DASTOOR", "Daughter Earth", "e.l.f. Cosmetics", "E2O", "Earnshaw", "Earth Bags", "Earth Rhythm", "Earth Science Ayurveda", "earthBaby", "Earthika"
                    , "Earthraga", "EASTHIDE", "Eat Anytime", "Ebel", "Eco Corner", "Ecoberry", "Ecofynd", "EcoRight", "ECOVANI", "eCraftIndia", "Faaya Gifting", "FabAlley", "Fabbhue", "Fabindia",
                    "Fabindia Fashion", "Fable & Mane", "Fablestreet", "Fabskin", "Fabula", "Face Rituals", "Faces Canada", "Fade Out", "FAE Beauty", "Fair & Handsome", "FAITH & PATIENCE", "FAMMEDI",
                    "FancyPants", "Farmacy Beauty", "Fasderma", "FASHION COLOUR", "g HK glowup", "Gabit", "Gajra Gang", "Gala of London", "Galact", "GANS", "GANT", "Garden Essentials", "Garnier", "GAT", "Gathari", "Gatsby", "Gauri International"
                    , "Gc", "Gem Roller", "GEMBLUE BioCare", "GEMERIA HAIR", "Genie", "GENIPS", "Gentlemen's Crew", "Getmecraft", "Ghar Soaps", "GHD", "GIAN MARCO VENTURI"
                    , "Gibox", "Gillette", "Gillette Venus", "Gio Collection", "Gioia", "Giordano", "Giorgio Armani", "Giovanni", "Girlactik", "Gisada", "GIVA", "Givenchy", "GK Hair"
                    , "GLAD I MET YOU", "GLAM STORY", "GLAM21", "GlamGals", "Glamina", "GLAMOUR WORLD AYURVEDIC", "GlamPalm", "Glamveda", "Glasafe", "GLASSLOCK", "Gleevers", "GLEVA"
                    , "Global Beauty Secrets", "Hackett", "Hair & Care", "Hair Drama Co.", "HAIR4REAL", "Hair4U", "Hairmac", "Haironic", "HairOriginals", "HairPro", "Hajamat", "Half N Half", "HAMELIN"
                    , "Hamilton Beach", "HAMMER", "Hammonds", "Hampa", "Hamster London", "HANOWA", "Happier", "Happilo", "Happy Socks", "Happywagon", "Harissons", "Harley Davidson"
                    , "Harold Meagan", "Harpic", "Haruharu Wonder", "HASK", "Haus & Kinder", "Haute Sauce", "Havells", "Hawkins & Brimble", "HAZELTHREAD", "HE", "Head & Shoulders"
                    , "Heads Up For Tails", "Health Veda Organics", "HealthKart", "HealthSense", "HealthVit", "HealthViva", "Healthy Treat", "HealthyHey", "Hector Professional",
                    "IDEE", "IDUN Minerals", "iGRiD", "Ikiriya", "Ikonic Basics", "Ikonic Luxure", "Ikonic Me", "Ikonic Professional", "Ilana", "ILEM JAPAN", "Iluvia", "IMAGE", "IMARS FASHION"
                    , "Immunace", "Imperio", "ImPower", "Inaari", "Inalsa", "Inatur", "Inaya Accessories", "Inc.5", "INCHIS", "Incolor", "Indalo", "inde wild", "India Grooming Club"
                    , "Indica", "Indigifts", "Indivara by Muthoot", "Indulekha", 'Indulgeo Essentials', 'Indus Valley', "Inflame", "Infuzze", "Ingersoll", "Inglot", "Inhouse by Maspar"
                    , "Inja", "Inkmilan", "Inlife", "Inner Sense", "Innisfree", "Insight Cosmetics", "Insight Professional", "Instyle", "Intellilens", "INTIMATE QUEEN", "Intimo",
                    "James Bond 007", "JANEKE", "Japam", "Jaquline USA", "JASMEY HOMES", "Jazz and Sizzle", "JBL", "JCPL", "Jean Paul Gaultier", "Jekyll & Hide", "Jena"
                    , "Jennifer Lopez", "Jergens", "Jeva", "Jewels Galaxy", "Jewelz", "JiHa", "JILMIL", "Jimmy Choo", "Jimmy Choo Accessories", "Jiva Ayurveda", "Jo Malone London"
                    , "Jockey", "John Jacobs", "John's", "Johnson's", "Johori", "Jointace C2", "Joker & Witch", "Jolen New York", "Joseph Joseph", "Joules By Radhika",
                    "KADAM HAAT", "Kaefie", "KAEK BEAUTY", "Kai", " Kai India", "Kai Jewel", " Kairali", "Kaiv", "KAL HANS NATURALS", "KALKI FASHION"
                    , "Kama Ayurveda", "KamaSutra", "KANELLE Fragrances", "Kaniry Artise of Novelty", "Kanpeki", "Kanvas Katha", "Kanvin", "Kapiva Ayurveda"
                    , "Kapoor Lamp Shades", "Karatcart", "Karighar", "Karma Kettle", "KARMIC BEAUTY ", "L'Ange", "L'Occitane", "L'Oreal Paris", "L'Oreal Professionnel", "L.A. Colors", "L.A. Girl", "La Cafetiere", "La Cremerie", "La Dimora Selections"
                    , "La Fiza", " La French", "La Mior", "La Pink", "La Rochere", "La Shield",
                ][Math.floor(Math.random() * 375)],

                price: Number((Math.random() * 500).toFixed(2)),
                description: `Description for Product ${index + 1}`,
                origin_countery: ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan",
                    "India", "Brazil", "South Africa"][Math.floor(Math.random() * 10)],
                stock: Math.floor(Math.random() * 10) + 1,
                images: ['image1.jpg', 'image2.jpg'], // Example images
                ml: Number((Math.random() * 500).toFixed(0)),
                howUse: `How to use  for Product ${index + 1}`,
                discount: Math.floor(Math.random() * 30),
                rating: (Math.random() * 5).toFixed(1),
                userId: new mongoose.Types.ObjectId()
            })
        });

        await productModel.insertMany(products);
        console.log('100 products created!');
    } catch (error) {
        console.error('Error generating products:', error);
    } finally {
        mongoose.disconnect();
    };
}
generateProducts();
