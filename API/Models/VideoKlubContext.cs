using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class VideoClubContext : DbContext
    {
        public DbSet<Klub> Klubovi {get; set; }
        public DbSet<Film> Filmovi {get; set;}
        public DbSet<Producent> Producenti {get; set;}

        public VideoClubContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
