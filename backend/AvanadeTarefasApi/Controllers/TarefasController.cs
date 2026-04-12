using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AvanadeTarefasApi.Data;
using AvanadeTarefasApi.Entities;
using AvanadeTarefasApi.Dtos;

namespace AvanadeTarefasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefasController(AppDbContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TarefasDto>>> GetTarefas()
        {
            return await _context.Tarefas
                .Select(t => new TarefasDto {
                    Id = t.Id,
                    Titulo = t.Titulo,
                    Descricao = t.Descricao,
                    Status = t.Status,
                    DataCriacao = t.DataCriacao
                })
                .ToListAsync();
        }

        // GET
        [HttpGet("{id}")]
        public async Task<ActionResult<TarefasDto>> GetTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            if (tarefa == null) return NotFound();

            return new TarefasDto {
                Id = tarefa.Id,
                Titulo = tarefa.Titulo,
                Descricao = tarefa.Descricao,
                Status = tarefa.Status,
                DataCriacao = tarefa.DataCriacao
            };
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<TarefasDto>> CriarTarefa(TarefasDto dto)
        {
            var tarefa = new TarefasItem
            {
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Status = dto.Status,
                DataCriacao = DateTime.Now
            };

            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();

            dto.Id = tarefa.Id;
            dto.DataCriacao = tarefa.DataCriacao;

            return CreatedAtAction(nameof(GetTarefa), new { id = tarefa.Id }, dto);
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarTarefa(int id, TarefasDto dto)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            if (tarefa == null) return NotFound();

            tarefa.Titulo = dto.Titulo;
            tarefa.Descricao = dto.Descricao;
            tarefa.Status = dto.Status;

            _context.Entry(tarefa).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            if (tarefa == null) return NotFound();

            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
