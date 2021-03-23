using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VideoClubController : ControllerBase
    {
        public VideoClubContext Context { get; set; }
        public VideoClubController(VideoClubContext context)
        {
            Context = context;
        }

        //Read
        [Route("PreuzimanjeKlubova")]
        [HttpGet]
        public async Task<List<Klub>> PreuzmanjeKlubova()
        {
            return await Context.Klubovi.Include(p => p.Filmovi).ToListAsync();
        }

        //Create
        [Route("DodavanjeFilma/{idKluba}")]
        [HttpPost]
        public async Task<IActionResult> UpisiFilm(int idKluba, [FromBody] Film film)
        {
            var videoklub = await Context.Klubovi.FindAsync(idKluba);
            var producent = await Context.Producenti.FindAsync(film.ProducentID);

            film.Klub = videoklub;

            if (Context.Filmovi.Any(temp => temp.Naziv == film.Naziv && temp.Tip == film.Tip && (temp.X != film.X || temp.Y != film.Y)))
            {
                var xy = Context.Filmovi.Where(p => p.Tip == film.Tip).FirstOrDefault();
                return BadRequest(new { X = xy?.X, Y = xy?.Y });
            }

            var temp = Context.Filmovi.Where(p => p.X == film.X && p.Y == film.Y).FirstOrDefault();

            if (temp != null)
            {
                if (temp.KolicinaNaStanju != film.KolicinaNaStanju)
                    return StatusCode(409);
                else
                    return StatusCode(406);
            }
            else
            {
                producent.BrojFilmovaNaStanju++;
                Context.Filmovi.Add(film);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        //Update
        [Route("UpdateKolicine")]
        [HttpPut]
        public async Task AzuriranjeKolicine([FromBody] Film film)
        {
            var temp =  Context.Filmovi.Where(p => p.X == film.X && p.Y == film.Y).FirstOrDefault();
            temp.KolicinaNaStanju = film.KolicinaNaStanju;

            Context.Update<Film>(temp);
            await Context.SaveChangesAsync();
            
        }

        //Delete
        [Route("BrisanjeFilma")]
        [HttpDelete]
        public async Task<IActionResult> BrisanjeFilma([FromBody] Film film)
        {
            var temp =  Context.Filmovi.Where(p => p.X == film.X && p.Y == film.Y).FirstOrDefault();
            var producent = await Context.Producenti.FindAsync(film.ProducentID);

            if (temp != null )
            {
                producent.BrojFilmovaNaStanju--;
                Context.Remove<Film>(temp);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
                return StatusCode(406);
        }

        //Read producent
        [Route("PreuzimanjeProducenta")]
        [HttpGet]
        public async Task<List<Producent>> PreuzimanjeProducenta()
        {
            return await Context.Producenti.ToListAsync();
        }
    }
}