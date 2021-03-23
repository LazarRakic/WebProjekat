import { Film } from "./Film.js"
import { Producent } from "./Producent.js"

export class Klub {
    constructor (id, nazivProd, n, m) {
        this.id = id;
        this.naziv = nazivProd;
        this.n = n;
        this.m = m;
        this.kontejner = null;
        this.filmovi = [];
        this.producenti = [];
    }

    dodavanjeFilma(film) {
        this.filmovi.push(film);
    }

    dodavanjeProducenta(producent) {
        this.producenti.push(producent);
    }

    drawingClub(host) {
        if (!host)
            throw new Error ("Ne postoji roditeljski element");
    
        const naslov = document.createElement("h2");
        naslov.innerHTML = this.naziv ;
        host.appendChild(naslov);

        this.kontejner = document.createElement("div");
        this.kontejner.className="kontejner";
        host.appendChild(this.kontejner); 
        this.crtanjeForme(this.kontejner);
        this.drawingFilm(this.kontejner);
        
    }

    crtanjeForme(host) {
        const forma = document.createElement("div");
        forma.className = "forma";
        host.appendChild(forma);

        var labela = document.createElement("h4");
        labela.innerHTML = "Dodavanje filma u video klub"; 
        forma.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Naziv filma: ";
        forma.appendChild(labela);

        let element = document.createElement("input");
        element.className = "naziv";
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Kolicina na stanju: ";
        forma.appendChild(labela);

        element = document.createElement("input");
        element.className = "kolicina";
        element.type = "number";
        forma.appendChild(element);

        let tipoviFilma = ["Action", "Thriller", "Crime", "Horror", "Sci-fi"];
        let bojeTipova = ["#96bb7c", "#9de5ff", "#f4ebc1", "#e27802", "#f05454"];

        let radioButton = null;
        let opcija = null;
        let rbDiv = null;

        tipoviFilma.forEach((tip, index) => {
            rbDiv = document.createElement("div");
            rbDiv.className = "radioButtons";
            radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = this.naziv;
            radioButton.value = bojeTipova[index];

            opcija = document.createElement("label");
            opcija.innerHTML = tip;

            rbDiv.appendChild(radioButton);
            rbDiv.appendChild(opcija);
            forma.appendChild(rbDiv);
        })

        let producentDiv = document.createElement("div");
        let producentSelect = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Producent: ";
        producentDiv.appendChild(labela);
        producentDiv.appendChild(producentSelect);

        let select = null;

        select = document.createElement("option");
        select.innerHTML = ""
        select.value = null;
        producentSelect.appendChild(select);

        fetch("https://localhost:5001/VideoClub/PreuzimanjeProducenta").then(p => {
                p.json().then(data => {
                    data.forEach(producent => {
                    
                        let prod = new Producent(producent.id, producent.naziv,  producent.brojFilmova, producent.godinaRodjenja); 
                        this.dodavanjeProducenta(prod);
                        
                        select = document.createElement("option");
                        select.innerHTML = prod.ime;
                        select.value = prod.ime; 
                        producentSelect.appendChild(select);
                    });
                }); 
            });

        forma.appendChild(producentDiv);

        const buttonProducent = document.createElement("button");
        buttonProducent.className = "button";
        buttonProducent.innerHTML = "Prikazi informacije o producentu";
        forma.appendChild(buttonProducent);

        //Read
        buttonProducent.onclick = (ev) => {
           
 
            fetch("https://localhost:5001/videoClub/PreuzimanjeProducenta").then(p => {
                p.json().then(data => {
                    data.forEach(producent => {
                        if (producent.naziv == producentSelect.value)
                        {
                            let temp = "Producent: " + `${producent.naziv}` + "\nGodina rodjenja: " + `${producent.godinaRodjenja}` + "\nBroj izdatih filmova: "+ `${producent.brojFilmova}` 
                                     + "\nTrenutni broj filmova u klubu: " + `${producent.brojFilmovaNaStanju}`;
                
                            alert(temp);
                        }
                    });
                }); 
            });

        }

        

        labela = document.createElement("label");
        labela.innerHTML = "Izaberite poziciju filma";
        forma.appendChild(labela);

        let pozicijaDiv = document.createElement("div");
        let vrsta = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Vrsta(X): ";
        pozicijaDiv.appendChild(labela);
        pozicijaDiv.appendChild(vrsta);

        let x = null;

        for (let i = 0; i < this.n; i++) {
            x = document.createElement("option");
            x.innerHTML = i;
            x.value = i;
            vrsta.appendChild(x);
        }

        forma.appendChild(pozicijaDiv);

        pozicijaDiv = document.createElement("div");
        let kolona = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Kolona(Y): ";
        pozicijaDiv.appendChild(labela);
        pozicijaDiv.appendChild(kolona);

        let y = null;

        for (let j = 0; j < this.m; j++) {
            y = document.createElement("option");
            y.innerHTML = j;
            y.value = j;
            kolona.appendChild(y);
        }

        forma.appendChild(pozicijaDiv);

        const button = document.createElement("button");
        button.className = "button";
        button.innerHTML = "Dodaj film u video klub";
        forma.appendChild(button);

        //Create
        button.onclick = (ev) => {
            const naziv = this.kontejner.querySelector(".naziv").value;
            
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);
            
            const tip = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`);
            const producentSelected = producentSelect.value;
            let producent = this.producenti.find(producent => producent.ime == producentSelected);

            //validacija
            if (naziv == "")
            {
                alert("Nije unet naziv!");
            }
            else if (isNaN(kolicina))
            {
                alert("Nije uneta kolicina!");
            }
            else if (tip == null)
            {
                alert("Nije izabran tip!");
            }
            else if (producentSelected == null)
            {
                alert("Nije izabran producent!");
            }
            
            else 
            {
                let i = parseInt(vrsta.value);
                let j = parseInt(kolona.value);

                fetch("https://localhost:5001/VideoClub/DodavanjeFilma/" + this.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "naziv": naziv,
                       
                        
                        "tip": tip.value,
                        "kolicinaNaStanju": kolicina,
                        "x": i,
                        "y": j,
                        "producentID": producent.id
                    })
                }).then(p => {
                    if (p.ok) {
                        this.filmovi[i * this.m + j].updateFilma(naziv, kolicina, tip.value, i, j, producent);
                        producent.updateProducent(1);
                    }
                    else if (p.status == 400) {
                        const zauzeto = {x: 0, y: 0 };
                        p.json().then(q => {
                            zauzeto.x == q.x;
                            zauzeto.y = q.y;
                            alert("Film je vec u video klubu na poziciji (" + (zauzeto.x + 1) + ", " + (zauzeto.y + 1) + ")");
                        });
                    }
                    else if (p.status == 409) {
                        alert("Ukoliko zelite da izmenite kolicinu na stanju, kliknite na \"Azuriraj kolicinu\" dugme!\nZa ostale izmene izbrisite film iz video kluba i dodajte iznova.");
                    }
                    else {
                        alert("Greska prilikom dodavanja filma.");
                    }
                });
                
            }
        }

        const button1 = document.createElement("button");
        button1.className = "button";
        button1.innerHTML = "Azuriraj kolicinu";
        forma.appendChild(button1);

        //Update
        button1.onclick = (ev) => {
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);

            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);

            fetch("https://localhost:5001/VideoClub/UpdateKolicine", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    "kolicinaNaStanju": kolicina,
                    "x": i,
                    "y": j
                })
            }).then(p => {
                if (p.ok)
                {
                    this.filmovi[i * this.m + j].updateKolicine(kolicina);
                }
                else
                {
                    alert("Doslo je do greske prilikom azuriranja kolicine\nMorate uneti neku vrednost u polju za kolicinu!");
                }
            });
        }

        const button2 = document.createElement("button");
        button2.className = "button";
        button2.innerHTML = "Izbrisi film iz kluba";
        forma.appendChild(button2);

        //Delete
        button2.onclick = (ev) => {
            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);

            let temp = this.filmovi.find(film => film.x == i && film.y == j);
            
            fetch("https://localhost:5001/VideoClub/BrisanjeFilma", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    "x": i,
                    "y": j,
                    "producentID": temp.producent.id
                })
            }).then(p => {
                if (p.ok)
                {
                    this.filmovi[i * this.m + j].producent.updateProducent(0);
                    this.filmovi[i * this.m + j].updateFilma("", 0, "", i, j, null);  
                }
                else if (p.status == 406)
                {
                    alert("Neispravna pozicija filma!")
                }
                else
                {
                    alert("Doslo je do greske prilikom brisanja");
                }
            });   
        }

    }

    drawingFilm(host) {
        const kontejnerFilma = document.createElement("div");
        kontejnerFilma.className = "kontejnerFilma";
        host.appendChild(kontejnerFilma);

        let vrsta;
        let film;

        for (let i = 0; i < this.n; i++) {
            vrsta = document.createElement("div");
            vrsta.className = "vrsta";
            kontejnerFilma.appendChild(vrsta);

            for (let j = 0; j< this.m; j++) {
                film = new Film("", "", "", "", i, j);
                this.dodavanjeFilma(film);
                film.crtanjeFilma(vrsta);
            }
        }
    }
}

