using System;
using AutoMapper;
using Domain;

namespace Application.Core;

// AutoMapper profile to define mapping configurations
public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // setup for where we are to map from and map to
        // Source -> Destination: Activity -> Activity
        CreateMap<Activity, Activity>();
    }
}
