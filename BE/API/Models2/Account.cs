using System;
using System.Collections.Generic;

namespace API.Models2;

public partial class Account
{
    public Guid Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Email { get; set; }

    public virtual ICollection<Site> Sites { get; set; } = new List<Site>();
}
