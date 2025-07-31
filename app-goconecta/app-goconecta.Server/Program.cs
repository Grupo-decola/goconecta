using System.Text;
using app_goconecta.Server.Data;
using app_goconecta.Server.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

// Set Stripe API key from configuration
StripeConfiguration.ApiKey = builder.Configuration["Stripe:ApiKey"];

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddSingleton<Stripe.Checkout.SessionService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// JWT (configurado mas não obrigatório neste momento)
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Secret"] ?? throw new InvalidOperationException("JWT Secret não configurado."));

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "SmartPolicyScheme";
})
.AddPolicyScheme("SmartPolicyScheme", "", options =>
{
    options.ForwardDefaultSelector = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
            return JwtBearerDefaults.AuthenticationScheme;
        return CookieAuthenticationDefaults.AuthenticationScheme;
    };
})
.AddCookie(options =>
{
    options.LoginPath = "/admin/MvcAuthentication/Login";
    options.AccessDeniedPath = "/admin/MvcAuthentication/AccessDenied";
    options.Cookie.Name = "GoConectaAdminAuthCookie";
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

// Autorização (ainda configurada, mas não obrigatória)
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAuthenticated", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("RequireAdmin", policy => policy.RequireClaim("Store", "admin"));
});


builder.Services.AddControllers(options =>
{
    options.Filters.Add(new AuthorizeFilter("RequireAuthenticated") );
});


builder.Services.AddControllers(); //  agora tudo liberado sem autenticação obrigatória
builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// CORS
app.UseCors("AllowAll");

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Pipeline padrão
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Middlewares de autenticação (ainda configurados, mas não vão bloquear as rotas)
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowAll");

app.MapControllerRoute(
    name: "default",
    pattern: "admin/{controller=MvcHome}/{action=Index}/{id?}"
);

app.MapControllers(); // API pública liberada

app.Run();