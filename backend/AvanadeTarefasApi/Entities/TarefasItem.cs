namespace AvanadeTarefasApi.Entities
{
    public class TarefasItem
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string Status { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}
