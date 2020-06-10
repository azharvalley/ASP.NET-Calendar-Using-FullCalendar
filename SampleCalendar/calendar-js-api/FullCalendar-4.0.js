var calendar = "";
var goToDateafterSearchFound = null;
var HDDCurrentOpenViewOfCalendar = $("#CurrentOpenViewOfCalendar").val();
var currentOpenview = HDDCurrentOpenViewOfCalendar == null || HDDCurrentOpenViewOfCalendar == "" ? null : HDDCurrentOpenViewOfCalendar;
var hddShowDate = $("#hddShowDate").val();
var goToThisDate = hddShowDate == null || hddShowDate == "" ? new Date() : new Date(hddShowDate);
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calender');

    calendar = new FullCalendar.Calendar(calendarEl, {

        plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'rrule', 'momentPlugin'],

        eventRender: function (info) {
            
            if (info.view.type != "listMonth" && info.view.type != "dayGridMonth") {
                var fctime = info.el.querySelector('.fc-time');
                var fctitle = info.el.querySelector('.fc-title');
                //fctitle.after(fctime);

                var xxstartDate = moment(info.event.start).format("YYYY-MM-DD");
                var xxendDate = moment(info.event.end).format("YYYY-MM-DD");

                if (moment(xxstartDate).isSame(xxendDate)) {
                    if (info.event.allDay != 1) {
                        fctitle.after(fctime);
                    }
                }               

            }


            if (info.view.type != "listMonth") {
                if (info.event.extendedProps.EventTypeId == 1) {
                    //element.find("div.fc-content").prepend("<i class=\"fa fa-dot-circle-o sr-ico\"></i>");
                }
                else if (info.event.extendedProps.EventTypeId == 2) {
                    //element.find("div.fc-content").prepend("<i class=\"fa fa-bell sr-bell\"></i> ");
                }

                if (info.event.extendedProps.EventStatus == 'No Show') {
                    var mainel = info.el.querySelector('div.fc-content');
                    let append = document.createElement('li');
                    append.className = 'fa fa-ban sr-ico';
                    mainel.prepend(append);
                }
                else if (info.event.extendedProps.EventStatus == 'Canceled') {
                    var mainel = info.el.querySelector('div.fc-content');
                    let append = document.createElement('li');
                    append.className = 'fa fa-ban sr-ico';
                    mainel.prepend(append);
                }
                else if (info.event.extendedProps.EventStatus == 'Checked In') {
                    var mainel = info.el.querySelector('div.fc-content');
                    let append = document.createElement('li');
                    append.className = 'fa fa-hourglass-start sr-ico';
                    mainel.prepend(append);
                }
                else if (info.event.extendedProps.EventStatus == 'Completed') {
                    var mainel = info.el.querySelector('div.fc-content');
                    let append = document.createElement('li');
                    append.className = 'fas fa-check-square sr-ico sr-check';
                    mainel.prepend(append);
                }
                else if (info.event.extendedProps.EventStatus == 'Scheduled') {
                    //var mainel = info.el.querySelector('div.fc-content');
                    //let append = document.createElement('li');
                    //append.className = 'fas fa-check-square sr-ico sr-check';
                    //mainel.prepend(append);
                }
            }
               

            var start = moment(info.event.start).format("MMM DD, hh:mm a");
            var end = moment(info.event.end).format("MMM DD, hh:mm a");
            var startTime;
            var endTime;

            if (!start) {
                startTime = '';
            } else {
                startTime = start;
            }

            if (!end) {
                endDate = '';
            } else {
                endTime = end;
            }

            var thBgColor = info.event.backgroundColor;
            var thColorss = info.event.borderColor;
            var title = "<strong><span class='btn-round-bullet' style='background-color: " + thBgColor + ";'></span> " + info.event.title + "</strong>";
            var description = info.event.extendedProps.description;
            if (!info.event.extendedProps.description) {
                description = '';
            }

            var EventTypeId = info.event.extendedProps.EventTypeId;
            var PopUpContent = "";
            var popupStartEndDate = '';
            if (info.event.allDay == 1) {

                var Custom_ActualEnddate = new Date(info.event.end);
                Custom_ActualEnddate.setDate(Custom_ActualEnddate.getDate() - 1);
                Custom_ActualEnddate = moment(Custom_ActualEnddate).format("MMM DD, YYYY");


                var xcstartDate = moment(info.event.start).format("YYYY-MM-DD");
                var xcendDate = moment(Custom_ActualEnddate).format("YYYY-MM-DD");


                if (moment(xcstartDate).isSame(xcendDate)) {//Show only Start Date
                    popupStartEndDate = moment(info.event.start).format("ddd, MMM DD");
                }
                else {
                    popupStartEndDate = moment(info.event.start).format("ddd, MMM DD") + " - " + moment(Custom_ActualEnddate).format("ddd, MMM DD");
                }




                PopUpContent = "<strong><i class='far fa-clock'></i></strong> <span style='color:#3c8dbc;'>" + popupStartEndDate + "</span><br>" + "<strong>Status: </strong>" + info.event.extendedProps.EventStatus + "<br>" + description;


            }
            else {


                var startDate = moment(info.event.start).format("YYYY-MM-DD");
                var endDate = moment(info.event.end).format("YYYY-MM-DD");

                if (moment(startDate).isSame(endDate)) {//Show only Start Date
                    popupStartEndDate = moment(info.event.start).format("ddd, MMM DD") + " . " + moment(info.event.start).format("hh:mm a") + " - " + moment(info.event.end).format("hh:mm a");
                }
                else {
                    popupStartEndDate = moment(info.event.start).format("MMM DD, hh:mm a") + "<br>" + moment(info.event.end).format("MMM DD, hh:mm a");
                }

                if (EventTypeId == "2") {
                    PopUpContent = "<strong><i class='far fa-clock'></i> </strong><span style='color:#3c8dbc;'>" + popupStartEndDate + "</span><br>" + "<strong>Status: </strong>" + info.event.extendedProps.EventStatus + "<br>" + description;
                }
                else {
                    PopUpContent = "<strong><i class='far fa-clock'></i> </strong><span style='color:#3c8dbc;'>" + popupStartEndDate + "</span><br>" + "<strong>Status: </strong>" + info.event.extendedProps.EventStatus + "<br>" + description;
                }

            }

            $(info.el).popover({
                title: title,
                html: true,
                placement: 'top',
                trigger: 'hover',
                content: PopUpContent,
                container: 'body'
            }).popover('show');
        },

        header: {
            left: 'prev,next today',
            center: 'title',
            right: $(window).width() < 767 ? 'timeGridDay,listMonth' : 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        defaultDate: goToThisDate != null && goToThisDate != "Invalid Date" ? goToThisDate : new Date(),//new Date() to make default date
        //defaultDate: new Date(),
        defaultView: currentOpenview != null ? currentOpenview : $(window).width() < 767 ? 'timeGridDay' : 'timeGridWeek',
        contentHeight: 1130,
        timeFormat: 'h(:mm)a',
        allDaySlot: true,
        allDayText: 'all-day',
        axisFormat: 'H:mm',
        slotDuration: '00:30:00',
        snapDuration: '01:00:00',
        //slotMinutes: '60',
        scrollTime: '00:00:00',
        minTime: '00:00:00',
        maxTime: '24:00:00',
        slotEventOverlap: true,
        agendaEventMinHeight: 22,
        nowIndicator: true,
        eventLimit: true,
        eventColor: '#63686e',
        longPressDelay: 100,
        //eventLongPressDelay: 100,
        selectLongPressDelay: 50,

        businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            startTime: '00:00',
            endTime: '24:00'
        },
        selectConstraint: "businessHours",

        //timeZone: 'UTC',
        events: function (info, successCallback, failureCallback) {

            data = {
                Start: info.start,
                End: info.end,
                startStr: info.startStr,
                endStr: info.endStr
            };

            $.ajax({
                type: "POST",
                data: data,
                url: "/calendar/FetchEventsOnCalendar",
                success: function (data) {
                    var Myevents = [];
                    var searchfoundinCurrentMonth = false;
                    var now = new Date();
                    $.each(data, function (i, v) {

                        try {

                            var dfrsearchgotodate = moment(Number(v.UTCStartDateTime)).format('MM-DD-YYYY');
                            var check = new Date(moment(dfrsearchgotodate, "MM-DD-YYYY"));
                            var nowMonth = now.getMonth() + 1;
                            var checkMonth = check.getMonth() + 1;
                                                       

                            if (v.RRule != null && v.RRule != "" && v.IsRecurring == 1) {

                                //https://stackoverflow.com/questions/8891325/jquery-get-the-time-in-hhmm-format-between-two-dates/8891629
                                var start_actual_time = new Date(moment(Number(v.UTCStartDateTime)));
                                var end_actual_time = new Date(moment(Number(v.UTCEndDateTime)));

                                var diff = end_actual_time - start_actual_time;

                                var diffSeconds = diff / 1000;
                                var HH = Math.floor(diffSeconds / 3600);
                                var MM = Math.floor(diffSeconds % 3600) / 60;

                                var TimeDuration = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
                                var DTSTART = moment(Number(v.UTCStartDateTime)).format('YYYYMMDDTHHmmss');                                
                                if (v.RepeatEndDate != null) {
                                    var xRRule = "";
                                    var RRuleRepeatendDate = "";
                                    if (v.UTCRepeatEndDate !== null) {
                                        RRuleRepeatendDate = moment(Number(v.UTCRepeatEndDate)).format('YYYYMMDDTHHmmss');
                                    }
                                    else {
                                        RRuleRepeatendDate = moment(v.RepeatEndDate).format('YYYYMMDDT235900');
                                    }

                                    if (v.RRule.toUpperCase().indexOf("UNTIL") != -1) {
                                        var temprvalue = v.RRule.split(';');
                                        var ValOfUntil = "";
                                        for (var x = 0; x < temprvalue.length; x++) {
                                            var splitted = temprvalue[x].split('=');
                                            if (splitted[0].toUpperCase() == "UNTIL") {
                                                ValOfUntil = splitted[1];
                                            }
                                        }
                                        var tmpUNTILWithValue = "UNTIL=" + ValOfUntil;
                                        var newUNTILVal = "UNTIL=" + RRuleRepeatendDate;
                                        xRRule = v.RRule.replace(tmpUNTILWithValue, newUNTILVal);
                                    }
                                    else {
                                        xRRule = v.RRule + ";" + "UNTIL=" + RRuleRepeatendDate;
                                    }
                                }
                                else {
                                    xRRule = v.RRule;
                                }


                                var CRRule = 'DTSTART:' + DTSTART;
                                CRRule = CRRule + '\nRRULE:';
                                CRRule = CRRule + xRRule;

                                try {
                                    Myevents.push({
                                        id: v.UserId,
                                        eventID: v.EventID,
                                        title: v.Subject,                                        
                                        description: v.Description,
                                        rrule: CRRule,
                                        CRRule: v.RRule,
                                        duration: TimeDuration,
                                        color: v.ThemeColor,
                                        allDay: v.IsFullDay,
                                        IsRecurring: v.IsRecurring,
                                        imageurl: '',
                                        EventTypeId: v.EventTypeId,
                                        EventStatus: v.EventStatus,
                                        EventGUID: v.EventGUID
                                    });
                                }
                                catch (err) {
                                    console.log(err.message);
                                }


                            }                            
                            else {
                                Myevents.push({
                                    id: v.UserId,
                                    eventID: v.EventID,
                                    title: v.Subject,
                                    description: v.Description,
                                    CRRule: '',
                                    start: moment(Number(v.UTCStartDateTime)).format('YYYY-MM-DDTHH:mm:ss'),
                                    end: v.UTCEndDateTime != null ? moment(Number(v.UTCEndDateTime)).format('YYYY-MM-DDTHH:mm:ss') : null,
                                    duration: TimeDuration,
                                    color: v.ThemeColor,
                                    allDay: v.IsFullDay,
                                    IsRecurring: v.IsRecurring,
                                    imageurl: '',
                                    EventTypeId: v.EventTypeId,
                                    EventStatus: v.EventStatus,
                                    EventGUID: v.EventGUID
                                    
                                });

                            }


                        }
                        catch (err) {
                            console.log(err);
                        }

                    });

                    try {
                        successCallback(Myevents);                        
                    }
                    catch (err) {
                        console.log(err);
                    }
                },
                error: function (xhr, status, error) {
                    var errorMessage = xhr.status + ': ' + xhr.statusText + ' :: ' + xhr.responseText;
                    console.log(xhr);
                    alert('Error - cal ' + errorMessage);
                },
                beforeSend: function (data) {
                    $("#calloader").show();
                    $('#maskdiv').addClass('maskloagind');
                },
                complete: function () {
                    $("#calloader").hide();
                    $('#maskdiv').removeClass('maskloagind');

                }
            });


        },
        eventClick: function (info) {
            selectedEvent = info;
            var calRRule = selectedEvent.event.extendedProps.CRRule != null ? selectedEvent.event.extendedProps.CRRule : '';

            var currentOpenview = selectedEvent.view.type;
            $("#CurrentOpenViewOfCalendar").val(currentOpenview);

            $('#hddChangeThisAndAllFutureEvents').val("0");
                       
            $('#vestartdate').html(moment(info.event.start).format("MMM DD, YYYY hh:mm a"));
            $('#veenddate').html(info.event.end != null ? moment(info.event.end).format("MMM DD, YYYY hh:mm a") : '');
            $('#veDescription').html(info.event.extendedProps.description);
            $('#hiddenEventID').val(info.event.extendedProps.eventID);
            $('#drpEventStatus').val(info.event.extendedProps.EventStatus);

            if (info.event.allDay == 1) {
                var Custom_ActualEnddate = new Date(info.event.end);
                Custom_ActualEnddate.setDate(Custom_ActualEnddate.getDate() - 1);
                Custom_ActualEnddate = moment(Custom_ActualEnddate).format("MMM DD, YYYY");


                var xcstartDate = moment(info.event.start).format("YYYY-MM-DD");
                var xcendDate = moment(Custom_ActualEnddate).format("YYYY-MM-DD");


                if (moment(xcstartDate).isSame(xcendDate)) {//Show only Start Date
                    eventstartendtime = moment(info.event.start).format("dddd, MMMM DD");
                }
                else {
                    eventstartendtime = moment(info.event.start).format("dddd, MMMM DD") + " to " + moment(Custom_ActualEnddate).format("dddd, MMMM DD");
                }
                $('#eventstartendtime').html(eventstartendtime);
            }
            else {
                var startDate = moment(info.event.start).format("YYYY-MM-DD");
                var endDate = moment(info.event.end).format("YYYY-MM-DD");
                if (moment(startDate).isSame(endDate)) {//Show only Start Date
                    eventstartendtime = moment(info.event.start).format("dddd, MMMM DD") + " . " + moment(info.event.start).format("hh:mm a") + " - " + moment(info.event.end).format("hh:mm a");
                }
                else {
                    eventstartendtime = moment(info.event.start).format("MMMM DD, hh:mm a") + " to " + moment(info.event.end).format("MMMM DD, hh:mm a");
                }
                $('#eventstartendtime').html(eventstartendtime);
            }

            $("#srtophead").css("background-color", info.event.backgroundColor);
            $("#pnlStatusbell").css("background-color", info.event.backgroundColor);

            var hhdEventTypeId = info.event.extendedProps.EventTypeId;


            var calEventstartDT = info.event.start != null ? moment(info.event.start).format("MM-DD-YYYY HH:mm:ss") : null;
            var calEventEndDT = info.event.end != null ? moment(info.event.end).format("MM-DD-YYYY HH:mm:ss") : null;

            var hddRoleOfLoggedInUser = $("#hddRoleOfLoggedInUser").val();

            if (hhdEventTypeId == "1") {
                $("#pnlStatusbell").removeClass("fa-bell").addClass("fa-calendar-plus-o");
                $(".OnlyForAppointment").hide();
                $('#myModal #eventTitle').text(info.event.title);
            }
            else if (hhdEventTypeId == "2") {
                $("#pnlStatusbell").removeClass("fa-calendar-plus-o").addClass("fa-bell");
                $(".OnlyForAppointment").show();
                $('#myModal #eventTitle').text('Appointment with: ' + info.event.title);
            }


            if (info.event.extendedProps.CRRule != null && info.event.extendedProps.CRRule != '') {
                var isrecurring = info.event.extendedProps.CRRule.split(";");
                if (isrecurring != null) {
                    $("#btnDelete").attr("data-isrecurring", "1");
                    $("#deleterecurringevents").attr("data-crrule", calRRule);
                    $("#hddViewingRRULe").val(calRRule);
                }
                else {
                    $("#btnDelete").attr("data-isrecurring", "0");
                    $("#deleterecurringevents").removeAttr("data-crrule");
                }

            }
            else {
                $("#btnDelete").attr("data-isrecurring", "0");
                $("#deleterecurringevents").removeAttr("data-crrule");
            }


            $('#myModal').modal();
        },
        selectable: true,
        select: function (info) {
            selectedEvent = info;
            var currentOpenview = selectedEvent.view.type;
            $("#CurrentOpenViewOfCalendar").val(currentOpenview);
            openAddEditForm();
            calendar.unselect();
            var repeatOnarray = '';
            for (var i = 0; i <= 6; i++) {
                $('#weekday_' + repeatOnarray[i]).prop("checked", false);
            }
        },
        editable: false


    });
    calendar.render();
});

