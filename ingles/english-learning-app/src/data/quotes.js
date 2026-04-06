// Para agregar un video a una frase:
// 1. Copia el archivo .mp4 recortado a la carpeta: public/videos/
// 2. Cambia null por la ruta: videoSrc: '/videos/nombre-del-archivo.mp4'

export const quotes = [
  {
    id: 1,
    movie: "The Lion King",
    year: 1994,
    videoSrc: '/videos/lion-king.mp4',
    quote: "Hakuna Matata! It means no worries for the rest of your days.",
    options: [
      { text: "Significa que no hay de qué preocuparse por el resto de tus días.", correct: true },
      { text: "Significa que debes luchar por lo que quieres.", correct: false },
      { text: "Significa que los problemas siempre tienen solución.", correct: false },
      { text: "Significa que debes vivir con miedo.", correct: false }
    ]
  },
  {
    id: 2,
    movie: "Toy Story",
    year: 1995,
    videoSrc: '/videos/toy-story.mp4',
    quote: "To infinity and beyond!",
    options: [
      { text: "¡Hasta el infinito y más allá!", correct: true },
      { text: "¡Al infinito hay que tenerle miedo!", correct: false },
      { text: "¡El infinito no existe para mí!", correct: false },
      { text: "¡Más allá del infinito todo termina!", correct: false }
    ]
  },
  {
    id: 3,
    movie: "Forrest Gump",
    year: 1994,
    videoSrc: '/videos/forrest-gump.mp4',
    quote: "Life is like a box of chocolates. You never know what you're gonna get.",
    options: [
      { text: "La vida es como una caja de chocolates, nunca sabes lo que te va a tocar.", correct: true },
      { text: "La vida es dulce como el chocolate si trabajas duro.", correct: false },
      { text: "Nunca compartas tu caja de chocolates con nadie.", correct: false },
      { text: "Los chocolates son el secreto de la felicidad.", correct: false }
    ]
  },
  {
    id: 4,
    movie: "Finding Nemo",
    year: 2003,
    videoSrc: '/videos/finding-nemo.mp4',
    quote: "Just keep swimming. Just keep swimming.",
    options: [
      { text: "Sigue adelante sin rendirte, pase lo que pase.", correct: true },
      { text: "El mar es el mejor lugar para vivir.", correct: false },
      { text: "Aprender a nadar es la habilidad más importante.", correct: false },
      { text: "Los peces nunca deben parar de nadar.", correct: false }
    ]
  },
  {
    id: 5,
    movie: "The Dark Knight",
    year: 2008,
    videoSrc: '/videos/dark-knight.mp4',
    quote: "Why so serious?",
    options: [
      { text: "¿Por qué tan serio?", correct: true },
      { text: "¿Por qué eres tan aburrido?", correct: false },
      { text: "¿Por qué te preocupas tanto por todo?", correct: false },
      { text: "¿Por qué no te ríes nunca?", correct: false }
    ]
  },
  {
    id: 6,
    movie: "Titanic",
    year: 1997,
    videoSrc: '/videos/titanic.mp4',
    quote: "I'm the king of the world!",
    options: [
      { text: "¡Soy el rey del mundo!", correct: true },
      { text: "¡Quiero conquistar el mundo entero!", correct: false },
      { text: "¡El mundo entero me pertenece!", correct: false },
      { text: "¡Soy el hombre más rico del mundo!", correct: false }
    ]
  },
  {
    id: 7,
    movie: "Spider-Man",
    year: 2002,
    videoSrc: '/videos/spider-man.mp4',
    quote: "With great power comes great responsibility.",
    options: [
      { text: "Con un gran poder viene una gran responsabilidad.", correct: true },
      { text: "Solo los poderosos tienen responsabilidades.", correct: false },
      { text: "El poder hace que la vida sea más difícil.", correct: false },
      { text: "La responsabilidad da poder a las personas.", correct: false }
    ]
  },
  {
    id: 8,
    movie: "Shrek",
    year: 2001,
    videoSrc: '/videos/shrek.mp4',
    quote: "Ogres are like onions. They have layers.",
    options: [
      { text: "Los ogros son como cebollas, tienen capas", correct: true },
      { text: "Los ogros huelen tan mal como las cebollas.", correct: false },
      { text: "Los ogros y las cebollas son los mejores amigos.", correct: false },
      { text: "Los ogros lloran tanto como las cebollas te hacen llorar.", correct: false }
    ]
  }
]
