import Link from 'next/link';
import Image from 'next/image';
import './play.css';
import ExitButton from '~~/Components/ExitButton/ExitButton';

const games = [
  { title: 'Critter Run', slug: 'tic-tac-toe', img: '/lock.jpg', gamePage: '' },
  { title: 'Critter Scavenge', slug: 'memory-match', img: '/scavenge.png', gamePage: '/Scavenger/Scavenger'  },
  { title: 'Crossy Critters', slug: 'snake', img: '/lock.jpg', gamePage: '' },
];

const Play = () => {
  return (
    <div className="play-container-page">
      {/* Exit Button */}
      <ExitButton label='Exit' href='/' />
      
      <h1 className="page-header">Choose a Minigame</h1>
      <div className="games-grid-page">
        {games.map((game, index) => (
          <Link key={index} href={game.gamePage} passHref>
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
