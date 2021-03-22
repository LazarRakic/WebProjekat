using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Producent")]
    public class Producent
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        
        
        [Column("GodinaRodjenja")]
        [MaxLength(4)]
        public int GodinaRodjenja { get; set; }

        [Column("BrojFilmova")]
        public int BrojFilmova { get; set; }

        [Column("BrojFilmovaNaStanju")]
        public int BrojFilmovaNaStanju { get; set; }

        //public Katalog Katalog { get; set; }
    }
}