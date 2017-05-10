using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Casino.Models;

namespace Casino.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
     
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .Property(x => x.Tokens)
                .HasDefaultValue(1000);


            builder.Entity<ApplicationUser>()
           .Property(x => x.NavBarColor)
           .HasDefaultValue("");

            builder.Entity<ApplicationUser>()
            .Property(x => x.BackgroundColor)
            .HasDefaultValue("");


            builder.Entity<ApplicationUser>()
                .Property(x => x.Friends)
                .HasDefaultValue("");

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
