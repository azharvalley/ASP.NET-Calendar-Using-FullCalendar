# ASP.NET Calendar Using FullCalendar JavaScript Library

Calendar using FullCalendar JavaScript Library

Powerful and Lightweight JavaScript Calendar built using FullCalendar Javascript Library

FullCalendar Javascript Library: https://fullcalendar.io

Technology used:
- FullCalendar (v4) JavaScript Library
- ASP.NET MVC
- C#.NET
- Entity Framework

(FullCalendar version 4 is used)

**You will require SQL Server Database on your local machine**
---------------------------------------------------------------------------------------
>Create a Database. Execute the SQL Script (Tables_StoredProcedure_Script.sql)

>Replace your connectionString in the web.config file of the project.

```
<connectionStrings>
    <add name="CalendarEventEntities" 
         connectionString="metadata=res://*/Models.CalendarEvents.csdl|res://*/Models.CalendarEvents.ssdl|res://*/Models.CalendarEvents.msl;
         provider=System.Data.SqlClient;provider connection string=&quot;
         data source=YouServerName;initial catalog=YourDataBaseName;user id=DatabaseUserName;password=DataBasePassword;
         MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient" />
  </connectionStrings>
  ```
  
  **Important FullCalendar JavaScript Library used on the Calendar Index page**
  -----------------------------------------------------------------------------------------------
  
  FullCalendar Library included on the Calendar > Index.cshtml file::Do not change these files
 
 ```  
    <link href='~/Library/fullcalendarv4/packages/core/main.css' rel='stylesheet' />
    <link href='~/Library/fullcalendarv4/packages/daygrid/main.css' rel='stylesheet' />
    <link href='~/Library/fullcalendarv4/packages/timegrid/main.css' rel='stylesheet' />
    <link href='~/Library/fullcalendarv4/packages/list/main.css' rel='stylesheet' />
    <script src='~/Library/fullcalendarv4/vendor/rrule.js'></script>
    <script src='~/Library/fullcalendarv4/packages/core/main.js'></script>
    <script src='~/Library/fullcalendarv4/packages/interaction/main.js'></script>
    <script src='~/Library/fullcalendarv4/packages/daygrid/main.js'></script>
    <script src='~/Library/fullcalendarv4/packages/timegrid/main.js'></script>
    <script src='~/Library/fullcalendarv4/packages/list/main.js'></script>
    <script src='~/Library/fullcalendarv4/packages/rrule/main.js'></script>
    <script src="~/Library/fullcalendarv4/packages/moment/main.js"></script>  
```

*All operations like insert, update, delete and disply events on the Calendar is available in below JavaScript Files*

[Render events on the calendar from Database](SampleCalendar/calendar-js-api/FullCalendar-4.0.js)

[Add/update events in the Database](SampleCalendar/calendar-js-api/CalOperations.js)




