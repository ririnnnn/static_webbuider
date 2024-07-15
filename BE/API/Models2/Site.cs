using System;
using System.Collections.Generic;

namespace API.Models2;

public partial class Site
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public int Status { get; set; }

    public Guid UserId { get; set; }

    public byte[] SiteData { get; set; } = null!;

    public virtual ICollection<Page> Pages { get; set; } = new List<Page>();

    public virtual Account User { get; set; } = null!;
}
