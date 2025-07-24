using app_goconecta.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Data;

using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Package> Packages { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Media> Media { get; set; }
    // public DbSet<Payment> Payments { get; set; }
    // public DbSet<Rating> Ratings { get; set; }
    // public DbSet<CustomizationRequest> CustomizationRequests { get; set; }
    // public DbSet<CustomizationBudget> CustomizationBudgets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Password).IsRequired();
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.CpfPassport).HasMaxLength(20);
            entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
        });

        // Package configuration
        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Destination).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
            entity.HasMany<Media>(e => e.Media).WithOne(e => e.Package);
        });

        // Reservation configuration
        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ReservationNumber).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20);

            entity.HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(r => r.Package)
                .WithMany(tp => tp.Reservations)
                .HasForeignKey(r => r.PackageId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        // Media configuration
        modelBuilder.Entity<Media>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Path).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Title).HasMaxLength(100);
            entity.Property(e => e.Type).IsRequired().HasMaxLength(20);
            entity.HasOne(m => m.Package)
                .WithMany(tp => tp.Media)
                .HasForeignKey(m => m.PackageId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Payment configuration
        // modelBuilder.Entity<Payment>(entity =>
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.Property(e => e.GatewayTransactionId).HasMaxLength(100);
        //     entity.Property(e => e.PaymentMethod).IsRequired().HasMaxLength(50);
        //     entity.Property(e => e.PaidValue).HasColumnType("decimal(18,2)");
        //     entity.Property(e => e.PaymentStatus).IsRequired().HasMaxLength(20);
        //     entity.Property(e => e.ReceiptURL);
        //
        //     entity.HasOne(p => p.Reservation)
        //         .WithMany(r => r.Payments)
        //         .HasForeignKey(p => p.ReservationId)
        //         .OnDelete(DeleteBehavior.Cascade);
        // });

        // Rating configuration
        // modelBuilder.Entity<Rating>(entity =>
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.Property(e => e.Rating).IsRequired();
        //     entity.Property(e => e.Comment);
        //
        //     entity.HasOne(e => e.User)
        //         .WithMany(u => u.Ratings)
        //         .HasForeignKey(e => e.UserId)
        //         .OnDelete(DeleteBehavior.Restrict);
        //
        //     entity.HasOne(e => e.Package)
        //         .WithMany(tp => tp.Ratings)
        //         .HasForeignKey(e => e.PackageId)
        //         .OnDelete(DeleteBehavior.Restrict);
        // });

        // CustomizationRequest configuration
        // modelBuilder.Entity<CustomizationRequest>(entity =>
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.Property(e => e.ModificationDescription).IsRequired();
        //     entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
        //
        //     entity.HasOne(cr => cr.User)
        //         .WithMany(u => u.CustomizationRequests)
        //         .HasForeignKey(cr => cr.UserId)
        //         .OnDelete(DeleteBehavior.Restrict);
        //
        //     entity.HasOne(cr => cr.Package)
        //         .WithMany(tp => tp.CustomizationRequests)
        //         .HasForeignKey(cr => cr.PackageId)
        //         .OnDelete(DeleteBehavior.Restrict);
        // });

        // CustomizationBudget configuration
        // modelBuilder.Entity<CustomizationBudget>(entity =>
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.Property(e => e.ProposedValue).HasColumnType("decimal(18,2)");
        //     entity.Property(e => e.BudgetDetails).IsRequired();
        //     entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
        //
        //     entity.HasOne(cb => cb.CustomizationRequest)
        //         .WithMany(cr => cr.CustomizationBudgets)
        //         .HasForeignKey(cb => cb.CustomizationRequestId)
        //         .OnDelete(DeleteBehavior.Cascade);
        // });
    }

public DbSet<app_goconecta.Server.Models.Hotel> Hotel { get; set; } = default!;
}