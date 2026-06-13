export interface Repository {
    name: string;
    owner: string;
    avatarUrl: string;
    description: string;
    language: string;
}

// Creación del arreglo con 5 instancias (propietario: VargasAlejandro27)
export const repositoryList: Repository[] = [
    {
        name: "react-dashboard",
        owner: "VargasAlejandro27",
        avatarUrl: "https://github.com/VargasAlejandro27.png",
        description: "Un panel de control de administración moderno construido con React y Tailwind.",
        language: "TypeScript"
    },
    {
        name: "fastapi-backend",
        owner: "VargasAlejandro27",
        avatarUrl: "https://github.com/VargasAlejandro27.png",
        description: "API REST de alto rendimiento para el manejo de usuarios y autenticación.",
        language: "Python"
    },
    {
        name: "awesome-utils",
        owner: "VargasAlejandro27",
        avatarUrl: "https://github.com/VargasAlejandro27.png",
        description: "Colección de funciones utilitarias para el día a día en JavaScript vanilla.",
        language: "JavaScript"
    },
    {
        name: "flutter-ecommerce",
        owner: "VargasAlejandro27",
        avatarUrl: "https://github.com/VargasAlejandro27.png",
        description: "Aplicación móvil de comercio electrónico con soporte para iOS y Android.",
        language: "Dart"
    },
    {
        name: "rust-game-engine",
        owner: "VargasAlejandro27",
        avatarUrl: "https://github.com/VargasAlejandro27.png",
        description: "Un motor de videojuegos 2D enfocado en el rendimiento y la seguridad de memoria.",
        language: "Rust"
    }
];