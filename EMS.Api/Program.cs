using AutoMapper.Extensions.ExpressionMapping;
using EMS.Api.Common;
using EMS.Service.AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ConfigurationSettings>(builder.Configuration);
    
builder.Services.AddControllers();
builder.Services.ConnectDatabase(builder.Configuration);
builder.Services.RegisterRepository();
builder.Services.RegisterServices();
builder.Services.AddJWTAuthentication(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    OpenApiSecurityScheme openApiSecurityScheme = new OpenApiSecurityScheme()
    {
        Name = "Jwt Authentication",
        Description = "Enter Jwt Bearer Token",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference()
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    options.AddSecurityDefinition(openApiSecurityScheme.Reference.Id, openApiSecurityScheme);
    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            openApiSecurityScheme, new string[]{ }
        }
    });
});
builder.Services.AddAutoMapper(cfg => { cfg.AddExpressionMapping(); }, typeof(MappingProfile));
builder.Services.AddCors(o => o.AddPolicy("EMSPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("EMSPolicy");
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
