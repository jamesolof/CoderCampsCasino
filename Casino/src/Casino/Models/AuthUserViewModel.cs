using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Casino.Models
{
    public class AuthUserViewModel
    {
        public string UserName { get; set; }
        public bool IsAdmin { get; set; }
        public string Nickname { get; set; }


        public string Id { get; set; }
        public int Tokens { get; set; }
        public double GamesPlayed { get; set; }
        public string NavBarColor { get; set; }
        public string BackgroundColor { get; set; }

        public string Friends { get; set; }
        public int GamesWon { get; internal set; }
    }
}
