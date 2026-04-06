// Para agregar una imagen a un set:
// 1. Copia la imagen a la carpeta: public/images/
// 2. Actualiza imageSrc con el nombre del archivo: '/images/tu-imagen.jpg'
// Los valores x e y son posiciones en % sobre la imagen (0 = izquierda/arriba, 100 = derecha/abajo)

export const wordSets = [
  {
    id: 1,
    title: "The Human Body",
    emoji: "🧍",
    level: "Beginner",
    imageSrc: '/images/body.jpg',
    labels: [
      { id: "head",     word: "Head",     spanish: "Cabeza",   x: 55, y: 40  },
      { id: "neck",     word: "Neck",     spanish: "Cuello",   x: 48, y: 42 },
      { id: "shoulder", word: "Shoulder", spanish: "Hombro",   x: 39, y: 30 },
      { id: "chest",    word: "Chest",    spanish: "Pecho",    x: 46, y: 65 },
      { id: "arm",      word: "Arm",      spanish: "Brazo",    x: 58, y: 60 },
      { id: "hand",     word: "Hand",     spanish: "Mano",     x: 48,  y: 15 },
      { id: "leg",      word: "Leg",      spanish: "Pierna",   x: 36, y: 80 },
      { id: "knee",     word: "Knee",     spanish: "Rodilla",  x: 39, y: 88 },
      { id: "foot",     word: "Foot",     spanish: "Pie",      x: 55, y: 88 }
    ]
  },
  {
    id: 2,
    title: "Animals",
    emoji: "🐾",
    level: "Beginner",
    imageSrc: '/images/animals.jpg',
    labels: [
      { id: "sheep",      word: "Sheep",      spanish: "Oveja",    x: 30, y: 60 },
      { id: "frog",      word: "Frog",      spanish: "Rana",     x: 13, y: 88 },
      { id: "pig",     word: "Pig",     spanish: "Cerdo",   x: 50, y: 55 },
      { id: "bee",     word: "Bee",     spanish: "Abeja",      x: 76, y: 87 },
      { id: "rooster",   word: "Rooster",   spanish: "Gallo",   x: 65, y: 65 },
      { id: "horse",    word: "Horse",    spanish: "Caballo",  x: 28, y: 40 },
      { id: "cow",      word: "Cow",      spanish: "Vaca",     x: 75, y: 42 },
      { id: "duck",     word: "Duck",     spanish: "Pato",     x: 55, y: 85 }
    ]
  },
  {
    id: 3,
    title: "The House",
    emoji: "🏠",
    level: "Beginner",
    imageSrc: '/images/house.jpg',
    labels: [
      { id: "roof",     word: "Roof",     spanish: "Techo",    x: 23, y: 29  },
      { id: "wall",     word: "Wall",     spanish: "Pared",    x: 85, y: 70 },
      { id: "door",     word: "Door",     spanish: "Puerta",   x: 55, y: 75 },
      { id: "window",   word: "Window",   spanish: "Ventana",  x: 75, y: 45 },
      { id: "floor",    word: "Floor",    spanish: "Suelo",    x: 50, y: 90 },
      { id: "stairs",   word: "Stairs",   spanish: "Escaleras",x: 45, y: 70 },
      { id: "chair",  word: "Chair",  spanish: "Silla", x: 60, y: 53  },
      { id: "fridge",   word: "Fridge",   spanish: "Nevera",   x: 15, y: 80 }
    ]
  },
  {
    id: 4,
    title: "Clothing",
    emoji: "👕",
    level: "Beginner",
    imageSrc: null, // ej: '/images/clothing.jpg'
    labels: [
      { id: "hat",      word: "Hat",      spanish: "Sombrero", x: 50, y: 5  },
      { id: "shirt",    word: "Shirt",    spanish: "Camisa",   x: 50, y: 28 },
      { id: "jacket",   word: "Jacket",   spanish: "Chaqueta", x: 25, y: 30 },
      { id: "pants",    word: "Pants",    spanish: "Pantalón", x: 50, y: 60 },
      { id: "belt",     word: "Belt",     spanish: "Cinturón", x: 50, y: 47 },
      { id: "socks",    word: "Socks",    spanish: "Calcetines",x: 40, y: 90},
      { id: "shoes",    word: "Shoes",    spanish: "Zapatos",  x: 50, y: 95 },
      { id: "gloves",   word: "Gloves",   spanish: "Guantes",  x: 15, y: 45 }
    ]
  }
]
