using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    // Activity properties
    public string Title { get; set; } = "";
    public DateTime Date { get; set; }
    public string Description { get; set; } = "";
    public string Category { get; set; } = "";

    // Location properties
    public string City { get; set; } = "";
    public string Venue { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }

}
