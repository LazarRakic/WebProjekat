using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Klub")]
    public class Klub
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        
        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        [Column("N")]
        public int N { get; set; }
        
        [Column("M")]
        public int M { get; set; }
        
        public virtual List<Film> Filmovi { get; set; }

        //public virtual List<Studio> Studios { get; set; }
    }
}