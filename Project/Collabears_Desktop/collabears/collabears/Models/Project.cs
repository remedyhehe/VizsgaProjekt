namespace collabears.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }              // <- ez a projekt címe
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime? Start_Date { get; set; }
        public DateTime? End_Date { get; set; }
        public object Image_Url { get; set; }

        public long? Number_Of_Columns { get; set; }
        public int? Owner_Id { get; set; }
        public int? Status_Id { get; set; }
        public int? Visibility_Id { get; set; }
        public bool? Looking_For { get; set; }
        public int? Premium_Id { get; set; }
    }
}
