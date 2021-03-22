import { Klub } from "./Klub.js"
import { Producent } from "./Producent.js"

fetch("https://localhost:5001/VideoClub/PreuzimanjeKlubova").then(p => {
    p.json().then(data => {
        data.forEach(klub => {
            let klub1 = new Klub(klub.id, klub.naziv, klub.n, klub.m);
            klub1.drawingClub(document.body);

            klub.filmovi.forEach(film => {
                console.log(film);
                fetch("https://localhost:5001/VideoClub/PreuzimanjeProducenta").then(p => {
                    p.json().then(data => {
                        
                        data.forEach(producent => {
                            if (producent.id == film.producentID)
                            {
                                const pom = new Producent(producent.id, producent.naziv, producent.brojFilmova, producent.godinaRodjenja); 
                                
                                klub1.filmovi[film.x * klub1.m + film.y].updateFilma(film.naziv, film.kolicinaNaStanju, film.tip, film.x, film.y, pom);
                            }
                        });
                    }); 
                });
            });
        });
    });
});