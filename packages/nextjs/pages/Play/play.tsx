import Link from 'next/link';
import Image from 'next/image';
import './play.css';
import ExitButton from '~~/Components/ExitButton/ExitButton';
import { useEffect, useRef } from 'react';

const games = [
  { title: 'Critter Run', slug: 'tic-tac-toe', img: '/lock.jpg' },
  { title: 'Critter Scavenge', slug: 'memory-match', img: '/scavenge.png' },
  { title: 'Crossy Critters', slug: 'snake', img: '/lock.jpg' },
];

const Play = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference for the audio element

  // Play music automatically when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="play-container-page">
      {/* Exit Button */}
      <ExitButton label="Exit" href="/" />
      
      <h1 className="page-header">Choose a Minigame</h1>
      <div className="games-grid-page">
        {games.map((game, index) => (
          <Link key={index} href={`/games/${game.slug}`} passHref>
            <div className="game-card-page">
              <Image
                src={game.img}
                alt={game.title}
                width={200}
                height={200}
                className="game-img-page"
                priority={index === 0}
              />
              <h3 className="game-title-page">{game.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Audio for background music */}
      <audio ref={audioRef} loop>
        <source src="/play.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Play;
