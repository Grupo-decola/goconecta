using app_goconecta.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace app_goconecta.Server.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Hotel> Hotels { get; set; }
    public DbSet<Package> Packages { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Media> Media { get; set; }
    public DbSet<Amenity> Amenities { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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
        
        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Rating).IsRequired();
            entity.Property(e => e.RoomsAvailable).IsRequired();
            entity.Property(e => e.Region).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(200);
            entity.HasMany<Package>(e => e.Packages)
                .WithOne(e => e.Hotel)
                .HasForeignKey(e => e.HotelId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<Hotel>()
            .HasMany(h => h.Amenities)
            .WithMany(a => a.Hotels)
            .UsingEntity(j => j.ToTable("HotelAmenities"));

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Destination).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.PriceAdults).HasColumnType("decimal(18,2)");
            entity.Property(e => e.PriceChildren).HasColumnType("decimal(18,2)");
            entity.HasMany<Media>(e => e.Media)
                .WithOne(e => e.Package)
                .HasForeignKey(e => e.PackageId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Hotel)
                .WithMany(h => h.Packages)
                .HasForeignKey(e => e.HotelId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.Navigation(e => e.Media).AutoInclude();
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ReservationNumber).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
            entity.HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(r => r.Package)
                .WithMany(tp => tp.Reservations)
                .HasForeignKey(r => r.PackageId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.OwnsMany(r => r.Guests, guest =>
                {
                    guest.WithOwner().HasForeignKey("ReservationId");
                    guest.Property<int>("Id");
                    guest.HasKey("Id");
                    guest.Property(g => g.Name).IsRequired().HasMaxLength(100);
                    guest.Property(g => g.BirthDate).IsRequired();
                    guest.Property(g => g.Email).HasMaxLength(100);
                    guest.Property(g => g.Cpf).IsRequired();
                });
        });
        
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

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Stars).IsRequired();
            entity.Property(e => e.Comment);
        
            entity.HasOne(e => e.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        
            entity.HasOne(e => e.Package)
                .WithMany(tp => tp.Ratings)
                .HasForeignKey(e => e.PackageId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}