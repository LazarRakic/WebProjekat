export class Producent {
    constructor (id, ime, brojfilmova, godinarodj) {
        this.id = id;
        this.ime = ime;
        this.brojFilmova = brojfilmova;
        this.godinaRodjenja=godinarodj; 
        this.brojFilmovaNaStanju = 0;
    }

    updateProducent(plusminus)
    {
        if(plusminus == 1)
            this.brojFilmovaNaStanju++;
        else
            this.brojFilmovaNaStanju--;
    }
}
