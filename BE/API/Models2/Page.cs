using System;
using System.Collections.Generic;

namespace API.Models2;

public partial class Page
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public byte[]? PageData { get; set; }

    public int? Status { get; set; }

    public Guid? SiteId { get; set; }

    public virtual Site? Site { get; set; }
}
