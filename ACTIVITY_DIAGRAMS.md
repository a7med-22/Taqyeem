# Activity Diagrams - Taqyeem Platform

This document contains detailed activity diagrams for the main workflows in the Taqyeem Platform.

## 1. Candidate Booking and Interview Flow

This diagram shows the complete process from candidate registration through booking a slot, attending an interview, and viewing evaluation results.

```mermaid
flowchart TD
    Start([Candidate Starts]) --> Login{Logged In?}
    Login -->|No| Register[Register Account]
    Register --> Login
    Login -->|Yes| Browse[Browse Available Interviewers]
    Browse --> Select[Select Interviewer]
    Select --> ViewSlots[View Available Slots]
    ViewSlots --> ChooseSlot{Choose Slot?}
    ChooseSlot -->|No| ViewSlots
    ChooseSlot -->|Yes| CheckActive{Active Reservation<br/>with Interviewer?}
    CheckActive -->|Yes| Error1[Error: Already have<br/>active reservation]
    Error1 --> ViewSlots
    CheckActive -->|No| BookSlot[Book Slot]
    BookSlot --> Wait[Wait for Interviewer Response]
    Wait --> Response{Interviewer Response}
    Response -->|Rejected| Notified1[Receive Rejection Notice]
    Notified1 --> ViewSlots
    Response -->|Accepted| SessionCreated[Session Created]
    SessionCreated --> JoinSession[Join Video Interview]
    JoinSession --> Interview[Attend Interview]
    Interview --> Complete{Session Complete?}
    Complete -->|No| Interview
    Complete -->|Yes| ViewEval[View Evaluation Results]
    ViewEval --> End([End])
```

**Key Steps:**

1. Candidate must be logged in to book slots
2. Can only have one active reservation per interviewer
3. Must wait for interviewer to accept/reject the reservation
4. If accepted, a session is created and candidate can join
5. After session completion, candidate can view evaluation results

---

## 2. Interviewer Schedule Management and Interview Flow

This diagram shows how interviewers create schedules, manage reservations, conduct interviews, and create evaluations.

```mermaid
flowchart TD
    Start([Interviewer Starts]) --> Login{Logged In?}
    Login -->|No| Register[Register & Wait for Approval]
    Register --> WaitApproval[Wait for Admin Approval]
    WaitApproval --> Approved{Approved?}
    Approved -->|No| WaitApproval
    Approved -->|Yes| Login
    Login -->|Yes| CreateSchedule[Create Interview Schedule]
    CreateSchedule --> CreateSlots[Create Time Slots]
    CreateSlots --> WaitReservations[Wait for Reservations]
    WaitReservations --> CheckPending{New Pending<br/>Reservations?}
    CheckPending -->|No| WaitReservations
    CheckPending -->|Yes| Review[Review Reservation Request]
    Review --> Decision{Accept or Reject?}
    Decision -->|Reject| RejectRes[Reject with Reason]
    RejectRes --> UpdateSlot1[Update Slot Status]
    UpdateSlot1 --> WaitReservations
    Decision -->|Accept| AcceptRes[Accept Reservation]
    AcceptRes --> CreateSession[Create Interview Session]
    CreateSession --> UpdateSlot2[Update Slot Status]
    UpdateSlot2 --> StartSession[Start Session]
    StartSession --> ConductInterview[Conduct Video Interview]
    ConductInterview --> CompleteSession{Complete Session?}
    CompleteSession -->|No| ConductInterview
    CompleteSession -->|Yes| CreateEval[Create Evaluation]
    CreateEval --> ScoreCriteria[Score Criteria:<br/>Communication, Technical,<br/>Problem Solving, Confidence]
    ScoreCriteria --> AddComments[Add Comments & Notes]
    AddComments --> SubmitEval[Submit Evaluation]
    SubmitEval --> UpdateSlot3[Update Slot Status]
    UpdateSlot3 --> End([End])
```

**Key Steps:**

1. New interviewers must be approved by admin before they can create schedules
2. Interviewers create schedules and time slots
3. They review and accept/reject reservation requests
4. When accepted, a session is created
5. Interviewers conduct video interviews
6. After completion, they create evaluations with detailed scoring

---

## 3. Admin Management Flow

This diagram shows the various management operations available to administrators.

```mermaid
flowchart TD
    Start([Admin Starts]) --> Login[Login to Admin Dashboard]
    Login --> Dashboard[View Dashboard Analytics]
    Dashboard --> SelectTab{Select Management Tab}

    SelectTab -->|Users| UserMgmt[User Management]
    UserMgmt --> SearchUsers[Search/Filter Users]
    SearchUsers --> UserAction{User Action}
    UserAction -->|Edit| EditUser[Edit User Details]
    UserAction -->|Delete| DeleteUser[Delete User]
    UserAction -->|Approve Interviewer| ApproveInt[Approve Interviewer]
    UserAction -->|Reject Interviewer| RejectInt[Reject Interviewer]
    EditUser --> UserMgmt
    DeleteUser --> UserMgmt
    ApproveInt --> UserMgmt
    RejectInt --> UserMgmt

    SelectTab -->|Reservations| ResMgmt[Reservation Management]
    ResMgmt --> SearchRes[Search/Filter Reservations]
    SearchRes --> ViewRes[View Reservation Details]
    ViewRes --> DeleteRes{Delete Reservation?}
    DeleteRes -->|Yes| DeleteReservation[Delete Reservation]
    DeleteReservation --> UpdateSlot1[Update Slot Availability]
    UpdateSlot1 --> ResMgmt
    DeleteRes -->|No| ResMgmt

    SelectTab -->|Sessions| SessionMgmt[Session Management]
    SessionMgmt --> SearchSessions[Search/Filter Sessions]
    SearchSessions --> ViewSession[View Session Details]
    ViewSession --> SessionAction{Session Action}
    SessionAction -->|View Evaluation| ViewEval[View Candidate Evaluation]
    SessionAction -->|Delete| DeleteSession[Delete Session]
    ViewEval --> SessionMgmt
    DeleteSession --> UpdateSlot2[Update Slot Availability]
    UpdateSlot2 --> SessionMgmt

    SelectTab -->|Content| ContentMgmt[Content Management]
    ContentMgmt --> ContentAction{Content Action}
    ContentAction -->|Create| CreateContent[Create Learning Content]
    ContentAction -->|Edit| EditContent[Edit Content]
    ContentAction -->|Delete| DeleteContent[Delete Content]
    CreateContent --> ContentMgmt
    EditContent --> ContentMgmt
    DeleteContent --> ContentMgmt

    SelectTab -->|Dashboard| Dashboard
    Dashboard --> End([End])
```

**Key Management Areas:**

1. **User Management**: Approve/reject interviewers, edit/delete users
2. **Reservation Management**: View, search, filter, and delete reservations
3. **Session Management**: View sessions, view evaluations, delete sessions
4. **Content Management**: Create, edit, and delete educational content
5. **Dashboard**: View platform analytics and statistics

---

## 4. Evaluation Process Flow

This diagram shows the detailed process of creating an evaluation after an interview session.

```mermaid
flowchart TD
    Start([Session Started]) --> Interview[Conduct Interview]
    Interview --> SessionStatus{Session Status}
    SessionStatus -->|In Progress| Continue[Continue Interview]
    Continue --> Interview
    SessionStatus -->|Completed| CheckEval{Evaluation<br/>Exists?}
    CheckEval -->|Yes| Error[Error: Evaluation<br/>Already Exists]
    Error --> End
    CheckEval -->|No| StartEval[Start Evaluation]
    StartEval --> ScoreComm[Score Communication<br/>1-10]
    ScoreComm --> ScoreTech[Score Technical Skills<br/>1-10]
    ScoreTech --> ScoreProblem[Score Problem Solving<br/>1-10]
    ScoreProblem --> ScoreConf[Score Confidence<br/>1-10]
    ScoreConf --> CalculateOverall[Calculate Overall Score<br/>Average of 4 criteria]
    CalculateOverall --> AddCommComments[Add Communication Comments]
    AddCommComments --> AddTechComments[Add Technical Comments]
    AddTechComments --> AddProblemComments[Add Problem Solving Comments]
    AddProblemComments --> AddConfComments[Add Confidence Comments]
    AddConfComments --> AddGeneralNotes[Add General Notes]
    AddGeneralNotes --> Validate{All Scores<br/>Valid?}
    Validate -->|No| StartEval
    Validate -->|Yes| SubmitEval[Submit Evaluation]
    SubmitEval --> SaveEval[Save to Database]
    SaveEval --> NotifyCandidate[Notify Candidate]
    NotifyCandidate --> End([End])
```

**Evaluation Criteria:**

1. **Communication** (1-10): Verbal communication skills, clarity, articulation
2. **Technical** (1-10): Technical knowledge and expertise
3. **Problem Solving** (1-10): Analytical thinking and problem-solving approach
4. **Confidence** (1-10): Self-assurance and presentation

**Overall Score**: Calculated as the average of all four criteria scores (rounded to nearest integer).

---

## 5. Slot Reversal Flow

This diagram shows how slot availability is restored when reservations or sessions are deleted, rejected, completed, or cancelled.

```mermaid
flowchart TD
    Start([Action Triggered]) --> ActionType{Action Type}

    ActionType -->|Reservation Rejected| Reject[Reservation Rejected]
    Reject --> Decrement1[Decrement Slot<br/>currentCandidates]
    Decrement1 --> CheckStatus1{currentCandidates<br/>> 0?}
    CheckStatus1 -->|Yes| SetPending1[Set Slot Status<br/>to 'pending']
    CheckStatus1 -->|No| SetAvailable1[Set Slot Status<br/>to 'available']
    SetPending1 --> End
    SetAvailable1 --> End

    ActionType -->|Reservation Deleted| DeleteRes[Reservation Deleted]
    DeleteRes --> Decrement2[Decrement Slot<br/>currentCandidates]
    Decrement2 --> CheckStatus2{currentCandidates<br/>> 0?}
    CheckStatus2 -->|Yes| SetPending2[Set Slot Status<br/>to 'pending']
    CheckStatus2 -->|No| SetAvailable2[Set Slot Status<br/>to 'available']
    SetPending2 --> End
    SetAvailable2 --> End

    ActionType -->|Session Completed| Complete[Session Completed]
    Complete --> Decrement3[Decrement Slot<br/>currentCandidates]
    Decrement3 --> CheckStatus3{currentCandidates<br/>> 0?}
    CheckStatus3 -->|Yes| SetPending3[Set Slot Status<br/>to 'pending']
    CheckStatus3 -->|No| SetAvailable3[Set Slot Status<br/>to 'available']
    SetPending3 --> End
    SetAvailable3 --> End

    ActionType -->|Session Cancelled| Cancel[Session Cancelled]
    Cancel --> Decrement4[Decrement Slot<br/>currentCandidates]
    Decrement4 --> CheckStatus4{currentCandidates<br/>> 0?}
    CheckStatus4 -->|Yes| SetPending4[Set Slot Status<br/>to 'pending']
    CheckStatus4 -->|No| SetAvailable4[Set Slot Status<br/>to 'available']
    SetPending4 --> End
    SetAvailable4 --> End

    ActionType -->|Session Deleted| DeleteSession[Session Deleted]
    DeleteSession --> Decrement5[Decrement Slot<br/>currentCandidates]
    Decrement5 --> CheckStatus5{currentCandidates<br/>> 0?}
    CheckStatus5 -->|Yes| SetPending5[Set Slot Status<br/>to 'pending']
    CheckStatus5 -->|No| SetAvailable5[Set Slot Status<br/>to 'available']
    SetPending5 --> End
    SetAvailable5 --> End([End])
```

**Slot Status Logic:**

- **Available**: `currentCandidates = 0` (slot is completely free)
- **Pending**: `currentCandidates > 0` but `currentCandidates < maxCandidates` (has some bookings but not full)
- **Booked**: `currentCandidates >= maxCandidates` (slot is full)

**Reversal Triggers:**

- Reservation rejected by interviewer
- Reservation deleted by admin or candidate
- Session completed successfully
- Session cancelled
- Session deleted by admin

When any of these actions occur, the slot's `currentCandidates` count is decremented, and the status is updated accordingly to make the slot available again for new bookings.
