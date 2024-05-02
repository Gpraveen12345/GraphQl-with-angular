global using graphQl;
using GraphQL.Server;
using GraphQL.Types;
using graphql6;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(c =>
{
    c.AddDefaultPolicy(b =>
    {
        b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddSingleton<IProductProvider, ProductProvider>();
builder.Services.AddSingleton<ProductType>();
builder.Services.AddSingleton<ProductQuery>();

builder.Services.AddSingleton<ISchema, ProductSchema>();
builder.Services.AddSingleton<IDataAccess, DataAccess>();
builder.Services.AddSingleton<IProductCreator, ProductCreator>();
builder.Services.AddSingleton<ProductMutation>();
builder.Services.AddSingleton<ProductInput>();

builder.Services.AddGraphQL(opt => opt.EnableMetrics = false).AddSystemTextJson();

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/products", ([FromServices] IProductProvider productProvider) =>
{
    return productProvider.GetProducts();
}).WithName("GetProducts");
app.UseGraphQLAltair();
app.UseGraphQL<ISchema>();

app.Run();
