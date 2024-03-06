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
      frontImage: '/images/burger.png',
      backImage: '',
      frontContent: 'Ami i Burgers?',
      backContent: 'Scopri i migliori burger joints in città!',
    },
    {
      id: 'card2',
      title: 'Sushi',
      frontImage: '/images/sushi.png',
      backImage: '',
      frontContent: 'Fascino del Sushi',
      backContent: 'Esplora i migliori sushi bar!',
    },
    {
      id: 'card3',
      title: 'Pizza',
      frontImage: '/images/pizza.png',
      backImage: '',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    },
    {
      id: 'card4',
      title: 'Pizza',
      frontImage: '/images/pizza.png',
      backImage: '',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    },
    {
      id: 'card5',
      title: 'Pizza',
      frontImage: '/images/pizza.png',
      backImage: '',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    }
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
        <div class="ag-maecenas_title">
          <div class="ag-format-container relative-container">
            <p class="text-on-top">javeat</p>
            <img src="https://picerijagirosjaimajka.com/wp-content/uploads/2019/10/slider_image2.png" class="background-image"></img>
          </div>
        </div>
      </div>
      <div className="App mt-4">
        <h1 className="ag-maecenas_title-item">Finf your passion!</h1>
        <h3 className="ag-maecenas_tagline-item">Choose among many specialties</h3>
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
      <div class="ag-format-container mt-5">
        <section class="ag-maecenas_box">
          <article class="ag-maecenas_item">
            <div class="ag-maecenas_descr">
              <div class="ag-maecenas_title-item">
                What are you waiting for?
              </div>
              <div class="ag-maecenas_tagline-item">
                Subscribe now and satisfy your appetite!
              </div>
              <ul class="ag-requirement_list">
                <li class="ag-requirement_item">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit;
                </li>
                <li class="ag-requirement_item">
                  Aenean commodo ligula eget dolor;
                </li>
                <li class="ag-requirement_item">
                  Aenean massa. Cum sociis natoque penatibus et magnis;
                </li>
                <li class="ag-requirement_item">
                  Adis parturient montes, nascetur ridiculus mus;
                </li>
                <li class="ag-requirement_item">
                  Donec quam felis, ultricies nec, pellentesque eu;
                </li>
                <li class="ag-requirement_item">
                  Nulla consequat massa quis enim;
                </li>
                <li class="ag-requirement_item">
                  Donec pede justo, fringilla vel, aliquet nec;
                </li>
                <li class="ag-requirement_item">
                  Wulputate eget, arcu. In enim justo, rhoncus ut, imperdiet;
                </li>
                <li class="ag-requirement_item">
                  Uvenenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                </li>
              </ul>
            </div>
            <div class="ag-maecenas_img-box me-5">
              <img src="https://cdn-icons-png.flaticon.com/512/6586/6586905.png" style={{ width: "100%" }} />
            </div>
          </article>
        </section>
      </div>
    </>
  );

}