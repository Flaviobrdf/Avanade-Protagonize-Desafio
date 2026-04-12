using Microsoft.EntityFrameworkCore;
using AvanadeTarefasApi.Entities;

namespace AvanadeTarefasApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TarefasItem> Tarefas { get; set; }
    }
}
