using SampleCalendar.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SampleCalendar.Controllers
{
    public class CalendarController : Controller
    {
        // GET: Calendar
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult FetchEventsOnCalendar()
        {
            try
            {
                using (CalendarEventEntities context = new CalendarEventEntities())
                {
                    int? EventTypeId = Request.Params["EventTypeId"] == "" ? 0 : Convert.ToInt32(Request.Params["EventTypeId"]);
                    string UserId = String.IsNullOrEmpty(Request.Params["UserId"]) ? "" : Request.Params["UserId"].ToString();
                    string search = "";
                    var events = context.FetchAllActiveEvents(UserId, EventTypeId, search).ToList();
                    return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
            }
            catch (Exception ex)
            {
                string erroexceptiopm = ex.ToString();
                var events = "";
                return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        [HttpPost]
        public JsonResult SaveEvent(Event e)
        {

            string UserId = "";
            string CalendarThemeColor = "#039BE5";
            string AllDateOccurences = Request.Params["AllDateOccurences"] == null ? "" : Request.Params["AllDateOccurences"].ToString();

            //For TimeZone use TimeZone of the user. Below is the reference link.
            //https://support.microsoft.com/en-us/help/973627/microsoft-time-zone-index-values
            //string TimeZone = "Pacific Standard Time";
            string TimeZone = "India Standard Time";

            TimeZoneInfo tzf = TimeZoneInfo.FindSystemTimeZoneById(TimeZone);
            string schedule = Generic.concatDateTime(17);
            Int64 kjdfgf = Generic.ConvertToUnixTime2(TimeZoneInfo.ConvertTimeToUtc(Convert.ToDateTime(e.Start), tzf));
            long SS_StartDateTime = Generic.ConvertToUnixTime(TimeZoneInfo.ConvertTimeToUtc(Convert.ToDateTime(e.Start), tzf));
            string UTCStartDateTime = SS_StartDateTime.ToString();
            double countSS_StartDateTime = Math.Floor(Math.Log10(SS_StartDateTime) + 1);
            double thresh = 13;
            if (countSS_StartDateTime != thresh && countSS_StartDateTime <= thresh)
            {
                string extarZero = "";
                double iloop = thresh - countSS_StartDateTime;
                for (double y = 1; y <= iloop; y++)
                {
                    extarZero = extarZero + "0";
                }
                UTCStartDateTime = SS_StartDateTime.ToString() + extarZero;
                SS_StartDateTime = Convert.ToInt64(UTCStartDateTime);
            }

            long? SS_EndDateTime = null;
            string UTCEndDateTime = null;
            if (e.End != null)
            {
                SS_EndDateTime = Generic.ConvertToUnixTime(TimeZoneInfo.ConvertTimeToUtc(Convert.ToDateTime(e.End), tzf));
                UTCEndDateTime = SS_EndDateTime.ToString();
                if (SS_EndDateTime.HasValue)
                {
                    double countSS_EndDateTime = Math.Floor(Math.Log10(SS_EndDateTime.Value) + 1);
                    double threshend = 13;
                    if (countSS_EndDateTime != threshend && countSS_EndDateTime <= threshend)
                    {
                        string extarZero = "";
                        double iloop = threshend - countSS_EndDateTime;
                        for (double y = 1; y <= iloop; y++)
                        {
                            extarZero = extarZero + "0";
                        }
                        UTCEndDateTime = SS_EndDateTime.ToString() + extarZero;
                    }
                }


            }

            string UTCRepeatEndDate = null;

            var status = false;
            var newEvent = false;
            using (CalendarEventEntities dc = new CalendarEventEntities())
            {
                if (e.EventID > 0)
                {
                    //Update the event
                    var v = dc.Events.Where(a => a.EventID == e.EventID).FirstOrDefault();
                    if (v != null)
                    {
                        string nUTCRepeatEndDate = null;
                        if (e.RepeatEndDate != null)
                        {
                            DateTime tmpRepeatEndDate = Convert.ToDateTime(e.RepeatEndDate);
                            DateTime EndDateforThisNewEvent = new DateTime(tmpRepeatEndDate.Year, tmpRepeatEndDate.Month, tmpRepeatEndDate.Day, 23, 59, 0);
                            e.RepeatEndDate = EndDateforThisNewEvent;

                            nUTCRepeatEndDate = GetUTCRepeatEndDate(EndDateforThisNewEvent, TimeZone);
                        }

                        v.Subject = e.Subject;
                        v.Start = e.Start;
                        v.End = e.End;
                        v.UTCStartDateTime = UTCStartDateTime;
                        v.UTCEndDateTime = UTCEndDateTime;
                        v.Description = e.Description;
                        v.IsFullDay = e.IsFullDay;
                        //v.ThemeColor = e.ThemeColor;
                        v.ThemeColor = CalendarThemeColor;
                        v.RRule = e.IsRecurring == false ? null : e.RRule;
                        v.IsRecurring = e.RRule == null || e.RRule == "" ? false : e.IsRecurring;

                        v.RepeatEndDate = e.RepeatEndDate;
                        v.UTCRepeatEndDate = nUTCRepeatEndDate;

                        v.UserId = UserId;
                        v.EventTypeId = e.EventTypeId;
                        v.EventStatus = e.EventStatus;
                        v.IsActive = true;

                        newEvent = false;

                        dc.SaveChanges();
                        status = true;

                    }



                }
                else
                {

                    if (e.RepeatEndDate != null)
                    {
                        DateTime tmpRepeatEndDate = Convert.ToDateTime(e.RepeatEndDate);
                        DateTime EndDateforThisNewEvent = new DateTime(tmpRepeatEndDate.Year, tmpRepeatEndDate.Month, tmpRepeatEndDate.Day, 23, 59, 0);
                        e.RepeatEndDate = EndDateforThisNewEvent;

                        UTCRepeatEndDate = GetUTCRepeatEndDate(EndDateforThisNewEvent, TimeZone);
                    }

                    e.UserId = UserId;
                    e.EventStatus = "Scheduled";
                    e.UTCStartDateTime = UTCStartDateTime;
                    e.UTCEndDateTime = UTCEndDateTime;
                    e.UTCRepeatEndDate = UTCRepeatEndDate;
                    e.ThemeColor = CalendarThemeColor;
                    e.EventGUID = Guid.NewGuid().ToString();
                    e.IsActive = true;
                    dc.Events.Add(e);

                    newEvent = true;

                    try
                    {
                        dc.SaveChanges();
                    }
                    catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                    {
                        Exception raise = dbEx;
                        foreach (var validationErrors in dbEx.EntityValidationErrors)
                        {
                            foreach (var validationError in validationErrors.ValidationErrors)
                            {
                                string message = string.Format("{0}:{1}",
                                    validationErrors.Entry.Entity.ToString(),
                                    validationError.ErrorMessage);
                                // raise a new exception nesting  
                                // the current instance as InnerException  
                                raise = new InvalidOperationException(message, raise);
                            }
                        }
                        throw raise;
                    }

                    status = true;

                }


            }
            return new JsonResult { Data = new { status = status, EventSavedDate = e.Start } };
        }

        [HttpPost]
        public JsonResult UpdateEventStatus()
        {
            var status = false;
            Int64 EventID = Request.Params["EventID"] == null ? 0 : Convert.ToInt64(Request.Params["EventID"]);
            string EventStatus = Request.Params["EventStatus"];
            string IsRecurring = Request.Params["IsRecurring"];
            string StartDateThisSession = Request.Params["StartDateThisSession"];
            string EndDateThisSession = Request.Params["EndDateThisSession"];
            if (EventID != 0 && !String.IsNullOrEmpty(EventStatus))
            {
                using (CalendarEventEntities context = new CalendarEventEntities())
                {
                    var v = context.Events.Where(a => a.EventID == EventID).FirstOrDefault();
                    if (v != null)
                    {
                        context.UpdateEvent_Status(EventID, EventStatus);
                        status = true;
                    }
                }

            }
            return new JsonResult { Data = new { status, EventSavedDate = StartDateThisSession } };
        }

        [HttpPost]
        public JsonResult DeleteEventByEventId(int eventID)
        {
            var status = false;
            using (CalendarEventEntities context = new CalendarEventEntities())
            {
                var v = context.Events.Where(a => a.EventID == eventID).FirstOrDefault();
                if (v != null)
                {
                    context.DeleteEventByEventId(Convert.ToInt64(eventID));
                    status = true;
                }
            }
            return new JsonResult { Data = new { status } };
        }

        public string GetUTCRepeatEndDate(DateTime RepeatEndDate, string TimeZone)
        {
            TimeZoneInfo tzf = TimeZoneInfo.FindSystemTimeZoneById(TimeZone);
            long SS_StartDateTime = Generic.ConvertToUnixTime(TimeZoneInfo.ConvertTimeToUtc(Convert.ToDateTime(RepeatEndDate), tzf));
            string UTCStartDateTime = SS_StartDateTime.ToString();
            double countSS_StartDateTime = Math.Floor(Math.Log10(SS_StartDateTime) + 1);
            double thresh = 13;
            if (countSS_StartDateTime != thresh && countSS_StartDateTime <= thresh)
            {
                string extarZero = "";
                double iloop = thresh - countSS_StartDateTime;
                for (double y = 1; y <= iloop; y++)
                {
                    extarZero = extarZero + "0";
                }
                UTCStartDateTime = SS_StartDateTime.ToString() + extarZero;
                SS_StartDateTime = Convert.ToInt64(UTCStartDateTime);
            }

            return UTCStartDateTime;
        }
    }
}