using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Casino.Models
{
    public class BasicUserDTO
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public int Tokens { get; set; }
        public int GamesWon { get; set; }
        public string NavBarColor { get; set; }
        public string BackgroundColor { get; set; }

        public double GamesPlayed { get; set; }
    }
}
