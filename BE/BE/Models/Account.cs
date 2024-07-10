using System;
using System.Collections.Generic;

namespace BE.Models;

public partial class Account
{
    public Guid Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Page> Pages { get; set; } = new List<Page>();
}
