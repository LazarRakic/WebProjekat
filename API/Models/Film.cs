using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    [Table("Film")]
    public class Film
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        
        
        

        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }

        [Column("NaStanju")]
        public int KolicinaNaStanju { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }  

       //[ForeignKey]
        [Column("ProducentID")]
        public int ProducentID { get; set; }

        [JsonIgnore]
        public Klub Klub { get; set; }
    }
}