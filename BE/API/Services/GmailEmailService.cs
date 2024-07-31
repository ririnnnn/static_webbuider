using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class GmailEmailService
    {
        private readonly GmailSmtpSettings _smtpSettings;

        public GmailEmailService(IOptions<GmailSmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            using var client = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port);
            client.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);
            client.EnableSsl = true;

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpSettings.SenderEmail, _smtpSettings.SenderName),
                Subject = subject,
                Body = message,
                IsBodyHtml = true
            };

            mailMessage.To.Add(toEmail);

            await client.SendMailAsync(mailMessage);
        }
    }
    public class GmailSmtpSettings
    {
        public string? Server { get; set; }
        public int Port { get; set; }
        public string? SenderName { get; set; }
        public required string SenderEmail { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}


