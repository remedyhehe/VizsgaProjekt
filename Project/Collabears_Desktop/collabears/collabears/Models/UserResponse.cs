﻿using System.Collections.Generic;

namespace collabears.Models
{
    public class UserResponse
    {
        public bool Status { get; set; }
        public List<collabears.Models.User> Data { get; set; }
    }
}
