using app_goconecta.Server.Models;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;

namespace app_goconecta.Server.Services;

public class EmailService
{
    private readonly SmtpSettings _smtpSettings;

    public EmailService(SmtpSettings smtpSettings)
    {
        _smtpSettings = smtpSettings;
    }

    public async Task SendEmailAsync(User user, string subject, string body)
    {
        var message = new MimeMessage
        {
            From = { new MailboxAddress(_smtpSettings.FromName, _smtpSettings.FromEmail) },
            To = { new MailboxAddress(user.Name, user.Email) },
            Subject = subject
        };

        var builder = new BodyBuilder
        {
            HtmlBody = $"""
                        <img style="width: 100%; max-width: 960px;" src="cid:goconecta" alt="My Image">
                        <hr/>
                        <h1 style="color: #182348;">{subject}</h1>
                        <p>{body}</p>
                        <p>
                        Atenciosamente,
                        Equipe <strong><span style="color: #DA7818;">Go</span><span style="color: #182348;">Conecta</span></strong>.
                        </p>
                        """
        };
        await using var image = File.OpenRead("wwwroot/assets/logo-goconecta-lg.png");
        var linkedImage = await builder.LinkedResources.AddAsync("logo-goconecta-lg.png", image);
        linkedImage.ContentId = "goconecta";
        message.Body = builder.ToMessageBody();

        await SendAsync(message);
    }

    private async Task SendAsync(MimeMessage message)
    {
        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpSettings.Host, _smtpSettings.Port, false);
        await client.AuthenticateAsync(_smtpSettings.Username, _smtpSettings.Password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}