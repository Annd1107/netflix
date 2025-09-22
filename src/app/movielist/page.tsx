import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { getAllMovies } from "@/services/movieService";

interface MovieType {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

export default async function MovieList() {
  const movies = await getAllMovies();
  const IMAGE_BASE_URL = process.env.IMAGE_PATH;

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      <div className="pt-24 p-8">
        <h2 className="text-3xl font-bold mb-6">All Movies</h2>

        {movies?.results?.length > 0 ? (
          <div className="grid grid-cols-2 grid-cols-6 gap-6">
            {movies.results.map((movie: MovieType) => (
              <div
                key={movie.id}
                className="flex flex-col items-center text-center"
              >
                <Link href={`/movie/${movie.id}`}>
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <h3 className="mt-2 text-sm font-semibold">{movie.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No movies found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
