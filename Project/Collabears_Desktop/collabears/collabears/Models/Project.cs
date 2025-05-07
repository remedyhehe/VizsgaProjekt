namespace collabears.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Client { get; set; }
        public string Deadline { get; set; } // vagy DateTime, ha az API úgy adja vissza
    }
}
