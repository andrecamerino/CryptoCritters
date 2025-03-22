import Link from 'next/link';
import Image from 'next/image';
import './play.css';

const games = [
  { title: 'Critter Run', slug: 'tic-tac-toe', img: '/lock.jpg' },
  { title: 'Critter Scavenge', slug: 'memory-match', img: '/scavenge.png' },
  { title: 'Crossy Critters', slug: 'snake', img: '/lock.jpg' },
];

const Play = () => {
  return (
    <div className="play-container-page">
      {/* Exit Button */}
      <button className="exit-button-page">X</button>
      
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
    </div>
  );
};

export default Play;
