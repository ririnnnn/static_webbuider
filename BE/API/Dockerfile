# Use the official ASP.NET Core SDK image from Docker Hub
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the entire project and build it
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expose port 80 for HTTP traffic
EXPOSE 8080
EXPOSE 8081

# Command to run the application
ENTRYPOINT ["dotnet", "API.dll"]
