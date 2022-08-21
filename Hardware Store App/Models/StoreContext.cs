using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Hardware_Store_App.Models
{
    public partial class StoreContext : DbContext
    {
        private readonly IConfiguration configuration;

        public StoreContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public StoreContext(DbContextOptions<StoreContext> options, IConfiguration configuration) : base(options)
        {
            this.configuration = configuration;
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Countryproducer> Countryproducers { get; set; } = null!;
        public virtual DbSet<Discount> Discounts { get; set; } = null!;
        public virtual DbSet<Manufacturer> Manufacturers { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Orderproduct> Orderproducts { get; set; } = null!;
        public virtual DbSet<Photo> Photos { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Specification> Specifications { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(configuration.GetConnectionString("defaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories");

                entity.HasIndex(e => e.Name, "categories_name_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Countryproducer>(entity =>
            {
                entity.ToTable("countryproducers");

                entity.HasIndex(e => e.Name, "countryprodusers_name_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Discount>(entity =>
            {
                entity.ToTable("discounts");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Begindate)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("begindate");

                entity.Property(e => e.Enddate)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("enddate");

                entity.Property(e => e.Percentage)
                    .HasPrecision(5, 2)
                    .HasColumnName("percentage");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Discounts)
                    .HasForeignKey(d => d.Productid)
                    .HasConstraintName("discounts_productid_fkey");
            });

            modelBuilder.Entity<Manufacturer>(entity =>
            {
                entity.ToTable("manufacturers");

                entity.HasIndex(e => e.Name, "manufacturers_name_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Orderdate)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("orderdate")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("orders_userid_fkey");
            });

            modelBuilder.Entity<Orderproduct>(entity =>
            {
                entity.HasKey(e => new { e.Orderid, e.Productid })
                    .HasName("orderproducts_pkey");

                entity.ToTable("orderproducts");

                entity.Property(e => e.Orderid).HasColumnName("orderid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Price)
                    .HasPrecision(8, 2)
                    .HasColumnName("price");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Orderproducts)
                    .HasForeignKey(d => d.Orderid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orderproducts_orderid_fkey");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Orderproducts)
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orderproducts_productid_fkey");
            });

            modelBuilder.Entity<Photo>(entity =>
            {
                entity.ToTable("photo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Path)
                    .HasMaxLength(500)
                    .HasColumnName("path");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Photos)
                    .HasForeignKey(d => d.Productid)
                    .HasConstraintName("photo_productid_fkey");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Countryproducerid).HasColumnName("countryproducerid");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Manufacturerid).HasColumnName("manufacturerid");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Price)
                    .HasPrecision(8, 2)
                    .HasColumnName("price");

                entity.Property(e => e.Rating)
                    .HasPrecision(2, 1)
                    .HasColumnName("rating");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.Categoryid)
                    .HasConstraintName("fk_category");

                entity.HasOne(d => d.Countryproducer)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.Countryproducerid)
                    .HasConstraintName("fk_countryproducer");

                entity.HasOne(d => d.Manufacturer)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.Manufacturerid)
                    .HasConstraintName("fk_manufacturer");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("reviews");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Comment).HasColumnName("comment");

                entity.Property(e => e.Estimation)
                    .HasPrecision(2, 1)
                    .HasColumnName("estimation");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Reviewdate)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("reviewdate")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.Productid)
                    .HasConstraintName("reviews_productid_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("reviews_userid_fkey");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");

                entity.HasIndex(e => e.Name, "roles_name_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Specification>(entity =>
            {
                entity.ToTable("specifications");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Value)
                    .HasMaxLength(100)
                    .HasColumnName("value");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Specifications)
                    .HasForeignKey(d => d.Productid)
                    .HasConstraintName("specifications_productid_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email, "users_email_key")
                    .IsUnique();

                entity.HasIndex(e => e.Phonenumber, "users_phonenumber_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .HasColumnName("address");

                entity.Property(e => e.Birthdate).HasColumnName("birthdate");

                entity.Property(e => e.Email)
                    .HasMaxLength(320)
                    .HasColumnName("email");

                entity.Property(e => e.Firstname)
                    .HasMaxLength(50)
                    .HasColumnName("firstname");

                entity.Property(e => e.Hashedpassword)
                    .HasMaxLength(64)
                    .HasColumnName("hashedpassword")
                    .IsFixedLength();

                entity.Property(e => e.Isemailconfirmed).HasColumnName("isemailconfirmed");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(50)
                    .HasColumnName("lastname");

                entity.Property(e => e.Phonenumber)
                    .HasMaxLength(16)
                    .HasColumnName("phonenumber");

                entity.Property(e => e.Registrationdate)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("registrationdate")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Sex)
                    .HasMaxLength(10)
                    .HasColumnName("sex");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("fk_role");

                entity.HasMany(d => d.Products)
                    .WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "Wishlistproduct",
                        l => l.HasOne<Product>().WithMany().HasForeignKey("Productid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("wishlistproducts_productid_fkey"),
                        r => r.HasOne<User>().WithMany().HasForeignKey("Userid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("wishlistproducts_userid_fkey"),
                        j =>
                        {
                            j.HasKey("Userid", "Productid").HasName("wishlistproducts_pkey");

                            j.ToTable("wishlistproducts");

                            j.IndexerProperty<int>("Userid").HasColumnName("userid");

                            j.IndexerProperty<int>("Productid").HasColumnName("productid");
                        });
            });

            modelBuilder.HasSequence<int>("countryproducers_id_seq");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
