using System.Collections.Generic;

namespace collabears.Models
{
    public class UserResponse
    {
        public bool Status { get; set; }
        public List<User> Data { get; set; }
    }
}
