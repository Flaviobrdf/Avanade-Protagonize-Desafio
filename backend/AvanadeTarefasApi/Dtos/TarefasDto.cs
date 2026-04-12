namespace AvanadeTarefasApi.Dtos
{
    public class TarefasDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public bool Status { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}