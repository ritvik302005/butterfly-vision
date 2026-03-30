from typing import Any


KNOWN_SPECIES: dict[str, dict[str, str]] = {
    "paper kite": {
        "commonName": "Paper Kite",
        "scientificName": "Idea leuconoe",
        "family": "Nymphalidae",
        "description": "The Paper Kite is a large, slow-flying butterfly known for its translucent white wings traced with bold black veins. It is especially striking in flight, where its floating motion gives it a graceful, gliding appearance.",
        "habitat": "Tropical gardens, forest edges, parks, and humid lowland habitats.",
        "conservationStatus": "Least Concern",
        "funFact": "Paper Kites are often called rice paper butterflies because their pale wings look like delicate handmade paper.",
        "distributionSummary": "Commonly found across Southeast Asia, especially in warm tropical and subtropical regions.",
        "distributionPoints": [
            {"name": "Malaysia", "lat": 4.2, "lng": 102.0},
            {"name": "Indonesia", "lat": -2.5, "lng": 118.0},
            {"name": "Philippines", "lat": 13.0, "lng": 122.0},
        ],
    },
    "monarch": {
        "commonName": "Monarch",
        "scientificName": "Danaus plexippus",
        "family": "Nymphalidae",
        "description": "The Monarch is one of the most recognizable butterflies in the world, with vivid orange wings patterned by black veins and white-spotted borders. It is famous for long-distance migration and strong association with milkweed plants.",
        "habitat": "Open meadows, gardens, grasslands, roadsides, and migratory corridors.",
        "conservationStatus": "Vulnerable",
        "funFact": "Monarch butterflies can migrate thousands of kilometers between breeding and overwintering grounds.",
        "distributionSummary": "Found widely in North America and also in parts of Central America, Australia, and other warm regions.",
        "distributionPoints": [
            {"name": "United States", "lat": 39.8, "lng": -98.6},
            {"name": "Mexico", "lat": 23.6, "lng": -102.5},
            {"name": "Canada", "lat": 56.1, "lng": -106.3},
        ],
    },
    "common mormon": {
        "commonName": "Common Mormon",
        "scientificName": "Papilio polytes",
        "family": "Papilionidae",
        "description": "A widely distributed swallowtail butterfly known for its elegant wing shape and mimicry patterns. It is often seen fluttering through gardens, woodland edges, and semi-urban green spaces.",
        "habitat": "Gardens, scrubland, woodland edges, and agricultural landscapes.",
        "conservationStatus": "Least Concern",
        "funFact": "Females of the Common Mormon can mimic several toxic butterfly species to reduce predation.",
        "distributionSummary": "Common across South and Southeast Asia, especially India, Sri Lanka, and nearby tropical regions.",
        "distributionPoints": [
            {"name": "India", "lat": 22.0, "lng": 78.0},
            {"name": "Sri Lanka", "lat": 7.8, "lng": 80.7},
            {"name": "Thailand", "lat": 15.8, "lng": 101.0},
        ],
    },
    "blue tiger": {
        "commonName": "Blue Tiger",
        "scientificName": "Tirumala limniace",
        "family": "Nymphalidae",
        "description": "This butterfly is recognized for its dark wings patterned with pale bluish streaks. It is a graceful flier and often appears in clusters during seasonal movements.",
        "habitat": "Open forests, gardens, moist deciduous regions, and migration corridors.",
        "conservationStatus": "Least Concern",
        "funFact": "Blue Tigers are known for long-distance movements and can gather in large migratory groups.",
        "distributionSummary": "Found widely in South Asia and Southeast Asia, particularly in humid and forested belts.",
        "distributionPoints": [
            {"name": "India", "lat": 20.6, "lng": 78.9},
            {"name": "Bangladesh", "lat": 23.7, "lng": 90.3},
            {"name": "Malaysia", "lat": 4.2, "lng": 102.0},
        ],
    },
    "common jezebel": {
        "commonName": "Common Jezebel",
        "scientificName": "Delias eucharis",
        "family": "Pieridae",
        "description": "A striking butterfly with white upper wings and vividly patterned undersides in yellow, red, and black. It is commonly seen basking or feeding in flowering trees.",
        "habitat": "Urban gardens, forest edges, orchards, and flowering tree canopies.",
        "conservationStatus": "Least Concern",
        "funFact": "Its bright underside coloration acts as a warning signal to predators.",
        "distributionSummary": "Usually seen in India and neighboring tropical Asian regions with rich flowering vegetation.",
        "distributionPoints": [
            {"name": "India", "lat": 21.0, "lng": 79.0},
            {"name": "Nepal", "lat": 28.3, "lng": 84.0},
            {"name": "Myanmar", "lat": 21.1, "lng": 96.0},
        ],
    },
    "tailed jay": {
        "commonName": "Tailed Jay",
        "scientificName": "Graphium agamemnon",
        "family": "Papilionidae",
        "description": "A fast-flying green-spotted swallowtail that prefers lush tropical vegetation. It is active and agile, often hard to photograph in motion.",
        "habitat": "Evergreen forests, plantations, and tropical gardens.",
        "conservationStatus": "Least Concern",
        "funFact": "The Tailed Jay is among the quickest and most energetic fliers in many Asian butterfly habitats.",
        "distributionSummary": "Distributed through tropical Asia, especially across India, Sri Lanka, and Southeast Asia.",
        "distributionPoints": [
            {"name": "India", "lat": 16.5, "lng": 80.6},
            {"name": "Sri Lanka", "lat": 7.9, "lng": 80.7},
            {"name": "Indonesia", "lat": -2.5, "lng": 118.0},
        ],
    },
    "red admiral": {
        "commonName": "Red Admiral",
        "scientificName": "Vanessa atalanta",
        "family": "Nymphalidae",
        "description": "The Red Admiral is a bold, fast-flying butterfly with dark wings crossed by vivid red bands and white markings near the tips. It is active, alert, and commonly seen basking with wings partially open.",
        "habitat": "Woodland edges, gardens, parks, and open countryside.",
        "conservationStatus": "Least Concern",
        "funFact": "Red Admirals are known to be territorial and may chase away other butterflies from sunny perches.",
        "distributionSummary": "Widespread across Europe, Asia, North America, and parts of North Africa.",
        "distributionPoints": [
            {"name": "United Kingdom", "lat": 54.0, "lng": -2.0},
            {"name": "Germany", "lat": 51.0, "lng": 10.0},
            {"name": "United States", "lat": 39.8, "lng": -98.6},
        ],
    },
    "painted lady": {
        "commonName": "Painted Lady",
        "scientificName": "Vanessa cardui",
        "family": "Nymphalidae",
        "description": "The Painted Lady is an orange-brown butterfly decorated with black and white spots and delicate underside eyespots. It is one of the most widespread butterfly species and is admired for its adaptability and migration.",
        "habitat": "Fields, gardens, grasslands, farmland, and open scrub.",
        "conservationStatus": "Least Concern",
        "funFact": "The Painted Lady is considered one of the most widely distributed butterflies on Earth.",
        "distributionSummary": "Found on every continent except Antarctica, especially in temperate and warm open habitats.",
        "distributionPoints": [
            {"name": "Europe", "lat": 50.0, "lng": 15.0},
            {"name": "India", "lat": 22.0, "lng": 78.0},
            {"name": "Australia", "lat": -25.0, "lng": 134.0},
        ],
    },
    "peacock": {
        "commonName": "Peacock",
        "scientificName": "Aglais io",
        "family": "Nymphalidae",
        "description": "The Peacock butterfly is famous for its eye-like wing patterns, which help startle predators. Its rich reddish wings and large blue-ringed eyespots make it one of the most visually dramatic butterflies.",
        "habitat": "Gardens, woodland clearings, meadows, and hedgerows.",
        "conservationStatus": "Least Concern",
        "funFact": "Its large eyespots can frighten birds when the butterfly suddenly opens its wings.",
        "distributionSummary": "Mostly distributed across Europe and temperate Asia.",
        "distributionPoints": [
            {"name": "United Kingdom", "lat": 54.0, "lng": -2.0},
            {"name": "France", "lat": 46.0, "lng": 2.0},
            {"name": "Turkey", "lat": 39.0, "lng": 35.0},
        ],
    },
    "blue morpho": {
        "commonName": "Blue Morpho",
        "scientificName": "Morpho peleides",
        "family": "Nymphalidae",
        "description": "The Blue Morpho is renowned for its brilliant metallic blue upper wings, which flash vividly in sunlight. Despite the bright upper side, its underside is brown and patterned with eyespots for camouflage.",
        "habitat": "Rainforests, forest edges, and humid tropical habitats.",
        "conservationStatus": "Least Concern",
        "funFact": "The intense blue shimmer is created by microscopic wing scales that reflect light rather than blue pigment alone.",
        "distributionSummary": "Typically found in Central and South American tropical forests.",
        "distributionPoints": [
            {"name": "Costa Rica", "lat": 9.7, "lng": -84.0},
            {"name": "Brazil", "lat": -14.2, "lng": -51.9},
            {"name": "Colombia", "lat": 4.5, "lng": -74.1},
        ],
    },
    "ulyses": {
        "commonName": "Ulyses",
        "scientificName": "Papilio ulysses",
        "family": "Papilionidae",
        "description": "The Ulyses butterfly is a spectacular swallowtail with vivid electric-blue wings edged in dark black. It is often associated with tropical rainforests and is admired for its bold coloration and swift flight.",
        "habitat": "Rainforests, tropical gardens, and forest margins.",
        "conservationStatus": "Least Concern",
        "funFact": "Ulyses butterflies are iconic in parts of Australia and are often featured in nature tourism imagery.",
        "distributionSummary": "Found mainly in northeastern Australia, New Guinea, and nearby islands.",
        "distributionPoints": [
            {"name": "Queensland", "lat": -19.0, "lng": 146.8},
            {"name": "Papua New Guinea", "lat": -6.3, "lng": 143.9},
            {"name": "Solomon Islands", "lat": -9.6, "lng": 160.2},
        ],
    },
    "zebra long wing": {
        "commonName": "Zebra Long Wing",
        "scientificName": "Heliconius charithonia",
        "family": "Nymphalidae",
        "description": "The Zebra Long Wing has elongated black wings striped with pale yellow bands, giving it a clean, unmistakable pattern. It is a slow and elegant flier often seen visiting flowers in sunny habitats.",
        "habitat": "Open woodland, gardens, forest edges, and subtropical habitats.",
        "conservationStatus": "Least Concern",
        "funFact": "Zebra Long Wings are unusual because adults can feed on pollen as well as nectar, helping them live longer than many butterflies.",
        "distributionSummary": "Found across the southern United States, Central America, and parts of South America.",
        "distributionPoints": [
            {"name": "Florida", "lat": 27.8, "lng": -81.7},
            {"name": "Costa Rica", "lat": 9.7, "lng": -84.0},
            {"name": "Panama", "lat": 8.5, "lng": -80.0},
        ],
    },
}

FAMILY_BY_LABEL: dict[str, str] = {
    "ADONIS": "Lycaenidae",
    "AFRICAN GIANT SWALLOWTAIL": "Papilionidae",
    "AMERICAN SNOOT": "Nymphalidae",
    "AN 88": "Nymphalidae",
    "APPOLLO": "Papilionidae",
    "ATALA": "Lycaenidae",
    "BANDED ORANGE HELICONIAN": "Nymphalidae",
    "BANDED PEACOCK": "Nymphalidae",
    "BECKERS WHITE": "Pieridae",
    "BLACK HAIRSTREAK": "Lycaenidae",
    "BLUE MORPHO": "Nymphalidae",
    "BLUE SPOTTED CROW": "Nymphalidae",
    "BROWN SIPROETA": "Nymphalidae",
    "CABBAGE WHITE": "Pieridae",
    "CAIRNS BIRDWING": "Papilionidae",
    "CHECQUERED SKIPPER": "Hesperiidae",
    "CHESTNUT": "Nymphalidae",
    "CLEOPATRA": "Pieridae",
    "CLODIUS PARNASSIAN": "Papilionidae",
    "CLOUDED SULPHUR": "Pieridae",
    "COMMON BANDED AWL": "Hesperiidae",
    "COMMON WOOD-NYMPH": "Nymphalidae",
    "COPPER TAIL": "Lycaenidae",
    "CRECENT": "Nymphalidae",
    "CRIMSON PATCH": "Nymphalidae",
    "DANAID EGGFLY": "Nymphalidae",
    "EASTERN COMA": "Nymphalidae",
    "EASTERN DAPPLE WHITE": "Pieridae",
    "EASTERN PINE ELFIN": "Lycaenidae",
    "ELBOWED PIERROT": "Lycaenidae",
    "GOLD BANDED": "Nymphalidae",
    "GREAT EGGFLY": "Nymphalidae",
    "GREAT JAY": "Nymphalidae",
    "GREEN CELLED CATTLEHEART": "Papilionidae",
    "GREY HAIRSTREAK": "Lycaenidae",
    "INDRA SWALLOW": "Papilionidae",
    "IPHICLUS SISTER": "Nymphalidae",
    "JULIA": "Nymphalidae",
    "LARGE MARBLE": "Pieridae",
    "MALACHITE": "Nymphalidae",
    "MANGROVE SKIPPER": "Hesperiidae",
    "MESTRA": "Nymphalidae",
    "METALMARK": "Riodinidae",
    "MILBERTS TORTOISESHELL": "Nymphalidae",
    "MONARCH": "Nymphalidae",
    "MOURNING CLOAK": "Nymphalidae",
    "ORANGE OAKLEAF": "Nymphalidae",
    "ORANGE TIP": "Pieridae",
    "ORCHARD SWALLOW": "Papilionidae",
    "PAINTED LADY": "Nymphalidae",
    "PAPER KITE": "Nymphalidae",
    "PEACOCK": "Nymphalidae",
    "PINE WHITE": "Pieridae",
    "PIPEVINE SWALLOW": "Papilionidae",
    "POPINJAY": "Nymphalidae",
    "PURPLE HAIRSTREAK": "Lycaenidae",
    "PURPLISH COPPER": "Lycaenidae",
    "QUESTION MARK": "Nymphalidae",
    "RED ADMIRAL": "Nymphalidae",
    "RED CRACKER": "Nymphalidae",
    "RED POSTMAN": "Nymphalidae",
    "RED SPOTTED PURPLE": "Nymphalidae",
    "SCARCE SWALLOW": "Papilionidae",
    "SILVER SPOT SKIPPER": "Hesperiidae",
    "SLEEPY ORANGE": "Pieridae",
    "SOOTYWING": "Hesperiidae",
    "SOUTHERN DOGFACE": "Pieridae",
    "STRAITED QUEEN": "Nymphalidae",
    "TROPICAL LEAFWING": "Nymphalidae",
    "TWO BARRED FLASHER": "Hesperiidae",
    "ULYSES": "Papilionidae",
    "VICEROY": "Nymphalidae",
    "WOOD SATYR": "Nymphalidae",
    "YELLOW SWALLOW TAIL": "Papilionidae",
    "ZEBRA LONG WING": "Nymphalidae",
}


def humanize_label(label: str) -> str:
    cleaned = label.replace("_", " ").replace("-", " ").strip()
    return " ".join(part.capitalize() for part in cleaned.split())


def get_family_for_label(label: str) -> str:
    normalized = label.strip().upper().replace("_", " ")
    return FAMILY_BY_LABEL.get(normalized, "Butterfly species")


def generate_fallback_metadata(label: str, confidence: float) -> dict[str, Any]:
    common_name = humanize_label(label)
    scientific_name = label.replace("_", " ").strip().title()
    family = get_family_for_label(label)

    family_descriptions = {
        "Papilionidae": "This butterfly belongs to the swallowtail family, a group known for strong flight, elegant wing structure, and often striking tail-like extensions on the hindwings.",
        "Nymphalidae": "This butterfly belongs to the brush-footed butterfly family, a large and diverse group recognized for colorful wing patterns and broad habitat adaptability.",
        "Pieridae": "This butterfly belongs to the white and sulphur butterfly family, often characterized by light yellow, orange, or white wings and active daytime flight.",
        "Lycaenidae": "This butterfly belongs to the blues, coppers, and hairstreaks family, which typically includes smaller butterflies with delicate wing markings.",
        "Hesperiidae": "This butterfly belongs to the skipper family, known for compact bodies, hooked antennae, and fast darting flight.",
        "Riodinidae": "This butterfly belongs to the metalmark family, a group noted for fine wing patterns and reflective spots or markings.",
    }

    family_habitats = {
        "Papilionidae": "Usually found in gardens, forest edges, plantations, and tropical or subtropical green habitats.",
        "Nymphalidae": "Often found in woodland edges, meadows, gardens, tropical forests, and open sunny vegetation.",
        "Pieridae": "Typically seen in open grasslands, farmlands, gardens, flowering fields, and lightly wooded areas.",
        "Lycaenidae": "Common in grasslands, scrublands, meadows, and open areas with host plants and wildflowers.",
        "Hesperiidae": "Frequently seen in grassy habitats, low vegetation, woodland margins, and sunny trails.",
        "Riodinidae": "Usually associated with forest edges, tropical vegetation, and warm habitats rich in host plants.",
    }

    family_fun_facts = {
        "Papilionidae": "Many swallowtails are admired for their powerful flight and dramatic wing shapes.",
        "Nymphalidae": "Brush-footed butterflies often have reduced forelegs, giving them their family name.",
        "Pieridae": "Pierid butterflies are among the most active daytime nectar feeders in open habitats.",
        "Lycaenidae": "Many lycaenids have delicate colors that shimmer beautifully in sunlight.",
        "Hesperiidae": "Skippers are easy to recognize by their quick, skipping flight style.",
        "Riodinidae": "Metalmarks are named for the metallic-looking markings found on many species.",
    }

    return {
        "commonName": common_name,
        "scientificName": scientific_name,
        "family": family,
        "description": family_descriptions.get(
            family,
            f"{common_name} is a butterfly species identified by the model. It belongs to a visually distinctive group of butterflies recognized for patterned wings and ecological importance in pollination and biodiversity."
        ),
        "habitat": family_habitats.get(
            family,
            "Typically found in warm, vegetated habitats where nectar plants and host plants are available."
        ),
        "conservationStatus": "Not specified",
        "funFact": family_fun_facts.get(
            family,
            "Butterflies are important ecological indicators because their diversity often reflects habitat health."
        ),
        "distributionSummary": "This species is typically associated with tropical, subtropical, or temperate butterfly habitats depending on its natural range.",
        "distributionPoints": [
            {"name": "South Asia", "lat": 20.0, "lng": 78.0},
            {"name": "Southeast Asia", "lat": 10.0, "lng": 105.0},
        ],
    }


def get_species_info(label: str, confidence: float) -> dict[str, Any]:
    key = label.strip().lower().replace("_", " ").replace("-", " ")
    if key in KNOWN_SPECIES:
        data = KNOWN_SPECIES[key].copy()
    else:
        data = generate_fallback_metadata(label, confidence)

    data["label"] = label
    data["confidence"] = confidence
    return data
