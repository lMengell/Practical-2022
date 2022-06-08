using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using GenFu;
using InterviewTest.Models;

namespace InterviewTest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
            }));
            services.AddControllersWithViews();
            services.AddSingleton<FakeDb>(this.GenerateDatabase());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());


            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        public FakeDb GenerateDatabase()
        {
            var dobs = new List<DateTime?>();
            var rnd = new Random();
            for (int i = 0; i < 100; i++)
            {
                if (rnd.Next(0, 100) < 20)
                    dobs.Add(null);
                else
                    dobs.Add(DateTime.Now.AddDays(rnd.Next(365 * -50, 365 * -12)));
            }

            A.Configure<ContactModel>().Fill(cm => cm.DateOfBirth).WithRandom(dobs);
            var items = GenFu.GenFu.ListOf<ContactModel>(50);

            items.Insert(0, new ContactModel()
            {
                Id = items.Max(x => x.Id) + 1,
                FirstName = "Simon",
                LastName = "Jay",
                DateOfBirth = new DateTime(1985, 03, 15),
                PhoneNumber = "01803 123456",
                School = "Torquay Boys",
            });

            //GenFu will Randomise the IDs - so they are unique we should give them an appropriate Id Now.
            for (int i = 0; i < items.Count; i++)
            {
                items[i].Id = i;
            }

            FakeDb data = new FakeDb() { Contacts = items };

            return data;
        }
    }

}

