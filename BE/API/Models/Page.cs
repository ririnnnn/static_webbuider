using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Page
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual Account User { get; set; } = null!;
}
