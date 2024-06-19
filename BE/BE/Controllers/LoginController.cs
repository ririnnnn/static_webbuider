using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly WebbuilderContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(WebbuilderContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        private string GenerateJSONWebToken(BE.Models.LoginRequest user)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.Username == user.Username && a.Password == user.Password);
            if (account != null) {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTKey:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(null,
                  null,
                  null,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            return null;
        }
        [HttpPost]
        public IActionResult Login(BE.Models.LoginRequest user)
        {
            string token = GenerateJSONWebToken(user);
            if (token != null)
            {
                return Ok(token);
            }
            else return BadRequest();
        }
    }
}
