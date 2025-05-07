using System.Collections.Generic;

namespace collabears.Models
{
    public class ProjectResponse
    {
        public bool Status { get; set; }
        public List<Project> Data { get; set; }
    }
}
