﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SampleCalendar.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class CalendarEventEntities : DbContext
    {
        public CalendarEventEntities()
            : base("name=CalendarEventEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Event> Events { get; set; }
    
        public virtual ObjectResult<string> DeleteEventByEventId(Nullable<long> eventId)
        {
            var eventIdParameter = eventId.HasValue ?
                new ObjectParameter("EventId", eventId) :
                new ObjectParameter("EventId", typeof(long));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("DeleteEventByEventId", eventIdParameter);
        }
    
        public virtual ObjectResult<FetchAllActiveEvents_Result> FetchAllActiveEvents(string userId, Nullable<int> eventTypeId, string search)
        {
            var userIdParameter = userId != null ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(string));
    
            var eventTypeIdParameter = eventTypeId.HasValue ?
                new ObjectParameter("EventTypeId", eventTypeId) :
                new ObjectParameter("EventTypeId", typeof(int));
    
            var searchParameter = search != null ?
                new ObjectParameter("search", search) :
                new ObjectParameter("search", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<FetchAllActiveEvents_Result>("FetchAllActiveEvents", userIdParameter, eventTypeIdParameter, searchParameter);
        }
    
        public virtual int UpdateEvent_Status(Nullable<long> eventID, string eventStatus)
        {
            var eventIDParameter = eventID.HasValue ?
                new ObjectParameter("EventID", eventID) :
                new ObjectParameter("EventID", typeof(long));
    
            var eventStatusParameter = eventStatus != null ?
                new ObjectParameter("EventStatus", eventStatus) :
                new ObjectParameter("EventStatus", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("UpdateEvent_Status", eventIDParameter, eventStatusParameter);
        }
    }
}
