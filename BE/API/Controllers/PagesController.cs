﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models2;
using Microsoft.AspNetCore.Authorization;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly WebbuilderContext _context;

        public PagesController(WebbuilderContext context)
        {
            _context = context;
        }

        // GET: api/Pages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Page>>> GetPages([FromQuery] string siteId)
        {
            var user_id = User.FindFirst("ID")?.Value;
            if (user_id != null)
            {
                Guid userIdGuid = Guid.Parse(user_id);
                Guid siteIdGuid = Guid.Parse(siteId);
                return await _context.Pages
                .Include("Site")
                .Select(p => new Page
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    SiteId = p.SiteId,
                    Status = p.Status,
                    Site = p.Site
                })
                .Where(p => p.Site != null && p.Site.UserId == userIdGuid && p.SiteId == siteIdGuid)
                .ToListAsync();
            }
            return Unauthorized();

        }

        // GET: api/Pages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Page>> GetPage(Guid id)
        {
            var page = await _context.Pages.FindAsync(id);

            if (page == null)
            {
                return NotFound();
            }

            return page;
        }

        // PUT: api/Pages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPage(Guid id, Page page)
        {
            if (id != page.Id)
            {
                return BadRequest();
            }

            _context.Entry(page).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PageExists(id))
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

        // POST: api/Pages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Page>> PostPage(Page page)
        {
            _context.Pages.Add(page);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PageExists(page.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPage", new { id = page.Id }, page);
        }

        // DELETE: api/Pages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePage(Guid id)
        {
            var page = await _context.Pages.FindAsync(id);
            if (page == null)
            {
                return NotFound();
            }

            _context.Pages.Remove(page);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut("SaveChange")]
        public async Task<ActionResult<Page>> PostPageChange([FromQuery] string id, [FromBody] string data)
        {
            var user_id = User.FindFirst("ID")?.Value;
            if (user_id != null)
            {
                Guid userIdGuid = Guid.Parse(user_id);
                Guid pageIdGuid = Guid.Parse(id);
                var UpdatedPage = _context.Pages.Where(p => p.Id == pageIdGuid).FirstOrDefault();
                if (UpdatedPage != null) { UpdatedPage.PageData = Encoding.UTF8.GetBytes(data); }
                else return NotFound();
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(id);
                }
                catch
                {
                    return StatusCode(500);
                }
            }
            return Unauthorized();
        }

        private bool PageExists(Guid id)
        {
            return _context.Pages.Any(e => e.Id == id);
        }
    }
}
