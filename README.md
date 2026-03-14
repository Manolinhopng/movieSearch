# 🎬 CineSearch

CineSearch es una aplicación web moderna orientada a la búsqueda y descubrimiento de películas, utilizando la API pública de **The Movie Database (TMDb)**. 
Permite a los usuarios buscar películas en tiempo real, aplicar filtros, ver detalles completos (incluyendo reparto y trailers) y guardar sus películas favoritas de manera persistente en su navegador.

## ✨ Características

- 🔍 **Búsqueda en vivo (Live Search):** Encuentra películas al instante a medida que escribes, optimizado con un *custom hook* (`useDebounce`) para evitar sobrecargar la API.
- 🎛️ **Filtros Avanzados y Ordenamiento:** Filtra películas por Año, los distintos Géneros oficiales de TMDb, y ordénalas por popularidad, fecha de estreno o mejor valoración.
- 📑 **Paginación Dinámica:** Navega fácilmente a través de miles de resultados devueltos por la API.
- ❤️ **Colección de Favoritos:** Agrega o elimina películas a tus "Favoritos". El estado perdura incluso si recargas o cierras la página gracias al uso de *LocalStorage*.
- ℹ️ **Vista de Detalles (Movie Detail):** Disfruta de una vista profunda con una imagen de fondo inmersiva, póster de alta calidad, listado del reparto principal (cast), sinopsis, información estadística (presupuesto, taquilla) y enlaces para ver el tráiler oficial en YouTube.
- 🎨 **Interfaz Moderna & Glassmorphism:** Diseñada prestando atención al detalle visual, animaciones enriquecidas de carga y transiciones de estados mediante `framer-motion`, y un tema oscuro (Dark Mode) sumamente cuidado con `Tailwind CSS`.
- 📱 **Totalmente Responsivo:** Adaptado para visualizarse perfectamente desde un teléfono celular hasta un monitor de gran escala.

## 🛠️ Tecnologías y Stack

- **[React](https://react.dev/):** Para la arquitectura de componentes y reactividad.
- **[Vite](https://vitejs.dev/):** Entorno de construcción y servidor de desarrollo ultra-rápido.
- **[React Router DOM](https://reactrouter.com/):** Enrutamiento avanzado de la aplicación entre Home, Favoritos y Detalles de Películas.
- **[Tailwind CSS (v4)](https://tailwindcss.com/):** Como framework de estilos orientado a clases utilitarias para construir la llamativa UI.
- **[Axios](https://axios-http.com/):** Cliente HTTP ligero y versátil para el consumo de la API de TMDb.
- **[Framer Motion](https://www.framer.com/motion/):** Para manejar las elegantes animaciones al entrar y salir.
- **[Lucide React](https://lucide.dev/):** Íconos vectoriales modernos y de gran apariencia.

## 🚀 Guía de Instalación y Uso Local

Sigue estos pasos para desplegar el proyecto en tu máquina local:

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/movieSearch.git
cd movieSearch
```

### 2. Instala las dependencias
Debes asegurarte de tener [Node.js](https://nodejs.org/) instalado.
```bash
npm install
```

### 3. Configura las Variables de Entorno
Crea un archivo `.env` en el directorio raíz de la aplicación y duplica el formato del archivo pre-existente `.env.example`.
Consigue tu propia API Key de The Movie Database (TMDb) [registrándote aquí](https://www.themoviedb.org/documentation/api) y configúrala:

```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```
*(Nota: El proyecto incluye por defecto una clave pública de prueba para facilitarte una pre-visualización si no configuras el archivo `.env` al instante).*

### 4. Corre el Servidor de Desarrollo
```bash
npm run dev
```
La terminal te mostrará el enlace local de ejecución (comúnmente `http://localhost:5173/`).

## 📁 Estructura del Proyecto

```text
/src
 ├── /api            # Configuración de Axios e endpoints de TMDb
 ├── /components     # Componentes reutilizables (MovieCard, SearchBar...)
 ├── /hooks          # Hooks customizados para lógica encapsulada (useDebounce, useFavorites)
 ├── /pages          # Vistas enlazadas con las Rutas (Home, Favorites, MovieDetail)
 ├── App.jsx         # Componente Raíz y setup del Router
 └── main.jsx        # Entry point para React y ReactDOM
```

## 🙏 Créditos
Todos los datos cinematográficos, portadas de películas e información auxiliar son provistos gentilmente por la [API de TMDb](https://www.themoviedb.org/). Este producto utiliza la API de TMDb pero no está respaldado o certificado por TMDb.
