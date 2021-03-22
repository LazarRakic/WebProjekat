export class Film {
    constructor(naziv, tip, producent, i, j) {
        this.naziv = naziv;
        this.tip = tip;
        this.kolicinaNaStanju = 0;
        this.producent = producent;
        this.x = i;
        this.y = j;
        this.miniKontejner = null;
    }

    bojaPolja() {
        if (!this.tip)
            return "white";
        else
            return this.tip;
    }

    crtanjeFilma(host) {
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className = "film";
        this.miniKontejner.innerHTML = "Slobodno mesto u Klubu";
        this.miniKontejner.style.backgroundColor = this.bojaPolja();
        host.appendChild(this.miniKontejner);
    }

    updatePolja() {
        
        this.miniKontejner.innerHTML = this.naziv + ", by " + this.producent.ime
        + " Na stanju:  "+ this.kolicinaNaStanju;
        
    }

    updateFilma(naziv, kolicina, tip, x, y, producent) {
        this.naziv = naziv;
        this.tip = tip;
        this.kolicinaNaStanju = kolicina;
        this.x = x;
        this.y = y;
        
        this.producent = producent;
        

        if (naziv == "")
        {
            this.miniKontejner.innerHTML = "Slobodno mesto u klubu";
        }
        else
        {
            this.updatePolja();
        }

        this.miniKontejner.style.backgroundColor = this.bojaPolja();
    }

    updateKolicine(novaKolicina) {
        this.kolicinaNaStanju = novaKolicina;

        this.updatePolja();
    }
}