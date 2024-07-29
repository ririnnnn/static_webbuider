using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models2;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using System.Text;
using NuGet.Packaging.Signing;
using NuGet.Protocol;

namespace API.Controllers
{
    public class AddPageData
    {
        public required string Id { get; set; }
        public required string ParentPath { get; set; }
        public required string Path { get; set; }
        public required string Name { get; set; }

    }
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SitesController : ControllerBase
    {
        private readonly WebbuilderContext _context;

        public SitesController(WebbuilderContext context)
        {
            _context = context;
        }

        // GET: api/Sites
        [HttpGet("pagination")]
        public async Task<ActionResult<PaginatedResponse<Site>>> GetSites([FromQuery] int page, [FromQuery] int pageSize)
        {
            if (page < 0 || pageSize > 1000 || pageSize < 0) return BadRequest();
            var user_id = User.FindFirst("ID")?.Value;
            if (user_id != null)
            {
                Guid userIdString = Guid.Parse(user_id);

                return new PaginatedResponse<Site> { Data = await _context.Sites.Select(s => new Site() { Id = s.Id, Name = s.Name, UserId = s.UserId, SiteData = s.SiteData, Status = s.Status }).Where(s => s.UserId == userIdString).Skip(page * pageSize).Take(pageSize).ToListAsync(), PageSize = pageSize, Current = page, Total = _context.Sites.Count() };
            }
            return Unauthorized();

        }

        // GET: api/Sites/5
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Site>> GetSite(string id)
        {
            var user_id = User.FindFirst("ID")?.Value;
            if (user_id != null)
            {
                Guid userIdString = Guid.Parse(user_id);
                var Site = await _context.Sites.Where(s => s.UserId == userIdString && s.Id == Guid.Parse(id)).FirstOrDefaultAsync();

                if (Site == null)
                {
                    return NotFound();
                }

                return Site;
            }
            return Unauthorized();
        }

        // PUT: api/Sites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSite(Guid id, Site Site)
        {
            var user_id = User.FindFirst("ID")?.Value;
            if (user_id != null)
            {
                Guid userIdString = Guid.Parse(user_id);

                var siteData = _context.Sites.Where(s => s.Id == id && s.UserId == userIdString).FirstOrDefault();

                if (id != Site.Id)
                {
                    return BadRequest();
                }

                _context.Entry(Site).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SiteExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            return Unauthorized();
        }

        // POST: api/Sites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Site>> PostSite([FromBody] string Name)
        {
            Site newSite = new Site()
            {
                Name = Name,
            };
            try
            {
                var user_id = User.FindFirst("ID")?.Value;
                if (user_id == null) return Unauthorized();
                newSite.Id = Guid.NewGuid();
                newSite.UserId = Guid.Parse(user_id);
                Page indexPage = new Page()
                {
                    Id = Guid.NewGuid(),
                    Name = "index",
                    Status = 1,
                    Description = "index",
                    SiteId = newSite.Id
                };
                var siteData = new { path = new { index = new { page = indexPage.Id, children = Array.Empty<object>() } } };
                newSite.SiteData = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(siteData));
                _context.Sites.Add(newSite);
                _context.Pages.Add(indexPage);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SiteExists(newSite.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetSite", new { id = newSite.Id }, Name);
        }

        // DELETE: api/Sites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSite(Guid id)
        {
            var user_id = User.FindFirst("ID")?.Value;
            if (user_id != null)
            {
                Guid userIdString = Guid.Parse(user_id);
                var Site = await _context.Sites.Where(s => s.Id == id && s.UserId == userIdString).FirstOrDefaultAsync();
                if (Site == null)
                {
                    return NotFound();
                }
                var Pages = await _context.Pages.Where(p => p.SiteId == Site.Id).ToListAsync();
                _context.Pages.RemoveRange(Pages);
                _context.Sites.Remove(Site);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            return Unauthorized();
        }
        [HttpPost("addPage")]
        public async Task<IActionResult> addPage([FromBody] AddPageData data)
        {
            Guid id = Guid.Parse(data.Id);
            var user_id = User.FindFirst("ID")?.Value;
            if (user_id != null)
            {
                Guid userIdString = Guid.Parse(user_id);
                var site = await _context.Sites.Where(s => s.Id == id && s.UserId == userIdString).FirstOrDefaultAsync();
                if (site == null) return BadRequest();
                Page newPage = new Page() { Id = Guid.NewGuid(), Name = data.Name, Status = 1, SiteId = site.Id };
                var siteData = JsonSerializer.Deserialize<Dictionary<string, object>>(site.SiteData);
                string tempPathString = data.ParentPath;

                if (siteData == null) return BadRequest();
                if (siteData.TryGetValue("path", out var pathValue))
                {
                    siteData["path"] = addPageInPath(pathValue, tempPathString, data.Path, newPage);
                    site.SiteData = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(siteData));
                    _context.Pages.Add(newPage);
                    await _context.SaveChangesAsync();
                    return Ok(siteData["path"]);
                }
            }
            return Unauthorized();
        }
        private bool SiteExists(Guid id)
        {
            return _context.Sites.Any(e => e.Id == id);
        }
        private object addPageInPath(object dataIn, string Parentpath, string path, Page page)
        {
            try
            {
                var Obj = JsonSerializer.Deserialize<Dictionary<string, object>>(dataIn.ToString());
                if (Obj != null)
                {
                    var pageObj = JsonSerializer.Deserialize<Dictionary<string, object>>(Obj[Parentpath[..Parentpath.IndexOf('/')]].ToString());
                    if (Parentpath[(Parentpath.IndexOf('/') + 1)..] == "")
                    {
                        var childrenArray = pageObj;
                        try
                        {
                            var temp = JsonSerializer.Deserialize<Dictionary<string, object>>(pageObj["children"].ToString());
                            childrenArray = temp;
                        }
                        catch
                        {
                            childrenArray = new Dictionary<string, object>();
                        }
                        childrenArray.Add(path, new { page = page.Id, children = new { } });
                        pageObj["children"] = childrenArray;
                        Obj[Parentpath[..Parentpath.IndexOf('/')]] = pageObj;
                    }
                    else
                    {
                        string tempPath = Parentpath[(Parentpath.IndexOf('/') + 1)..];
                        var childrenArray = pageObj;
                        try
                        {
                            var temp = JsonSerializer.Deserialize<Dictionary<string, object>>(pageObj["children"].ToString());
                            childrenArray = temp;
                        }
                        catch
                        {
                            childrenArray = new Dictionary<string, object>();
                        }
                        pageObj["children"] = addPageInPath(pageObj["children"], Parentpath[(Parentpath.IndexOf('/') + 1)..], path, page);
                        Obj[Parentpath[..Parentpath.IndexOf('/')]] = pageObj;
                    }
                }
                return Obj;
            }
            catch
            {
                throw;
            }
        }
    }
}
