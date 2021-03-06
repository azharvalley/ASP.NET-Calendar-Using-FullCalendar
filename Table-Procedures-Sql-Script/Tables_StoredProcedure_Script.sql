USE [DB_CMS]
GO
/****** Object:  Table [dbo].[Events]    Script Date: 06/09/2020 4:17:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Events](
	[EventID] [bigint] IDENTITY(1,1) NOT NULL,
	[Subject] [nvarchar](200) NULL,
	[Description] [nvarchar](500) NULL,
	[Start] [datetime] NULL,
	[End] [datetime] NULL,
	[UTCStartDateTime] [nvarchar](100) NULL,
	[UTCEndDateTime] [nvarchar](100) NULL,
	[ThemeColor] [nvarchar](50) NULL,
	[IsFullDay] [bit] NULL,
	[IsRecurring] [bit] NULL,
	[RRule] [nvarchar](500) NULL,
	[EventTypeId] [int] NULL,
	[RepeatEndDate] [datetime] NULL,
	[UTCRepeatEndDate] [nvarchar](100) NULL,
	[IsActive] [bit] NULL,
	[EventGUID] [nvarchar](500) NULL,
	[EventStatus] [nvarchar](100) NULL,
	[UserId] [nvarchar](300) NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[EventID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF_Events_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF_Events_EventGUID]  DEFAULT (newid()) FOR [EventGUID]
GO
/****** Object:  StoredProcedure [dbo].[DeleteEventByEventId]    Script Date: 06/09/2020 4:17:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[DeleteEventByEventId]  
@EventId bigint    
as    
if exists (select EventID from Events where EventId=@EventId)    
begin    
update Events set IsActive=0 where EventId=@EventId;     
select 'success'    
end    
else    
begin    
select '0'    
end  
GO
/****** Object:  StoredProcedure [dbo].[FetchAllActiveEvents]    Script Date: 06/09/2020 4:17:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[FetchAllActiveEvents]
 @UserId nvarchar(max) = null,                                                       
    @EventTypeId int = null,                  
 @search nvarchar(300) 
as
select EventID, [Subject], [Description], [Start], [End], UTCStartDateTime, UTCEndDateTime, ThemeColor, 
IsFullDay, IsRecurring, RRule, EventTypeId, RepeatEndDate, UTCRepeatEndDate, IsActive
,EventGUID, EventStatus, UserId
 from Events where IsActive=1
GO
/****** Object:  StoredProcedure [dbo].[UpdateEvent_Status]    Script Date: 06/09/2020 4:17:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[UpdateEvent_Status]  
@EventID bigint,  
@EventStatus nvarchar(100)  
as  
SET NOCOUNT ON  
if exists (select top 1 EventID from Events where EventID=@EventID)  
begin  
UPDATE Events SET EventStatus=@EventStatus where EventID=@EventID  
end  
GO
