using SaveRoom.Models;
using Microsoft.EntityFrameworkCore;
using SaveRoom.Models.Dtos;
//JOAO VICTOR
namespace SaveRoom.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Perfil> Perfis { get; set; }
        public DbSet<Jogo> Jogos { get; set; }
        public DbSet<Plataforma> Plataformas { get; set; }
        public DbSet<JogoPlataforma> JogoPlataformas { get; set; }
        public DbSet<Genero> Generos { get; set; }  
        public DbSet<JogoGenero> JogosGeneros { get; set; }
        public DbSet<Backlog> Backlogs { get; set; }
        public DbSet<Analise> Analises { get; set; }
        public DbSet<Avatar> Avatar { get; set; }
        public DbSet<Banner> Banner { get; set; }
        public DbSet<TituloPerfil> TituloPerfil { get; set; }
        public DbSet<Insignia> Insignias { get; set; }
        public DbSet<InsigniaUsuario> InsigniasUsuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JogoPlataforma>()
                .HasKey(jp => new { jp.IdJogo, jp.IdPlataforma });

            modelBuilder.Entity<JogoGenero>()
                .HasKey(jg => new { jg.IdJogo, jg.IdGenero });

            // Configuração da chave composta para InsigniaUsuario
            modelBuilder.Entity<InsigniaUsuario>()
                .HasKey(iu => new { iu.IdInsignia, iu.IdPerfil });

            modelBuilder.Entity<InsigniaUsuario>()
                .HasOne(iu => iu.Insignia)
                .WithMany(i => i.InsigniasUsuarios)
                .HasForeignKey(iu => iu.IdInsignia);

            modelBuilder.Entity<InsigniaUsuario>()
                .HasOne(iu => iu.Perfil)
                .WithMany()
                .HasForeignKey(iu => iu.IdPerfil);

            // Configuração da Insignia em Destaque no Perfil
            modelBuilder.Entity<Perfil>()
                .HasOne(p => p.InsigniaDestaque)
                .WithMany()
                .HasForeignKey(p => p.IdInsigniaDestaque)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<InsigniaUsuario>()
                .ToView("insignia_usuario")
                .HasKey(iu => new { iu.IdInsignia, iu.IdPerfil });

            modelBuilder.Entity<InsigniaUsuario>()
                .HasOne(iu => iu.Insignia)
                .WithMany(i => i.InsigniasUsuarios)
                .HasForeignKey(iu => iu.IdInsignia);

            modelBuilder.Entity<InsigniaUsuario>()
                .HasOne(iu => iu.Perfil)
                .WithMany()
                .HasForeignKey(iu => iu.IdPerfil);
        }
    }
}