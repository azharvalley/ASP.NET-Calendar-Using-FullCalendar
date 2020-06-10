if ($("#hddRRULe").val() != null && $("#hddRRULe").val() != "") {
    $("#hdAddNewOptions").val("1");
    PopulateRRulePopup();
    $("#hdAddNewOptions").val("0");
}

function PopulateRRulePopup() {
    
    var rvalue = $("#hddRRULe").val();
    var temprvalue = rvalue.split(";");
    var objVariables = {};
    for (var x = 0; x < temprvalue.length; x++) {
        var splitted = temprvalue[x].split("=");
        objVariables[splitted[0]] = splitted[1];
    }
    var FREQ = objVariables["FREQ"];
    var BYDAY = objVariables["BYDAY"];
    var INTERVAL = objVariables["INTERVAL"];
    var COUNT = objVariables["COUNT"];
    var UNTIL = objVariables["UNTIL"];
    $("#crFREQ").val(FREQ);
    $("#crINTERVAL").val(INTERVAL);
    $("#crCOUNT").val(COUNT);
    if (COUNT != null && COUNT != "") {
        $("input[name=RadioEndsOn][value=After]").prop('checked', true);
    }
    else if (UNTIL != null && UNTIL != "") {
        $("input[name=RadioEndsOn][value=Until]").prop('checked', true);
        var UDate = new Date(moment(UNTIL).format('MMM, DD YYYY'));
        UDate = moment(UDate).format("MMM, DD YYYY");
        $("#crUNTIL").val(UDate);
    }
    else {
        $("input[name=RadioEndsOn][value=Never]").prop('checked', true);
    }

    if (UNTIL != null && UNTIL != "") {

    }
    else {
        var cthisStart = new Date($("#txtStart").val());
        cthisStart = cthisStart.getDay();
        var thisdRepeatEndDate = new Date($("#txtEnd").val());
        thisdRepeatEndDate.setDate(thisdRepeatEndDate.getDate() + 90);
        $('#crUNTIL').val(moment(thisdRepeatEndDate).format("MMM DD, YYYY"));
    }
    if (COUNT != null && COUNT != "") {

    }
    else {
        $("#crCOUNT").val("13");
    }


    var temprepeatOnCheckbox = "0,1,2,3,4,5,6";
    var temprepeatOnarray = temprepeatOnCheckbox.split(",");
    $.each(temprepeatOnarray, function (i) {
        $('#Reccweekday_' + temprepeatOnarray[i]).prop("checked", false);
    });
    
    if (FREQ == "DAILY") {
        ForFREQDaily();
        $("#pdivWeeklyRecurringOption").hide();
        $("#pdivMonthlyRecurringOption").hide();
        $("#lblrepeatinterval").html("day(s)");
    }
    else if (FREQ == "WEEKLY") {
        var tmpBYDAY = objVariables["BYDAY"]
        tmpBYDAY = tmpBYDAY.replace("SU", "0").replace("MO", "1").replace("TU", "2").replace("WE", "3").replace("TH", "4").replace("FR", "5").replace("SA", "6");
        var arrayBYDAY = tmpBYDAY.split(",");
        $.each(arrayBYDAY, function (i) {
            $('#Reccweekday_' + arrayBYDAY[i]).prop("checked", true);
        });
        ForFREQWeekly();
        $("#pdivWeeklyRecurringOption").show();
        $("#pdivMonthlyRecurringOption").hide();
        $("#lblrepeatinterval").html("week(s)");
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
        $("#pdivWeeklyRecurringOption").hide();
        $("#pdivMonthlyRecurringOption").show();
        $("#lblrepeatinterval").html("month(s)");
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
        $("#pdivWeeklyRecurringOption").hide();
        $("#pdivMonthlyRecurringOption").hide();
        $("#lblrepeatinterval").html("year(s)");
    }
}

$("#drpRepeatCustom").change(function () {
    
    var drpRep = $("#drpRepeatCustom option:selected").val();
    var drpRepText = $("#drpRepeatCustom option:selected").text();
    if (drpRep == "1") {

        var xEdate = new Date($("#txtEnd").val());
        var dEndTime = moment(xEdate).format('hh:mm a');

        var xSdate = new Date($("#txtStart").val());
        var dsdxSdate = moment(xSdate).format('MM/DD/YYYY');
        var timeString = '23' + ':' + '59' + ':00';
        var xSdate = new Date(dsdxSdate + ' ' + timeString);
        xSdate = moment(xSdate).format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').data("DateTimePicker").maxDate(xSdate);

        var xxSdate = new Date(dsdxSdate + ' ' + dEndTime);
        xxSdate = moment(xxSdate).format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').val(xxSdate);

        var datarrule = $("#drpRepeatCustom option:selected").attr("data-rrule");

        var hddRRULe = $("#hddRRULe").val() == null ? datarrule : $("#hddRRULe").val() == "" ? datarrule : $("#hddRRULe").val();
        if (hddRRULe != null && hddRRULe != "") {
            $('#mycustomRecurringModal').modal();
            //var rvalue = $("#drpRepeatCustom option:selected").attr("data-rvalue");
            //var rvalue = $("#hddRRULe").val();
            var rvalue = hddRRULe;
            var temprvalue = rvalue.split(";");
            var objVariables = {};
            for (var x = 0; x < temprvalue.length; x++) {
                var splitted = temprvalue[x].split("=");
                objVariables[splitted[0]] = splitted[1];
            }
            console.log(objVariables);
            console.log(objVariables["FREQ"]);
            console.log(objVariables["BYDAY"]);
            console.log(objVariables["INTERVAL"]);
            console.log(objVariables["COUNT"]);

            var FREQ = objVariables["FREQ"];
            var BYDAY = objVariables["BYDAY"];
            var INTERVAL = objVariables["INTERVAL"];
            var COUNT = objVariables["COUNT"];
            var UNTIL = objVariables["UNTIL"];
            $("#crFREQ").val(FREQ);
            $("#crINTERVAL").val(INTERVAL);
            $("#crCOUNT").val(COUNT);
            if (COUNT != null && COUNT != "") {
                $("input[name=RadioEndsOn][value=After]").prop('checked', true);
            }
            else if (UNTIL != null && UNTIL != "") {
                $("input[name=RadioEndsOn][value=Until]").prop('checked', true);
                ///calEnd != null ? moment(UNTIL).format('MMM, DD YYYY') : ''
                var UDate = new Date(moment(UNTIL).format('MMM, DD YYYY'));
                UDate = moment(UDate).format("MMM, DD YYYY");
                $("#crUNTIL").val(UDate);
            }
            else {
                $("input[name=RadioEndsOn][value=Never]").prop('checked', true);
            }

            if (UNTIL != null && UNTIL != "") {

            }
            else {
                var cthisStart = new Date($("#txtStart").val());
                cthisStart = cthisStart.getDay();
                var thisdRepeatEndDate = new Date($("#txtEnd").val());
                thisdRepeatEndDate.setDate(thisdRepeatEndDate.getDate() + 90);
                $('#crUNTIL').val(moment(thisdRepeatEndDate).format("MMM DD, YYYY"));
            }
            if (COUNT != null && COUNT != "") {

            }
            else {
                $("#crCOUNT").val("13");
            }


            var temprepeatOnCheckbox = "0,1,2,3,4,5,6";
            var temprepeatOnarray = temprepeatOnCheckbox.split(",");
            $.each(temprepeatOnarray, function (i) {
                $('#Reccweekday_' + temprepeatOnarray[i]).prop("checked", false);
            });

            //var FREQ = $("#crFREQ option:selected").val();
            if (FREQ == "DAILY") {
                ForFREQDaily();
                $("#pdivWeeklyRecurringOption").hide();
                $("#pdivMonthlyRecurringOption").hide();
                $("#lblrepeatinterval").html("day(s)");
            }
            else if (FREQ == "WEEKLY") {
                var tmpBYDAY = objVariables["BYDAY"]
                tmpBYDAY = tmpBYDAY.replace("SU", "0").replace("MO", "1").replace("TU", "2").replace("WE", "3").replace("TH", "4").replace("FR", "5").replace("SA", "6");
                var arrayBYDAY = tmpBYDAY.split(",");
                $.each(arrayBYDAY, function (i) {
                    $('#Reccweekday_' + arrayBYDAY[i]).prop("checked", true);
                });
                ForFREQWeekly();
                $("#pdivWeeklyRecurringOption").show();
                $("#pdivMonthlyRecurringOption").hide();
                $("#lblrepeatinterval").html("week(s)");
            }
            else if (FREQ == "MONTHLY") {
                ForFREQMonthly();
                $("#pdivWeeklyRecurringOption").hide();
                $("#pdivMonthlyRecurringOption").show();
                $("#lblrepeatinterval").html("month(s)");
            }
            else if (FREQ == "YEARLY") {
                ForFREQYearly();
                $("#pdivWeeklyRecurringOption").hide();
                $("#pdivMonthlyRecurringOption").hide();
                $("#lblrepeatinterval").html("year(s)");
            }
        }
        else {

            $('#mycustomRecurringModal').modal();

            var cthisStart = new Date($("#txtStart").val());
            cthisStart = cthisStart.getDay();
            var thisdRepeatEndDate = new Date($("#txtEnd").val());
            thisdRepeatEndDate.setDate(thisdRepeatEndDate.getDate() + 90);
            $('#crUNTIL').val(moment(thisdRepeatEndDate).format("MMM DD, YYYY"));
            var temprepeatOnCheckbox = "0,1,2,3,4,5,6";
            var temprepeatOnarray = temprepeatOnCheckbox.split(",");
            $.each(temprepeatOnarray, function (i) {
                $('#Reccweekday_' + temprepeatOnarray[i]).prop("checked", false);
            });
            $('#Reccweekday_' + cthisStart).prop("checked", true);
            var FREQ = $("#crFREQ option:selected").val();
            if (FREQ == "DAILY") {
                ForFREQDaily();
                $("#pdivWeeklyRecurringOption").hide();
                $("#pdivMonthlyRecurringOption").hide();
                $("#lblrepeatinterval").html("day(s)");
            }
            else if (FREQ == "WEEKLY") {
                ForFREQWeekly();
                $("#pdivWeeklyRecurringOption").show();
                $("#pdivMonthlyRecurringOption").hide();
                $("#lblrepeatinterval").html("week(s)");
            }
            else if (FREQ == "MONTHLY") {
                ForFREQMonthly();
                $("#pdivWeeklyRecurringOption").hide();
                $("#pdivMonthlyRecurringOption").show();
                $("#lblrepeatinterval").html("month(s)");
            }
            else if (FREQ == "YEARLY") {
                ForFREQYearly();
                $("#pdivWeeklyRecurringOption").hide();
                $("#pdivMonthlyRecurringOption").hide();
                $("#lblrepeatinterval").html("year(s)");
            }
        }
    }
    else if (drpRep == "0") {
        $("#hddRRULe").val('');
        $("#CustomRRULEDescription").val('');
        var xxxSdate = new Date();
        xxxSdate = moment(xxxSdate).add(1, 'year').format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').data("DateTimePicker").maxDate(xxxSdate);
        
    }
    else {

        var AddOneYearFromStart = new Date($("#txtStart").val());
        AddOneYearFromStart.setDate(AddOneYearFromStart.getDate() + 365);
        AddOneYearFromStart = moment(AddOneYearFromStart).format("YYYYMMDDT235900");
        var rruleEndAfterOneyear = "UNTIL=" + AddOneYearFromStart;
        drpRep = drpRep + ";" + rruleEndAfterOneyear;

        $("#hddRRULe").val(drpRep);
        $("#CustomRRULEDescription").val(drpRepText);
        var xEdate = new Date($("#txtEnd").val());
        var dEndTime = moment(xEdate).format('hh:mm a');

        var xSdate = new Date($("#txtStart").val());
        var dsdxSdate = moment(xSdate).format('MM/DD/YYYY');
        var timeString = '23' + ':' + '59' + ':00';
        var xSdate = new Date(dsdxSdate + ' ' + timeString);
        xSdate = moment(xSdate).format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').data("DateTimePicker").maxDate(xSdate);

        var xxSdate = new Date(dsdxSdate + ' ' + dEndTime);
        xxSdate = moment(xxSdate).format('MMM DD, YYYY hh:mm a');
        $('#txtEnd').val(xxSdate);
    }
    
});



loadCustomRecurrence();
function loadCustomRecurrence() {
    $("#crFREQ").val("WEEKLY");
    var crFREQ = $("#crFREQ").val();
    var crINTERVAL = $("#crINTERVAL").val();
    var rruleFREQ = "FREQ=" + crFREQ;
    var rruleINTERVAL = "INTERVAL=" + crINTERVAL;
    var RRULE = rruleFREQ + ";" + rruleINTERVAL;
    $("#txtRRULE").val(RRULE);

    $('#crUNTIL').prop('disabled', true);
    $('#crCOUNT').prop('disabled', true);
    $('#crBYMONTHDAY').prop('disabled', true);
    $('#crBYSETPOS').prop('disabled', true);
    $('#crBYDAY').prop('disabled', true);
}


$("#crFREQ").change(function () {
    
    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
        $("#pdivWeeklyRecurringOption").hide();
        $("#pdivMonthlyRecurringOption").hide();
        $("#lblrepeatinterval").html("day(s)");
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
        $("#pdivWeeklyRecurringOption").show();
        $("#pdivMonthlyRecurringOption").hide();
        $("#lblrepeatinterval").html("week(s)");
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
        $("#pdivWeeklyRecurringOption").hide();
        $("#pdivMonthlyRecurringOption").show();
        $("#lblrepeatinterval").html("month(s)");
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
        $("#pdivWeeklyRecurringOption").hide();
        $("#pdivMonthlyRecurringOption").hide();
        $("#lblrepeatinterval").html("year(s)");
    }
});

$("#crINTERVAL").blur(function () {

    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
    }
});

$('input[name="crwBYDAY"]').click(function () {
    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
    }
});

$('input[name="RadioEndsOn"]').click(function () {
    
    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
    }
});

$("#crCOUNT").blur(function () {
    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
    }
});

$('#crUNTIL').datetimepicker({
    format: 'MMM DD, YYYY',
    maxDate: moment().add(2, 'years'), // 30 days from the current day
});
$("#crUNTIL").on("click", function (e) {
    
    var cthisStart = new Date($("#txtStart").val());
    cthisStart = moment(cthisStart).format('MMM DD, YYYY');
    $('#crUNTIL').data("DateTimePicker").minDate(cthisStart);

    

});

$("#crUNTIL").on("dp.change", function (e) {
    
    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
    }
});

$(".crRDropDpwndPO").change(function () {
    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
    }
});

$('input[name="crRadioMonthlyRecOn"]').click(function () {
    
    var FREQ = $("#crFREQ option:selected").val();
    if (FREQ == "DAILY") {
        ForFREQDaily();
    }
    else if (FREQ == "WEEKLY") {
        ForFREQWeekly();
    }
    else if (FREQ == "MONTHLY") {
        ForFREQMonthly();
    }
    else if (FREQ == "YEARLY") {
        ForFREQYearly();
    }
});

function ForFREQDaily() {
    if ($("#crINTERVAL").val() == "") {
        $("#crINTERVAL").val("1");
    }
    if ($("#crCOUNT").val() == "" || $("#crCOUNT").val() == "0") {
        $("#crCOUNT").val("13");
    }
    if ($("#crUNTIL").val() == "") {
        var tmpcthisStart = new Date($("#txtStart").val());
        tmpcthisStart = tmpcthisStart.getDay();
        var tmpthisdRepeatEndDate = new Date($("#txtEnd").val());
        tmpthisdRepeatEndDate.setDate(tmpthisdRepeatEndDate.getDate() + 90);
        $('#crUNTIL').val(moment(tmpthisdRepeatEndDate).format("MMM DD, YYYY"));
    }
    var lblRRULEWord = "";
    var RRULE = "";
    var rruleFREQ = "FREQ=" + $("#crFREQ option:selected").val();
    var rruleINTERVAL = "INTERVAL=" + $("#crINTERVAL").val();
    
    var RadioEndsOn = $("input[name='RadioEndsOn']:checked").val();
    if (RadioEndsOn == "Never") {
        RRULE = rruleFREQ + ";" + rruleINTERVAL;

        var AddOneYearFromStart = new Date($("#txtStart").val());
        AddOneYearFromStart.setDate(AddOneYearFromStart.getDate() + 365);
        AddOneYearFromStart = moment(AddOneYearFromStart).format("YYYYMMDDT235900");
        var rruleEndAfterOneyear = "UNTIL=" + AddOneYearFromStart;
        RRULE = RRULE + ";" + rruleEndAfterOneyear;
        
        $('#crUNTIL').prop('disabled', true);
        $('#crCOUNT').prop('disabled', true);  
    }
    else if (RadioEndsOn == "Until") {
        var EndDate = new Date($("#crUNTIL").val());
        EndDate = moment(EndDate).format("YYYYMMDDT235900");
        var rruleUNTIL = "UNTIL=" + EndDate;
        RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleUNTIL;
        
        $('#crUNTIL').prop('disabled', false);
        $('#crCOUNT').prop('disabled', true);
    }
    else if (RadioEndsOn == "After") {
        var rruleCOUNT = "COUNT=" + $("#crCOUNT").val();
        RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleCOUNT;
        
        $('#crCOUNT').prop('disabled', false);
        $('#crUNTIL').prop('disabled', true);
    }


    var xmyStartDate = new Date($("#txtStart").val());
    var xurule = "DTSTART:" + moment(xmyStartDate).format("YYYYMMDDTHHmmss");
    xurule = xurule + "\n" + RRULE;
    var xmyrule = new rrule.rrulestr(xurule);
    lblRRULEWord = xmyrule.toText();

    $("#txtRRULE").val(RRULE);
    $("#lblRRULEWord").val(lblRRULEWord);
    $("#CustomRRULEDescription").val(lblRRULEWord);
    
    
    if ($("#hdAddNewOptions").val() == "1") {
        AddNewOptionToCustomRRule(RRULE, lblRRULEWord);
    }
    else {
        var existsdrpRepeatCustomValue = false;
        $('#drpRepeatCustom option').each(function () {
            if (this.value == RRULE) {
                existsdrpRepeatCustomValue = true;
            }
        });
        if (existsdrpRepeatCustomValue == true) {
            $("#drpRepeatCustom").val(RRULE);
        }
        else {
            $("#hddRRULe").val('');
            $("#CustomRRULEDescription").val('');
            var xxxSdate = new Date();
            xxxSdate = moment(xxxSdate).add(1, 'year').format('MMM DD, YYYY hh:mm a');
            $('#txtEnd').data("DateTimePicker").maxDate(xxxSdate);
        }
    }
}

function ForFREQWeekly() {
    
    if ($("#crINTERVAL").val() == "") {
        $("#crINTERVAL").val("1");
    }
    if ($("#crCOUNT").val() == "" || $("#crCOUNT").val() == "0") {
        $("#crCOUNT").val("13");
    }
    if ($("#crUNTIL").val() == "") {
        var tmpcthisStart = new Date($("#txtStart").val());
        tmpcthisStart = tmpcthisStart.getDay();
        var tmpthisdRepeatEndDate = new Date($("#txtEnd").val());
        tmpthisdRepeatEndDate.setDate(tmpthisdRepeatEndDate.getDate() + 90);
        $('#crUNTIL').val(moment(tmpthisdRepeatEndDate).format("MMM DD, YYYY"));
    }
    var lblRRULEWord = "";
    var RRULE = "";
    var rruleFREQ = "FREQ=" + $("#crFREQ option:selected").val();
    var rruleINTERVAL = "INTERVAL=" + $("#crINTERVAL").val();
    var crwBYDAY = $("input[name='crwBYDAY']:checked").map(function () { return this.value; }).get().join(',');
    if (crwBYDAY == "") {
        var thisStartDay = new Date($("#txtStart").val());
        thisStartDay = thisStartDay.getDay();
        var temprepeatOnCheckbox = "0,1,2,3,4,5,6";
        var temprepeatOnarray = temprepeatOnCheckbox.split(",");
        $.each(temprepeatOnarray, function (i) {
            $('#Reccweekday_' + temprepeatOnarray[i]).prop("checked", false);
        });
        $('#Reccweekday_' + thisStartDay).prop("checked", true);
        var crwBYDAY = $("input[name='crwBYDAY']:checked").map(function () { return this.value; }).get().join(',');
    }
    var rruleBYDAY = "BYDAY=" + crwBYDAY;
    

    var RadioEndsOn = $("input[name='RadioEndsOn']:checked").val();
    if (RadioEndsOn == "Never") {
        RRULE = rruleFREQ + ";" + rruleBYDAY + ";" + rruleINTERVAL;

        var AddOneYearFromStart = new Date($("#txtStart").val());
        AddOneYearFromStart.setDate(AddOneYearFromStart.getDate() + 365);
        AddOneYearFromStart = moment(AddOneYearFromStart).format("YYYYMMDDT235900");
        var rruleEndAfterOneyear = "UNTIL=" + AddOneYearFromStart;
        RRULE = RRULE + ";" + rruleEndAfterOneyear;

        $("#txtRRULE").val(RRULE);
        $('#crUNTIL').prop('disabled', true);
        $('#crCOUNT').prop('disabled', true);

    }
    else if (RadioEndsOn == "Until") {
        var EndDate = new Date($("#crUNTIL").val());
        EndDate = moment(EndDate).format("YYYYMMDDT235900");
        var rruleUNTIL = "UNTIL=" + EndDate;
        RRULE = rruleFREQ + ";" + rruleBYDAY + ";" + rruleINTERVAL + ";" + rruleUNTIL;
        $("#txtRRULE").val(RRULE);
        $('#crUNTIL').prop('disabled', false);
        $('#crCOUNT').prop('disabled', true);
    }
    else if (RadioEndsOn == "After") {
        var rruleCOUNT = "COUNT=" + $("#crCOUNT").val();
        RRULE = rruleFREQ + ";" + rruleBYDAY + ";" + rruleINTERVAL + ";" + rruleCOUNT;
        $("#txtRRULE").val(RRULE);
        $('#crCOUNT').prop('disabled', false);
        $('#crUNTIL').prop('disabled', true);
    }


    var xmyStartDate = new Date($("#txtStart").val());
    var xurule = "DTSTART:" + moment(xmyStartDate).format("YYYYMMDDTHHmmss");
    xurule = xurule + "\n" + RRULE;
    var xmyrule = new rrule.rrulestr(xurule);
    lblRRULEWord = xmyrule.toText();

    $("#lblRRULEWord").val(lblRRULEWord);
    $("#CustomRRULEDescription").val(lblRRULEWord);
   
    if ($("#hdAddNewOptions").val() == "1") {
        AddNewOptionToCustomRRule(RRULE, lblRRULEWord);
    }
    else {
        var existsdrpRepeatCustomValue = false;
        $('#drpRepeatCustom option').each(function () {
            if (this.value == RRULE) {
                existsdrpRepeatCustomValue = true;
            }
        });
        if (existsdrpRepeatCustomValue == true) {
            $("#drpRepeatCustom").val(RRULE);
        }
        else {
            $("#hddRRULe").val('');
            $("#CustomRRULEDescription").val('');
            var xxxSdate = new Date();
            xxxSdate = moment(xxxSdate).add(1, 'year').format('MMM DD, YYYY hh:mm a');
            $('#txtEnd').data("DateTimePicker").maxDate(xxxSdate);
        }
    }
}

function ForFREQMonthly() {
    if ($("#crINTERVAL").val() == "") {
        $("#crINTERVAL").val("1");
    }
    if ($("#crCOUNT").val() == "" || $("#crCOUNT").val() == "0") {
        $("#crCOUNT").val("13");
    }
    if ($("#crUNTIL").val() == "") {
        var tmpcthisStart = new Date($("#txtStart").val());
        tmpcthisStart = tmpcthisStart.getDay();
        var tmpthisdRepeatEndDate = new Date($("#txtEnd").val());
        tmpthisdRepeatEndDate.setDate(tmpthisdRepeatEndDate.getDate() + 90);
        $('#crUNTIL').val(moment(tmpthisdRepeatEndDate).format("MMM DD, YYYY"));
    }
    var RRULE = "";
    var lblRRULEWord = "";
    var rruleFREQ = "FREQ=" + $("#crFREQ option:selected").val();
    var rruleINTERVAL = "INTERVAL=" + $("#crINTERVAL").val();
    
    var RadioMonthlyRecOn = $("input[name='crRadioMonthlyRecOn']:checked").val(); 

    var RadioEndsOn = $("input[name='RadioEndsOn']:checked").val();
    if (RadioEndsOn == "Never") {       

        if (RadioMonthlyRecOn == "onday") {
            var rruleBYMONTHDAY = "BYMONTHDAY=" + $("#crBYMONTHDAY option:selected").val();
            RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleBYMONTHDAY;

            var AddOneYearFromStart = new Date($("#txtStart").val());
            AddOneYearFromStart.setDate(AddOneYearFromStart.getDate() + 365);
            AddOneYearFromStart = moment(AddOneYearFromStart).format("YYYYMMDDT235900");
            var rruleEndAfterOneyear = "UNTIL=" + AddOneYearFromStart;
            RRULE = RRULE + ";" + rruleEndAfterOneyear;

            $('#crBYMONTHDAY').prop('disabled', false);
            $('#crBYSETPOS').prop('disabled', true);
            $('#crBYDAY').prop('disabled', true);
            $('#crBYMONTHDAY').removeClass("disabledDropDown");
            $('#crBYSETPOS').addClass("disabledDropDown");
            $('#crBYDAY').addClass("disabledDropDown");
        }
        else if (RadioMonthlyRecOn == "onthe") {
            var rruleBYSETPOS = "BYSETPOS=" + $("#crBYSETPOS option:selected").val();
            var rruleBYDAY = "BYDAY=" + $("#crBYDAY option:selected").val();
            RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleBYSETPOS + ";" + rruleBYDAY;

            var AddOneYearFromStart = new Date($("#txtStart").val());
            AddOneYearFromStart.setDate(AddOneYearFromStart.getDate() + 365);
            AddOneYearFromStart = moment(AddOneYearFromStart).format("YYYYMMDDT235900");
            var rruleEndAfterOneyear = "UNTIL=" + AddOneYearFromStart;
            RRULE = RRULE + ";" + rruleEndAfterOneyear;

            $('#crBYMONTHDAY').prop('disabled', true);
            $('#crBYSETPOS').prop('disabled', false);
            $('#crBYDAY').prop('disabled', false);
            $('#crBYMONTHDAY').addClass("disabledDropDown");
            $('#crBYSETPOS').removeClass("disabledDropDown");
            $('#crBYDAY').removeClass("disabledDropDown");
        }
        $('#crUNTIL').prop('disabled', true);
        $('#crCOUNT').prop('disabled', true);
    }
    else if (RadioEndsOn == "Until") {
        var EndDate = new Date($("#crUNTIL").val());
        EndDate = moment(EndDate).format("YYYYMMDDT235900");
        var rruleUNTIL = "UNTIL=" + EndDate;
        if (RadioMonthlyRecOn == "onday") {
            var rruleBYMONTHDAY = "BYMONTHDAY=" + $("#crBYMONTHDAY option:selected").val();
            RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleBYMONTHDAY + ";" + rruleUNTIL;
            $('#crBYMONTHDAY').prop('disabled', false);
            $('#crBYSETPOS').prop('disabled', true);
            $('#crBYDAY').prop('disabled', true);
            $('#crBYMONTHDAY').removeClass("disabledDropDown");
            $('#crBYSETPOS').addClass("disabledDropDown");
            $('#crBYDAY').addClass("disabledDropDown");
        }
        else if (RadioMonthlyRecOn == "onthe") {
            var rruleBYSETPOS = "BYSETPOS=" + $("#crBYSETPOS option:selected").val();
            var rruleBYDAY = "BYDAY=" + $("#crBYDAY option:selected").val();
            RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleBYSETPOS + ";" + rruleBYDAY + ";" + rruleUNTIL;
            $('#crBYMONTHDAY').prop('disabled', true);
            $('#crBYSETPOS').prop('disabled', false);
            $('#crBYDAY').prop('disabled', false);
            $('#crBYMONTHDAY').addClass("disabledDropDown");
            $('#crBYSETPOS').removeClass("disabledDropDown");
            $('#crBYDAY').removeClass("disabledDropDown");
        }
        $('#crUNTIL').prop('disabled', false);
        $('#crCOUNT').prop('disabled', true);
    }
    else if (RadioEndsOn == "After") {
        var rruleCOUNT = "COUNT=" + $("#crCOUNT").val();
        if (RadioMonthlyRecOn == "onday") {
            var rruleBYMONTHDAY = "BYMONTHDAY=" + $("#crBYMONTHDAY option:selected").val();
            RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleBYMONTHDAY + ";" + rruleCOUNT;
            $('#crBYMONTHDAY').prop('disabled', false);
            $('#crBYSETPOS').prop('disabled', true);
            $('#crBYDAY').prop('disabled', true);
            $('#crBYMONTHDAY').removeClass("disabledDropDown");
            $('#crBYSETPOS').addClass("disabledDropDown");
            $('#crBYDAY').addClass("disabledDropDown");
        }
        else if (RadioMonthlyRecOn == "onthe") {
            var rruleBYSETPOS = "BYSETPOS=" + $("#crBYSETPOS option:selected").val();
            var rruleBYDAY = "BYDAY=" + $("#crBYDAY option:selected").val();
            RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleBYSETPOS + ";" + rruleBYDAY + ";" + rruleCOUNT;
            $('#crBYMONTHDAY').prop('disabled', true);
            $('#crBYSETPOS').prop('disabled', false);
            $('#crBYDAY').prop('disabled', false);
            $('#crBYMONTHDAY').addClass("disabledDropDown");
            $('#crBYSETPOS').removeClass("disabledDropDown");
            $('#crBYDAY').removeClass("disabledDropDown");
        }
        $('#crCOUNT').prop('disabled', false);
        $('#crUNTIL').prop('disabled', true);
        
    }


    var xmyStartDate = new Date($("#txtStart").val());
    var xurule = "DTSTART:" + moment(xmyStartDate).format("YYYYMMDDTHHmmss");
    xurule = xurule + "\n" + RRULE;
    var xmyrule = new rrule.rrulestr(xurule);
    lblRRULEWord = xmyrule.toText();

    $("#txtRRULE").val(RRULE);
    $("#lblRRULEWord").val(lblRRULEWord);
    $("#CustomRRULEDescription").val(lblRRULEWord);
    if ($("#hdAddNewOptions").val() == "1") {
        AddNewOptionToCustomRRule(RRULE, lblRRULEWord);
    }
    else {
        var existsdrpRepeatCustomValue = false;
        $('#drpRepeatCustom option').each(function () {
            if (this.value == RRULE) {
                existsdrpRepeatCustomValue = true;
            }
        });
        if (existsdrpRepeatCustomValue == true) {
            $("#drpRepeatCustom").val(RRULE);
        }
        else {
            $("#hddRRULe").val('');
            $("#CustomRRULEDescription").val('');
            var xxxSdate = new Date();
            xxxSdate = moment(xxxSdate).add(1, 'year').format('MMM DD, YYYY hh:mm a');
            $('#txtEnd').data("DateTimePicker").maxDate(xxxSdate);
        }
    }
}

function ForFREQYearly() {
    if ($("#crINTERVAL").val() == "") {
        $("#crINTERVAL").val("1");
    }
    if ($("#crCOUNT").val() == "" || $("#crCOUNT").val() == "0") {
        $("#crCOUNT").val("13");
    }
    if ($("#crUNTIL").val() == "") {
        var tmpcthisStart = new Date($("#txtStart").val());
        tmpcthisStart = tmpcthisStart.getDay();
        var tmpthisdRepeatEndDate = new Date($("#txtEnd").val());
        tmpthisdRepeatEndDate.setDate(tmpthisdRepeatEndDate.getDate() + 90);
        $('#crUNTIL').val(moment(tmpthisdRepeatEndDate).format("MMM DD, YYYY"));
    }
    var lblRRULEWord = "";
    var RRULE = "";
    var rruleFREQ = "FREQ=" + $("#crFREQ option:selected").val();
    var rruleINTERVAL = "INTERVAL=" + $("#crINTERVAL").val();
    var RadioEndsOn = $("input[name='RadioEndsOn']:checked").val();
    if (RadioEndsOn == "Never") {
        RRULE = rruleFREQ + ";" + rruleINTERVAL;

        var AddOneYearFromStart = new Date($("#txtStart").val());
        AddOneYearFromStart.setDate(AddOneYearFromStart.getDate() + 365);
        AddOneYearFromStart = moment(AddOneYearFromStart).format("YYYYMMDDT235900");
        var rruleEndAfterOneyear = "UNTIL=" + AddOneYearFromStart;
        RRULE = RRULE + ";" + rruleEndAfterOneyear;
        
        $('#crUNTIL').prop('disabled', true);
        $('#crCOUNT').prop('disabled', true);
    }
    else if (RadioEndsOn == "Until") {
        var EndDate = new Date($("#crUNTIL").val());
        EndDate = moment(EndDate).format("YYYYMMDDT235900");
        var rruleUNTIL = "UNTIL=" + EndDate;
        RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleUNTIL;
        
        $('#crUNTIL').prop('disabled', false);
        $('#crCOUNT').prop('disabled', true);
    }
    else if (RadioEndsOn == "After") {
        var rruleCOUNT = "COUNT=" + $("#crCOUNT").val();
        RRULE = rruleFREQ + ";" + rruleINTERVAL + ";" + rruleCOUNT;
        
        $('#crCOUNT').prop('disabled', false);
        $('#crUNTIL').prop('disabled', true);
    }


    var xmyStartDate = new Date($("#txtStart").val());
    var xurule = "DTSTART:" + moment(xmyStartDate).format("YYYYMMDDTHHmmss");
    xurule = xurule + "\n" + RRULE;
    var xmyrule = new rrule.rrulestr(xurule);
    lblRRULEWord = xmyrule.toText();

    $("#txtRRULE").val(RRULE);
    $("#lblRRULEWord").val(lblRRULEWord);
    $("#CustomRRULEDescription").val(lblRRULEWord);
    
    if ($("#hdAddNewOptions").val() == "1") {
        AddNewOptionToCustomRRule(RRULE, lblRRULEWord);
    }
    else {
        var existsdrpRepeatCustomValue = false;
        $('#drpRepeatCustom option').each(function () {
            if (this.value == RRULE) {
                existsdrpRepeatCustomValue = true;
            }
        });
        if (existsdrpRepeatCustomValue == true) {
            $("#drpRepeatCustom").val(RRULE);
        }
        else {
            $("#hddRRULe").val('');
            $("#CustomRRULEDescription").val('');
            var xxxSdate = new Date();
            xxxSdate = moment(xxxSdate).add(1, 'year').format('MMM DD, YYYY hh:mm a');
            $('#txtEnd').data("DateTimePicker").maxDate(xxxSdate);
        }
    }
}


$('#RRCancel').click(function () {
    
    //$("#drpRepeatCustom").val("0");
    //$("#hddRRULe").val();
    //$("#CustomRRULEDescription").val();
    var hhh = $("#hddRRULe").val();
    if ($("#hddRRULe").val() != null && $("#hddRRULe").val() != "") {
        PopulateRRulePopup();
    }
    else {
        $("#drpRepeatCustom").val("0");
    }
    
});
$('#btncustomRecurring').click(function () {
    $("#hddRRULe").val($("#txtRRULE").val());
    $("#CustomRRULEDescription").val($("#lblRRULEWord").val());
    $('#mycustomRecurringModal').modal('hide');
    $("#hdAddNewOptions").val("1");
    PopulateRRulePopup();
    $("#hdAddNewOptions").val("0");
});

function AddNewOptionToCustomRRule(ARRule, RRULEInWord) {

    var alreadyExists = false;
    $.each($("#drpRepeatCustom option"), function () {
        if ($(this).val() == ARRule) {
            alreadyExists = true;
        }
    });

    if (alreadyExists == false) {
        var option = $('<option>', { value: ARRule, text: RRULEInWord }).attr('data-rrule', ARRule);
        $("#drpRepeatCustom option:last").before(option);
        $("#drpRepeatCustom").val(ARRule);
    }
    else {
        $("#drpRepeatCustom").val(ARRule);        
    }
}