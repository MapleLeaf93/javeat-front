import { useEffect, useState } from "react";
import '../homepage/Homepage.scss';
import { Link } from "react-router-dom";

export default function Homepage() {
  const cardFront = "Welcome to GFG.";
  const cardBack = "Computer Science Portal.";
  // Utilizza un oggetto per tenere traccia dello stato di ciascuna card
  const [flippedStates, setFlippedStates] = useState({});
  const cardData = [
    {
      id: 'card1',
      title: 'Burgers',
      frontImage: 'https://cdn.discordapp.com/attachments/1211974633369116723/1213083947194523648/pxfuel5.jpg?ex=65f42f77&is=65e1ba77&hm=44cb12411414efe5b5ade4a795d150fa486c30def7431b40bfb3b898aa4e83fb&',
      backImage: '/images/burger.png',
      frontContent: 'Ami i Burgers?',
      backContent: 'Scopri i migliori burger joints in città!',
    },
    {
      id: 'card2',
      title: 'Sushi',
      frontImage: 'https://cdn.discordapp.com/attachments/1211974633369116723/1213085737365413980/pxfuel9.jpg?ex=65f43121&is=65e1bc21&hm=fe6bdebda0a707a7643d04ecb5fd6da69cb79a03077bd22a5986145cb1500a45&',
      backImage: '/images/sushi.png',
      frontContent: 'Fascino del Sushi',
      backContent: 'Esplora i migliori sushi bar!',
    },
    {
      id: 'card3',
      title: 'Pizza',
      frontImage: 'https://cdn.discordapp.com/attachments/1211974633369116723/1213082438016696400/pxfuel4.jpg?ex=65f42e0f&is=65e1b90f&hm=ac7a377b43deb74b4f51f0b0590d948670e9f9091bb6fe5809a7f16ee50fc3d5&',
      backImage: '/images/pizza.png',
      frontContent: 'Passione Pizza',
      backContent: 'Le pizzerie imperdibili!',
    },
    {
      id: 'card4',
      title: 'Kebab',
      frontImage: 'https://cdn.discordapp.com/attachments/1211974633369116723/1213093071487508641/pxfuel15.jpg?ex=65f437f6&is=65e1c2f6&hm=748992fcef824165239687a1126c361ae8c96c2017b98b01b48fdc621468366e&',
      backImage: '',
      frontContent: 'Kebab passion!',
      backContent: 'Viaggia in Egitto comodamente da casa',
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
        <div class="ag-maecenas_title">
          <div class="ag-format-container relative-container">
            <p class="text-on-top">javeat</p>
            <img src="https://picerijagirosjaimajka.com/wp-content/uploads/2019/10/slider_image2.png" class="background-image"></img>
          </div>
        </div>
      </div>
      <div className="App mt-4">
        <h1 className="ag-maecenas_title-item">Find your Passion!</h1>
        <h3 className="ag-maecenas_tagline-item">Choose between many speciality</h3>
        <div className="container">
          {cardData.map((card) => (
            <div key={card.id} className={`mb-3 flip-card ${isFlipped[card.id] ? 'flipped' : ''}`} onClick={() => handleFlip(card.id)}>
              <div className="flip-card-inner">
                <div className={`flip-card-front ${flippedStates[card.id] ? 'flipped' : ''}`}>
                  <div className="card-content" style={{ backgroundImage: `url(${card.frontImage})`, backgroundSize: "cover" }}>
                  </div>
                </div>
                <div className={`flip-card-back ${flippedStates[card.id] ? 'flipped' : ''}`}>
                  <div className="card-content" style={{ backgroundImage: `url(${card.backImage})`, backgroundSize: "cover", background: "linear-gradient(to top, #92ce5a, #FFE17B, #C51605" }}>
                    <p className="mt-4"><b>{card.frontContent}</b></p>
                    <p>{card.backContent}</p>
                  </div>
                </div>
              </div>
              <h3><b>{card.title}</b></h3>
            </div>
          ))}
        </div>
      </div>
      <div class="ag-format-container mt-5">
        <section class="ag-maecenas_box">
          <article class="ag-maecenas_item">
            <div class="ag-maecenas_descr">
              <div class="ag-maecenas_title-item">
                Why Join Us?
              </div>
              <div class="ag-maecenas_tagline-item">
                Register now and enjoy these exclusive benefits!
              </div>
              <ul class="ag-requirement_list">
                <li class="ag-requirement_item">
                  Explore a diverse range of restaurants and cuisines;
                </li>
                <li class="ag-requirement_item">
                  Access exclusive discounts and promotions;
                </li>
                <li class="ag-requirement_item">
                  Personalized recommendations based on your preferences;
                </li>
                <li class="ag-requirement_item">
                  Quick and easy online ordering;
                </li>
                <li class="ag-requirement_item">
                  Track your delivery in real-time;
                </li>
                <li class="ag-requirement_item">
                  Save your favorite dishes for easy reordering;
                </li>
                <li class="ag-requirement_item">
                  Join a vibrant community of food enthusiasts;
                </li>
                <li class="ag-requirement_item">
                  Receive updates on new restaurants and menu additions;
                </li>
                <li class="ag-requirement_item">
                  Convenient payment options for a seamless experience.
                </li>
              </ul>
              <div className="text-center">
                <Link className="btn btn-outline-rasta-yellow" to={"/register"}>Register Now!</Link>
                <p className="small-descr mt-1">Already Registered? <Link className="link" to={"/login"}> Login Here</Link></p>
              </div>

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