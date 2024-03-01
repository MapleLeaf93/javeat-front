import { useEffect } from "react";
import '../homepage/Homepage.css';
export default function Homepage()
{
    useEffect(() => {
        // Nasconde il testo dopo 3 secondi
        const timeout = setTimeout(() => {
          const textElement = document.querySelector('.text');
          if (textElement) {
            textElement.style.display = 'none';
          }
        }, 8000);
    
        // Pulisce il timeout quando il componente viene smontato
        return () => clearTimeout(timeout);
      }, []);
    
      return(
        <>
            <div className="container-homepage ">
            <h1 className=".text-homepage">Welcome in Javeat</h1>
            </div>
            
        </>
      );
}