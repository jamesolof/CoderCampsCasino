using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Casino.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public int Tokens { get; set; }
        public string Nickname { get; set; }
        public double GamesPlayed { get; set; }
        public int GamesWon { get; set; }
        public string NavBarColor { get; set; }
        public string BackgroundColor { get; set; }
        public string Cardback { get; set; }

        public string Friends { get; set; }


    }
}
