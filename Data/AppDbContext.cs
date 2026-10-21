using SaveRoom.Models;
using Microsoft.EntityFrameworkCore;

namespace SaveRoom.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Perfil> Perfis {  get; set; }
        public DbSet<Jogo> Jogos { get; set; }
        public DbSet<Plataforma> Plataformas { get; set; }
        public DbSet<JogoPlataforma> JogoPlataformas { get; set; }
        public DbSet<Genero> Generos { get; set; }  
        public DbSet<JogoGenero> JogosGeneros { get; set; }
        public DbSet<Backlog> Backlogs { get; set; }
        public DbSet<Analise> Analises { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JogoPlataforma>()
                .HasKey(jp => new { jp.IdJogo, jp.IdPlataforma });

            modelBuilder.Entity<JogoGenero>()
                .HasKey(jg => new { jg.IdJogo, jg.IdGenero });
        }
    }
}
