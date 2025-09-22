"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

interface MovieType {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [movie, setMovie] = useState<MovieType | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=2ea05c2f444f6fe57492711ba6641efa`
          );
          const data = await res.json();
          console.log(data);
          setMovie(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMovie();
    }
  }, [id]);

  if (!movie) return <div className="text-white text-3xl">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <div
        className="relative w-full h-[1000px] bg-cover bg-center mt-16 text-white text-xl"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-8 flex flex-col justify-end">
          <h1 className="text-7xl font-bold mb-4">{movie.title}</h1>
          <p className="text-3xl max-w-4xl">{movie.overview}</p>
          <div className="mt-4">
            <Link href={`/movie/${movie.id}`}>
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-red-600 min-w-50 text-white px-6 py-2 rounded-lg text-4xl font-semibold hover:bg-red-800"
              >
                Play
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showTrailer && (<div className="fixed inset-0 bg-black/50 backdrop-blue-sm flex justify-center items-center z-50">
      <div className="relative w-3/4 h-3/4 align-center">
      <iframe width={"100%"} height={"100%"} src={`https://www.youtube.com/embed/L3pk_TBkihU?si=3-nSZ9h2QX3KsNG5`} title={movie.title} allowFullScreen className="rounded-lg"></iframe>
      <button onClick={()=>setShowTrailer(false)} className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-full">X</button>
      </div>
        
        </div>)}
        <div className="p-8">
            <p className="w-2/3 text-justify opacity-65">Class is back in session at Godolkin University. Vought News will tell you it was the bravery of Cate Dunlap and Sam Riordan that saved the school just last year. However, if you watched "The Boys," you might have a different perspective. Something about an underground lab, a virus. There have even been sightings of traitorous enemies — Starlight and Billy Butcher. Season 2 of "Gen V" is sure to be a showcase of how these incredible students are molded into superior beings, maybe even a part of The Seven. — Virginia T.</p>
        </div>
      <Footer />
    </div>
  );
}

export default Page;
