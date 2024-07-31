using API.Models2;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace API.Controllers
{
    public class GoogleUserInfo
    {
        public string? id { get; set; }
        public required string email { get; set; }
        public string? name { get; set; }
        public string? picture { get; set; }
    }
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly WebbuilderContext _context;

        public LoginController(IConfiguration configuration, WebbuilderContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(LoginInfor acc)
        {
            var user = await _context.Accounts.FirstOrDefaultAsync(u => u.Username == acc.Username && u.Password == acc.Password);
            if (user != null)
            {
#pragma warning disable CS8604 // Possible null reference argument.
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
#pragma warning restore CS8604 // Possible null reference argument.
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
                    new Claim("ID", user.Id.ToString())
                };

                var token = new JwtSecurityToken(null,
                  null,
                  claims,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            else return BadRequest();
        }
        [AllowAnonymous]
        [HttpPost("Google")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] string accessToken)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
            var response = await client.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");
            var content = await response.Content.ReadAsStringAsync();
            var userInfor = JsonSerializer.Deserialize<GoogleUserInfo>(content);
            if (userInfor == null) return BadRequest("invalid token");
            var user = await _context.Accounts.FirstOrDefaultAsync(u => u.Email == userInfor.email);
            if (user == null)
            {
#pragma warning disable CS8604 // Possible null reference argument.
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
#pragma warning restore CS8604 // Possible null reference argument.
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
                    new Claim("email", userInfor.email)
                };

                var token = new JwtSecurityToken(null,
                  null,
                  claims,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);
                return NoContent();
            }
            else
            {
#pragma warning disable CS8604 // Possible null reference argument.
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
#pragma warning restore CS8604 // Possible null reference argument.
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
                    new Claim("ID", user.Id.ToString())
                };

                var token = new JwtSecurityToken(null,
                  null,
                  claims,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
        }
    }
}