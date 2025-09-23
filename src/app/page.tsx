import Image from "next/image";
import Link from "next/link";
import Header from "./components/header";
import { getAllMovies } from "@/services/movieService";
import Footer from "./components/footer";
interface MovieType
{
  id:number;
  title:string;
  backdrop_path:string;
  poster_path:string;
  overview:string;
}

export default async function Home() {
  const movies = await getAllMovies();
  const featuredMovies = movies.results[0];
  const IMAGE_BASE_URL = process.env.IMAGE_PATH;

  console.log(movies);
  return (
    <div className="bg-black text-white min-h-screen">
      <Header/>

      <div className="h-7 "></div>
      {featuredMovies && (
        <div className="relative w-full h-[1000px] bg-cover bg-center mt-16"
                                style={{ backgroundImage: `url(${IMAGE_BASE_URL}${featuredMovies.backdrop_path})` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-8 flex flex-col justify-end">
                              <h1 className="text-5xl font-bold mb-4">{featuredMovies.title}</h1>
                              <p className="text-2xl max-w-4xl">{featuredMovies.overview}</p>
                              <div className="mt-4">
                                <Link href={`/movie/${featuredMovies.id}`}>
                                <button className="bg-red-600 min-w-50 text-white px-6 py-2 rounded-lg text-4xl hover:bg-red-800">Play</button>
                                </Link>
                              </div>
                            </div>
                          </div>)}

                          <div className="p-8">
                            <h2 className="text-3xl font-bold mb-6">Most Watched Movies</h2>
                            <div className="flex overflow-x-auto space-x-8 w-full">
                              {movies.results.map((movie:MovieType) => (
                                <div key={movie.id} className="min-w-[200px] flex-shrink-0 flex flex-col items-center ">
                                  <Link href={`/movie/${movie.id}`}>
                                  <img
                                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                    width={300}
                                    height={450}
                                    className="rounded-lg hover:scale-105 transition-transform duration-300"
                                  />
                                  </Link>
                                  <h3 className="mt-2 text-m font-semibold">{movie.title}</h3>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Footer/>
      </div>
  );
}
