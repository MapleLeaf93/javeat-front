import { useEffect, useState } from "react";
import '../homepage/Homepage.scss';

export default function Homepage() {
  const cardFront = "Welcome to GFG.";
  const cardBack = "Computer Science Portal.";
  // Utilizza un oggetto per tenere traccia dello stato di ciascuna card
  const [flippedStates, setFlippedStates] = useState({});
  const cardData = [
    {
      id: 'card1',
      title: 'Burgers',
      frontImage: '/burger.png',
      backImage: '',
      frontContent: 'Ami i Burgers?',
      backContent: 'Scopri i migliori burger joints in città!',
    },
    {
      id: 'card2',
      title: 'Sushi',
      frontImage: '/sushi.png',
      backImage: '',
      frontContent: 'Fascino del Sushi',
      backContent: 'Esplora i migliori sushi bar!',
    },
    {
      id: 'card3',
      title: 'Pizza',
      frontImage: '/pizza.png',
      backImage: '',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    },
    {
      id: 'card4',
      title: 'Pizza',
      frontImage: '/pizza.png',
      backImage: '',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    },
    {
      id: 'card5',
      title: 'Pizza',
      frontImage: '/pizza.png',
      backImage: '',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    },
    {
      id: 'card6',
      title: 'Pizza',
      frontImage: '/pizza.png',
      backImage: '',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    },
  ];

  // Gestisci lo stato di flip per ogni card separatamente
  const [isFlipped, setIsFlipped] = useState({
    card1: false,
    card2: false,
    card3: false,
  });

  // Funzione per gestire il flip di ogni card
  const handleFlip = (card) => {
    setIsFlipped({
      ...isFlipped,
      [card]: !isFlipped[card],
    });
  };

  useEffect(() => {
    // Nasconde il testo dopo 8 secondi
    const timeout = setTimeout(() => {
      const textElement = document.querySelector('.text');
      if (textElement) {
        textElement.style.display = 'none';
      }
    }, 8000);

    // Pulisce il timeout quando il componente viene smontato
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div>
        <div className="">
          <div class="ag-maecenas_title">
            <div class="ag-format-container">
                javeat
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div className="App mt-4">
        <h1>Trova la tua passione!</h1>
        <h3>Scegli tra tante specialità</h3>
        <div className="container">
          {cardData.map((card) => (
            <div key={card.id} className={`flip-card ${isFlipped[card.id] ? 'flipped' : ''}`} onClick={() => handleFlip(card.id)}>
              <div className="flip-card-inner">
                <div className={`flip-card-front ${flippedStates[card.id] ? 'flipped' : ''}`}>
                  <div className="overlay"></div>
                  <div className="card-content" style={{ backgroundImage: `url(${card.frontImage})`, backgroundSize: "cover" }}>
                    <h3><b>{card.title}</b></h3>
                    <p><b>{card.frontContent}</b></p>
                  </div>
                </div>
                <div className={`flip-card-back ${flippedStates[card.id] ? 'flipped' : ''}`}>
                  <div className="overlay"></div>
                  <div className="card-content" style={{ backgroundImage: `url(${card.frontImage})`, backgroundSize: "cover" }}>
                    <p>{card.backContent}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

}