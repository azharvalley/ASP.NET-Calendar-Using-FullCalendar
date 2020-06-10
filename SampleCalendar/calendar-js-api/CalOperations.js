var Event_Green = "#7bc7c3";
var Appointment_Blue = "#039BE5";
var selectedEvent = null;
$("input[name$='EventType']").click(function () {
    var EventType = $(this).val();
    $('#hddCalendarEventType').val(EventType);
    var hdEventID = $('#hdEventID').val();
    if (hdEventID == "0") {
        if (EventType == 2) {
            $("#Editsrtophead").css("background-color", Event_Green);
            $("#EditpnlStatusbell").css("background-color", Event_Green);
            $("#ThisIsYourTitle").html("Add general event");
            $("#titledivforevent").show();
            $("#divfullday").show();
            $("#EditPanelDiv").show();
            $(".ShowOnlyForEvents").show();
        }
        else {
            $("#Editsrtophead").css("background-color", Event_Green);
            $("#EditpnlStatusbell").css("background-color", Event_Green);
            $("#ThisIsYourTitle").html("Add general event");
            $("#titledivforevent").show();
            $("#divfullday").show();
            $("#EditPanelDiv").show();
            $(".ShowOnlyForEvents").show();
        }
        
    }
    else {
        if (EventType == 2) {
            $(".AppointmentSlot").show();
            $("#titledivforevent").hide();
            $("#divfullday").hide();
            $("#EditPanelDiv").show();


        }
        else if (EventType == 1) {
            $(".AppointmentSlot").hide();
            $("#titledivforevent").show();
            $("#divfullday").show();
            $("#EditPanelDiv").show();

        }
    }

});

$('#txtStart').datetimepicker({
    format: 'MMM DD, YYYY hh:mm a',
    sideBySide: true
    //stepping: 15

});
$('#txtEnd').datetimepicker({
    format: 'MMM DD, YYYY hh:mm a',
    sideBySide: true,
    useCurrent: false
    //stepping: 15,

});
$("#txtStart").on("click", function (e) {

    var ystdate = $('#txtStart').val();
    if (ystdate == null) {
        var thisstdate = moment(selectedEvent.event.start).format('MMM DD, YYYY hh:mm a');
        $('#txtStart').data("DateTimePicker").date(thisstdate);
    }
});
$("#txtStart").on("dp.change", function (e) {
    
    if ($('#txtStart').val().trim() == "") {
        var xENddate, startDateCannotBeNull;
        if (!$('#chkIsFullDay').is(':checked')) {
            xENddate = $('#txtEnd').val();
            startDateCannotBeNull = new Date(xENddate);
            startDateCannotBeNull.setHours(startDateCannotBeNull.getHours() + -1);
            startDateCannotBeNull = moment(startDateCannotBeNull).format('MMM DD, YYYY hh:mm a');
            $('#txtStart').val(startDateCannotBeNull);
            $('#txtStart').data("DateTimePicker").maxDate(xENddate);
        }
        else {
            xENddate = $('#txtEnd').val();
            startDateCannotBeNull = new Date(xENddate);
            startDateCannotBeNull = moment(startDateCannotBeNull).format('MMM DD, YYYY');
            $('#txtStart').val(startDateCannotBeNull);
        }
    }
    else {
        if (!$('#chkIsFullDay').is(':checked')) {
            $('#txtEnd').data("DateTimePicker").minDate(e.date);
            $('#txtEnd').val(e.date.add(1, 'hours').format('MMM DD, YYYY hh:mm a'));
        }
        else {
            $('#txtEnd').val(moment(e.date).format('MMM DD, YYYY'));
            $('#txtEnd').datetimepicker({
                format: 'MMM DD, YYYY'
            });
            $('#txtEnd').data("DateTimePicker").minDate(moment(e.date).format('MMM DD, YYYY'));
        }
    }


});

$("#txtEnd").on("dp.change", function (e) {
    
    var xStartdate = $('#txtStart').val();
    if (!$('#chkIsFullDay').is(':checked')) {
        $('#txtEnd').data("DateTimePicker").minDate(xStartdate);
        //$('#txtStart').data("DateTimePicker").maxDate(e.date);
    }

    if ($('#txtEnd').val().trim() == "") {
        var endDateCannotBeNull;
        if (!$('#chkIsFullDay').is(':checked')) {
            endDateCannotBeNull = new Date(xStartdate);
            endDateCannotBeNull.setHours(endDateCannotBeNull.getHours() + 1);
            endDateCannotBeNull = moment(endDateCannotBeNull).format('MMM DD, YYYY hh:mm a');
            $('#txtEnd').val(endDateCannotBeNull);
            $('#txtEnd').data("DateTimePicker").minDate(xStartdate);
        }
        else {
            endDateCannotBeNull = new Date(xStartdate);
            endDateCannotBeNull = moment(endDateCannotBeNull).format('MMM DD, YYYY');
            $('#txtEnd').val(endDateCannotBeNull);
            $('#txtEnd').data("DateTimePicker").minDate(xStartdate);
        }
    }

});
$("#txtStart").on("blur", function (e) {
    
    if ($('#txtStart').val().trim() == "") {
        var xENddate, startDateCannotBeNull;
        if (!$('#chkIsFullDay').is(':checked')) {
            xENddate = $('#txtEnd').val();
            startDateCannotBeNull = new Date(xENddate);
            startDateCannotBeNull.setHours(startDateCannotBeNull.getHours() + -1);
            startDateCannotBeNull = moment(startDateCannotBeNull).format('MMM DD, YYYY hh:mm a');
            $('#txtStart').val(startDateCannotBeNull);
            $('#txtStart').data("DateTimePicker").maxDate(xENddate);
        }
        else {
            xENddate = $('#txtEnd').val();
            startDateCannotBeNull = new Date(xENddate);
            startDateCannotBeNull = moment(startDateCannotBeNull).format('MMM DD, YYYY');
            $('#txtStart').val(startDateCannotBeNull);
        }
    }

});
$("#txtEnd").on("blur", function (e) {

    
    if ($('#txtEnd').val().trim() == "") {
        var xStartdate, endDateCannotBeNull;
        if (!$('#chkIsFullDay').is(':checked')) {
            xStartdate = $('#txtStart').val();
            endDateCannotBeNull = new Date(xStartdate);
            endDateCannotBeNull.setHours(endDateCannotBeNull.getHours() + 1);
            endDateCannotBeNull = moment(endDateCannotBeNull).format('MMM DD, YYYY hh:mm a');
            $('#txtEnd').val(endDateCannotBeNull);
            $('#txtEnd').data("DateTimePicker").minDate(endDateCannotBeNull);
        }
        else {
            xStartdate = $('#txtStart').val();
            endDateCannotBeNull = new Date(xStartdate);
            endDateCannotBeNull = moment(endDateCannotBeNull).format('MMM DD, YYYY');
            $('#txtEnd').val(endDateCannotBeNull);
            $('#txtEnd').data("DateTimePicker").minDate(endDateCannotBeNull);
        }
    }

});

function openAddEditForm() {
    var calTitle, calStart, calEnd, calAllDay, calDescription, calIsRecurring, calEventStatus, calEventID, calEventTypeId, calBackgroundColor, calRRule;
    
    if (selectedEvent.event != null) {
        calTitle = selectedEvent.event.title != null ? selectedEvent.event.title : '';
        calStart = selectedEvent.event.start != null ? selectedEvent.event.start : '';
        calEnd = selectedEvent.event.end != null ? selectedEvent.event.end : '';
        calAllDay = selectedEvent.event.allDay != null ? selectedEvent.event.allDay : false;
        calEventId = selectedEvent.event.extendedProps.eventID != null ? selectedEvent.event.extendedProps.eventID : 0;
        calDescription = selectedEvent.event.extendedProps.description != null ? selectedEvent.event.extendedProps.description : '';
        calIsRecurring = selectedEvent.event.extendedProps.IsRecurring != null ? selectedEvent.event.extendedProps.IsRecurring : false;
        calEventStatus = selectedEvent.event.extendedProps.EventStatus != null ? selectedEvent.event.extendedProps.EventStatus : '';
        calEventID = selectedEvent.event.extendedProps.eventID != null ? selectedEvent.event.extendedProps.eventID : '';
        calEventTypeId = selectedEvent.event.extendedProps.EventTypeId != null ? selectedEvent.event.extendedProps.EventTypeId : 0;
        calBackgroundColor = selectedEvent.event.backgroundColor != null ? selectedEvent.event.backgroundColor : '';
        calRRule = selectedEvent.event.extendedProps.CRRule != null ? selectedEvent.event.extendedProps.CRRule : '';


    }
    else {
        calTitle = '';
        calStart = selectedEvent.start != null ? selectedEvent.start : '';
        calEnd = selectedEvent.end != null ? selectedEvent.end : '';
        calAllDay = selectedEvent.allDay != null ? selectedEvent.allDay : false;
        calDescription = '';
        calIsRecurring = false;
        calEventStatus = '';
        calEventID = 0;
        calEventTypeId = 0;
        calBackgroundColor = '';
        calRRule = '';
    }


    var EventTypeId = calEventTypeId;


    $('#hddRRULe').val(calRRule);
    $('#drpRepeatCustom').val(calRRule != '' ? "1" : "0");

    $('#hddEventStatus').val(calEventStatus);

    $('#hdEventID').val(calEventID);
    $('#txtSubject').val(calTitle);
    $('#txtDescription').val(calDescription);

    $('#txtStart').val(moment(calStart).format('MMM DD, YYYY hh:mm a'));
    $('#chkIsFullDay').prop("checked", calAllDay || false);
    $('#chkIsFullDay').change();
    //$('#IsRecurring').prop("checked", calIsRecurring || false);
    //$('#IsRecurring').change();
    $('#txtEnd').val(calEnd != null ? moment(calEnd).format('MMM DD, YYYY hh:mm a') : '');

    //FULLDAYOPTION
    var fulldaycount = calEnd.getTime() / 1000 - calStart.getTime() / 1000;
    if (fulldaycount < 86400) {
        //Not a Full day
        $('#divfullday').show();
        $('#chkIsFullDay').prop("checked", false);
        $('#chkIsFullDay').bootstrapToggle('off');

        $('#txtStart').data("DateTimePicker").format("MMM DD, YYYY hh:mm a");
        $('#txtEnd').data("DateTimePicker").format("MMM DD, YYYY hh:mm a");

        $('#txtStart').data("DateTimePicker").sideBySide(true);
        $('#txtEnd').data("DateTimePicker").sideBySide(true);

        $('#txtEnd').data("DateTimePicker").useCurrent(false);

        $('#txtStart').val(moment(calStart).format('MMM DD, YYYY hh:mm a'));
        $('#txtEnd').val(calEnd != null ? moment(calEnd).format('MMM DD, YYYY hh:mm a') : '');

    }
    else {

        $('#divfullday').show();
        $('#chkIsFullDay').prop("checked", true);
        $('#chkIsFullDay').bootstrapToggle('on');
        $('#txtStart').datetimepicker('destroy');
        $('#txtEnd').datetimepicker('destroy');

        $('#txtStart').datetimepicker({
            format: 'MMM DD, YYYY'
        });
        $('#txtEnd').datetimepicker({
            format: 'MMM DD, YYYY'
        });

        $('#txtStart').val(moment(calStart).format('MMM DD, YYYY'));

        var xstartDate = moment(calStart).format('MM-DD-YYYY');
        var xendDate = moment(calEnd).format('MM-DD-YYYY');

        if (xendDate <= xstartDate) {
            $('#txtEnd').val(moment(calStart).format('MMM DD, YYYY'));
        }
        else {
            var EndDateForFullDayEvent = new Date(calEnd);
            EndDateForFullDayEvent.setDate(calEnd.getDate() - 1);
            $('#txtEnd').val(moment(EndDateForFullDayEvent).format('MMM DD, YYYY'));
        }
    }

    $('#chkIsFullDay').change(function () {

        if ($(this).is(':checked')) {

            $('#txtStart').data("DateTimePicker").format("MMM DD, YYYY");
            $('#txtEnd').data("DateTimePicker").format("MMM DD, YYYY");

            $('#txtStart').val(moment(calStart).format('MMM DD, YYYY'));

            var xstartDate = moment(calStart).format('MM-DD-YYYY');
            var xendDate = moment(calEnd).format('MM-DD-YYYY');

            if (xendDate <= xstartDate) {
                $('#txtEnd').val(moment(calStart).format('MMM DD, YYYY'));
            }
            else {
                var EndDateForFullDayEvent = new Date(calEnd);
                EndDateForFullDayEvent.setDate(calEnd.getDate() - 1);
                $('#txtEnd').val(moment(EndDateForFullDayEvent).format('MMM DD, YYYY'));
            }


        }
        else {

            $('#txtStart').data("DateTimePicker").format("MMM DD, YYYY hh:mm a");
            $('#txtEnd').data("DateTimePicker").format("MMM DD, YYYY hh:mm a");

            $('#txtStart').data("DateTimePicker").useCurrent(false);
            $('#txtEnd').data("DateTimePicker").useCurrent(false);


            $('#txtStart').data("DateTimePicker").sideBySide(true);
            $('#txtEnd').data("DateTimePicker").sideBySide(true);

            if (fulldaycount >= 86400) {

                var month = '';
                var day = '';
                var year = '';
                var sh = '';
                var sm = '';
                var eh = '';
                var em = '';

                $('#txtStart').val(moment(calStart).format('MMM DD, YYYY hh:mm a'));
                $('#txtEnd').val(calEnd != null ? moment(calEnd).format('MMM DD, YYYY hh:mm a') : '');

                var GetStartDate = new Date($("#txtStart").val());
                var GetEndDate = new Date($("#txtEnd").val());


                month = GetStartDate.getMonth() + 1;
                day = GetStartDate.getDate();
                year = GetStartDate.getFullYear();

                sh = '8';
                sm = '00';

                eh = '9';
                em = '00';

                var thisStartDate = month + "/" + day + "/" + year + " " + sh + ':' + sm;
                var thisEndDate = month + "/" + day + "/" + year + " " + eh + ':' + em;

                $('#txtStart').val(moment(thisStartDate).format('MMM DD, YYYY hh:mm a'));
                $('#txtEnd').val(moment(thisEndDate).format('MMM DD, YYYY hh:mm a'));


            }
            else {
                $('#txtStart').val(moment(calStart).format('MMM DD, YYYY hh:mm a'));
                $('#txtEnd').val(calEnd != null ? moment(calEnd).format('MMM DD, YYYY hh:mm a') : '');
            }
        }
    });
    //FULLDAYOPTIONEND

    $('#thiseventonly_1').prop('checked', false);
    $('#thisplusfutureevents_2').prop('checked', false);
    $('#allevents_3').prop('checked', false);
    $("#hddChangeThisAndAllFutureEvents").val("0");

    if (calRRule != null && calRRule != "") {
        $("#hdAddNewOptions").val("1");
        PopulateRRulePopup();
        $("#hdAddNewOptions").val("0");
    }

    if (calIsRecurring == true) {
        $("#UpdateThisAndAllFutureEvents").show();
    }
    else {
        $("#UpdateThisAndAllFutureEvents").hide();
    }



    if (calEventTypeId != null) {
        var radiorepeatOnarray = calEventTypeId;
        $('#EventType_' + radiorepeatOnarray).prop("checked", true);
    }


    EventTypeId = calEventTypeId;
    if (EventTypeId == 1) {
        $(".AppointmentSlot").hide();
    }
    else if (EventTypeId == 2) {
        $(".AppointmentSlot").show();
    }
    
    var hdEventID = $('#hdEventID').val();
    if (hdEventID == "0") {

        $("#DivRadioEventType").show();
        $('#EventType_1').prop('checked', false);
        $('#EventType_2').prop('checked', false);

        $("#EventType_1").show();
        $("#lbl_EventType_1").show();
        $("#EventType_2").show();
        $("#lbl_EventType_2").show();
        $("#EditPanelDiv").hide();
    }
    else {
        if (EventTypeId == 1) {
            $('#ddThemeColor').val(calBackgroundColor);
            $("#ddThemeColor").next().find("ul").find("li").find(".selected").removeClass("selected");
            $("#ddThemeColor").next().find("ul").find("li").find("a[data-color='" + calBackgroundColor + "']").addClass("selected");
            $("#ddThemeColor").next().find(".btn-colorselector").css("background-color", calBackgroundColor);

            $("#DivRadioEventType").hide();
            $("#EventType_2").hide();
            $("#lbl_EventType_2").hide();
            $("#EventType_1").show();
            $("#lbl_EventType_1").show();
            $("#Editsrtophead").css("background-color", calBackgroundColor);
            $("#EditpnlStatusbell").css("background-color", calBackgroundColor);
            $("#titledivforevent").show();
            $("#divfullday").show();
            $('#ThisIsYourTitle').html(selectedEvent.event.title);

            $(".ShowOnlyForEvents").show();

        }
        else if (EventTypeId == 2) {
            $('#ddThemeColor').val(calBackgroundColor);
            $("#ddThemeColor").next().find("ul").find("li").find(".selected").removeClass("selected");
            $("#ddThemeColor").next().find("ul").find("li").find("a[data-color='" + calBackgroundColor + "']").addClass("selected");
            $("#ddThemeColor").next().find(".btn-colorselector").css("background-color", calBackgroundColor);

            $("#DivRadioEventType").hide();
            $("#EventType_1").hide();
            $("#lbl_EventType_1").hide();
            $("#EventType_2").show();
            $("#lbl_EventType_2").show();
            $("#Editsrtophead").css("background-color", calBackgroundColor);
            $("#EditpnlStatusbell").css("background-color", calBackgroundColor);
            $("#titledivforevent").hide();
            $("#divfullday").hide();
            $('#ThisIsYourTitle').html('Appointment with: ' + calTitle);


        }
        $("#EditPanelDiv").show();
    }

    $('#myModal').modal('hide');
    $('#myModalSave').modal();

}

$('#IsRecurring').change(function () {

    if ($(this).is(':checked')) {
        $('#divRecurringOption').show();
        $('#divRepeatEndDate').show();

        var xEdate = new Date($("#txtEnd").val());
        var dEndTime = moment(xEdate).format('hh:mm a');

        var xSdate = new Date($("#txtStart").val());
        var dsdxSdate = moment(xSdate).format('MM-DD-YYYY');
        var timeString = '23' + ':' + '59' + ':00';
        var xSdate = new Date(dsdxSdate + ' ' + timeString);
        xSdate = moment(xSdate).format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').data("DateTimePicker").maxDate(xSdate);

        var xxSdate = new Date(dsdxSdate + ' ' + dEndTime);
        xxSdate = moment(xxSdate).format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').val(xxSdate);

    }
    else {
        $('#divRecurringOption').hide();
        $('#divRepeatEndDate').hide();

        var xxxSdate = new Date();
        xxxSdate = moment(xxxSdate).add(1, 'year').format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').data("DateTimePicker").maxDate(xxxSdate);

    }
});

$('#btnSave').click(function () {

    //var Repeaton = $("input[name='Repeaton']:checked").map(function () { return this.value; }).get().join(',');
    var Repeaton = "";
    var EventTypeId = $('input[name=EventType]:checked').val();
    var EventStatus = $('#hddEventStatus').val();

    var RRule = $("#drpRepeatCustom option:selected").val() == "0" ? "" : $("#hddRRULe").val();
    var RadioEndsOn = $("input[name='RadioEndsOn']:checked").val();

    var AllOccurances = "";
    var xChangeThisAndAllFutureEvents = $('#hddChangeThisAndAllFutureEvents').val();
    if ($("#drpRepeatCustom option:selected").val() != "" && $("#drpRepeatCustom option:selected").val() != "0") {
        var BeginingDate = new Date($('#txtStart').val().trim());
        if (xChangeThisAndAllFutureEvents !== null && xChangeThisAndAllFutureEvents !== undefined && xChangeThisAndAllFutureEvents === "1") {
            //Only this event add 1 day for start date so that correct AllOccurances Dates is fetched.
            BeginingDate = moment(BeginingDate).add(1, 'day');
        }
        //var xurule = "DTSTART:" + moment($('#txtStart').val().trim()).format("YYYYMMDDTHHmmss");
        var xurule = "DTSTART:" + moment(BeginingDate).format("YYYYMMDDTHHmmss");
        xurule = xurule + "\n" + RRule;
        var xmyrule = new rrule.rrulestr(xurule);
        var arryoflist = xmyrule.all();
        for (i = 0; i < arryoflist.length; i++) {
            if (i == 0) {
                AllOccurances = moment(arryoflist[i]).format("MM-DD-YYYY hh:mm:ss");
            }
            else {
                AllOccurances = AllOccurances + ";" + moment(arryoflist[i]).format("MM-DD-YYYY hh:mm:ss");
            }

        }
    }

    var EndDateForFullDayEvent;
    if ($('#chkIsFullDay').is(':checked')) {

        EndDateForFullDayEvent = new Date($("#txtEnd").val());
        EndDateForFullDayEvent.setDate(EndDateForFullDayEvent.getDate() + 1);
        EndDateForFullDayEvent = moment(EndDateForFullDayEvent).format("MMM DD, YYYY");
    }

    if (!validateCalendarEventForm()) {
        event.preventDefault();
    }
    else {
        var data = {
            EventID: $('#hdEventID').val(),            
            Subject: $('#txtSubject').val().trim(),
            Start: $('#txtStart').val().trim(),
            End: $('#chkIsFullDay').is(':checked') ? EndDateForFullDayEvent : $('#txtEnd').val().trim(),
            Description: $('#txtDescription').val(),
            IsFullDay: $('#chkIsFullDay').is(':checked'),
            IsRecurring: $("#drpRepeatCustom option:selected").val() == "0" ? false : true,
            RRule: RRule,
            //RepeatEndDate: $('#IsRecurring').is(':checked') ? $('#txtRepeatEndDate').val().trim() : null,
            RepeatEndDate: $("#drpRepeatCustom option:selected").val() == "0" ? null : RadioEndsOn == "Until" ? $('#crUNTIL').val().trim() : null,            
            EventTypeId: EventTypeId,
            EventStatus: EventStatus,
            ChangeThisAndAllFutureEvents: $('#hddChangeThisAndAllFutureEvents').val(),           
            AllDateOccurences: $("#drpRepeatCustom option:selected").val() == "0" ? "" : AllOccurances
        };
        SaveEvent(data);
    }


});

function SaveEvent(data) {
    var CurrOpenedViewOfCalendar = $("#CurrentOpenViewOfCalendar").val();

    $.ajax({
        type: "POST",
        url: '/calendar/SaveEvent',
        data: data,
        success: function (data) {
            if (data.status) {
                calendar.refetchEvents();
                $('#myModalSave').modal('hide');
            }
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            errorMessage = errorMessage + ' : Please refresh the page and try again!';
            $("#btnSave").prop("disabled", false);
            $('#btnSave').val('Save');
            alert('Error - ' + errorMessage);
        },
        beforeSend: function (data) {
            $('#loaderpopup').show();
        },
        complete: function () {
            $('#loaderpopup').hide();
        }
    });
}


function validateCalendarEventForm() {
    
    var checkAnchorTag = /[^<->!*]+$/;
    var CalendarEventType = $('#hddCalendarEventType').val();
    var error = 0;
    if (CalendarEventType == 1) {
        var txtSubject = $('#txtSubject').val();

        if ((txtSubject != '') && checkAnchorTag.test(txtSubject)) {
            $('#errortxtSubject').addClass('hidden');
        }
        else {
            error += 1;
            $('#errortxtSubject').text('Please add event title or heading');
            $('#errortxtSubject').removeClass('hidden');
        }
    }   

    if ($('#txtStart').val().trim() != "") {
        $('#errortxtStart').addClass('hidden');
    }
    else {
        error += 1;
        $('#errortxtStart').text('Please select start date');
        $('#errortxtStart').removeClass('hidden');
    }

    if ($('#txtEnd').val().trim() == "") {
        error += 1;
        $('#errortxtEnd').text('Please select end date');
        $('#errortxtEnd').removeClass('hidden');
    }
    else {
        var startDate = moment($('#txtStart').val(), "MMM DD, YYYY hh:mm a").toDate();
        var endDate = moment($('#txtEnd').val(), "MMM DD, YYYY hh:mm a").toDate();
        //If both date is valid
        if (Object.prototype.toString.call(startDate) === "[object Date]") {
            // it is a date
            if (isNaN(startDate.getTime())) { 
                // date is not valid
                error += 1;
                $('#errortxtEnd').text('Please select valid start date and time');
                $('#errortxtEnd').removeClass('hidden');
            } else {
                // date is valid
            }
        } else {
            // not a date
            error += 1;
            $('#errortxtEnd').text('Please select valid end start and time');
            $('#errortxtEnd').removeClass('hidden');
        }

        if (Object.prototype.toString.call(endDate) === "[object Date]") {
            // it is a date
            if (isNaN(endDate.getTime())) {  
                // date is not valid
                error += 1;
                $('#errortxtEnd').text('Please select valid end date and time');
                $('#errortxtEnd').removeClass('hidden');
            } else {
                // date is valid
            }
        } else {
            // not a date
            error += 1;
            $('#errortxtEnd').text('Please select valid end date and time');
            $('#errortxtEnd').removeClass('hidden');
        }
        if (error == 0) {
            if ($('#chkIsFullDay').is(':checked')) {
                if (startDate > endDate) {
                    error += 1;
                    $('#errortxtEnd').text('End date cannot be less start date!');
                    $('#errortxtEnd').removeClass('hidden');
                }
                else {
                    $('#errortxtEnd').addClass('hidden');
                }
            }
            else {
                if (startDate >= endDate) {
                    error += 1;
                    $('#errortxtEnd').text('End time cannot be less than or equal to start time!');
                    $('#errortxtEnd').removeClass('hidden');
                }
                else {
                    $('#errortxtEnd').addClass('hidden');
                }
            }

        }
    }

    var dRepeatEndDate = $('#txtRepeatEndDate').val();
 
    var iseventIdNew = $('#hdEventID').val();
    if (iseventIdNew != "0" && selectedEvent.event.extendedProps.IsRecurring != null && selectedEvent.event.extendedProps.IsRecurring != '') {
        if (!$("input:radio[name='ChangeThisAndAllFutureEvents']").is(":checked")) {
            error += 1;
            $('#errorthiseventorallfutureevents').text('Editing recurring event? Please select one!');
            $('#errorthiseventorallfutureevents').removeClass('hidden');
            $('#recurringeventsedit').css("border", "1px solid #e83737");
        }
        else {
            $('#errorthiseventorallfutureevents').addClass('hidden');
            $('#recurringeventsedit').css("border", "0px solid #e83737");
        }
    }
    if (error > 0) {
        return false;
    }
    return true;

}

$('#btnEdit').click(function () {  
    openAddEditForm();
});


$('#drpEventStatus').change(function () {
    
    var EventStatusText = $("#drpEventStatus option:selected").text();
    var EventStatusValue = $("#drpEventStatus option:selected").val();
    var EventIDVal = $('#hiddenEventID').val();

    var startDateThisSession = $("#vestartdate").html();
    var endDateThisSession = $("#veenddate").html();
    var IsRecurring = $("#btnDelete").attr("data-isrecurring");

    if (IsRecurring == "0") {
        var dataObj = {
            EventID: EventIDVal,
            EventStatus: EventStatusValue,
            IsRecurring: IsRecurring,
            StartDateThisSession: startDateThisSession,
            EndDateThisSession: endDateThisSession
        };
        UpdateEventStatus(dataObj);
    }


});

function UpdateEventStatus(dataObj) {
    
    $.ajax({
        type: "POST",
        url: '/calendar/UpdateEventStatus',
        data: dataObj,
        success: function (data) {
            if (data.status) {
                calendar.refetchEvents();
                $('#myModal').modal('hide');
            }
        },
        error: function () {
            alert('Unable to change status!');
        }
    });
}

$('#btnDelete').click(function () {
    
    $('#delthisvent_1').prop('checked', false);
    $('#delthisplusfutureevent_2').prop('checked', false);
    $('#delallevent_3').prop('checked', false);
    $('#hddDeleteThisAndAllFutureEvents').val("0");
    var isrecurring = $("#btnDelete").attr("data-isrecurring");
    if (isrecurring == 0) {
        if (selectedEvent.event != null && confirm('Are you sure you want to delete?')) {
            DeleteThisEventFromCalendar($('#hddDeleteThisAndAllFutureEvents').val());
        }
    }

});

function DeleteThisEventFromCalendar(DeleteThisAndAllFutureEvents) {
    
    $.ajax({
        type: "POST",
        url: '/calendar/DeleteEventByEventId',
        data: {
            'eventID': selectedEvent.event.extendedProps.eventID,
            'DeleteThisAndAllFutureEvents': DeleteThisAndAllFutureEvents,
            'thisEventStartDate': moment(selectedEvent.event.start).format("MM-DD-YYYY HH:mm"),
            'thisEventEndDate': moment(selectedEvent.event.end).format("MM-DD-YYYY HH:mm")
        },
        success: function (data) {
            if (data.status) {
                calendar.refetchEvents();
                $('#myModal').modal('hide');
                $('#mydeleteconfirm').modal('hide');
            }
        },
        error: function () {
            alert('Unable to delete');
        }
    });
}