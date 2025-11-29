# Taqyeem Platform - Sequence Diagrams

This document contains sequence diagrams showing the main flows of the Taqyeem platform.

## 1. User Registration & Login Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB
    participant Cloudinary

    Note over User,Cloudinary: Registration Flow
    User->>Frontend: Fill registration form
    User->>Frontend: Submit (with CV if interviewer)
    Frontend->>Backend: POST /api/v1/auth/register
    Backend->>MongoDB: Check if user exists
    MongoDB-->>Backend: User check result
    
    alt User exists
        Backend-->>Frontend: Error: User already exists
        Frontend-->>User: Show error message
    else User doesn't exist
        alt Role is Interviewer
            Backend->>Cloudinary: Upload CV file
            Cloudinary-->>Backend: CV URL
        end
        Backend->>MongoDB: Create user document
        MongoDB-->>Backend: User created
        
        alt Role is Candidate
            Backend->>Backend: Generate JWT tokens
            Backend-->>Frontend: User + Access Token
            Frontend->>Frontend: Store token & user
            Frontend-->>User: Redirect to Dashboard
        else Role is Interviewer
            Backend-->>Frontend: User (pending approval)
            Frontend-->>User: Show "Pending approval" message
            Frontend-->>User: Redirect to Login
        end
    end

    Note over User,Cloudinary: Login Flow
    User->>Frontend: Enter email & password
    User->>Frontend: Submit login form
    Frontend->>Backend: POST /api/v1/auth/login
    Backend->>MongoDB: Find user by email
    MongoDB-->>Backend: User data
    
    alt Invalid credentials
        Backend-->>Frontend: Error: Invalid credentials
        Frontend-->>User: Show error message
    else Valid credentials
        Backend->>Backend: Verify password
        Backend->>Backend: Check if active & approved
        Backend->>Backend: Generate JWT tokens
        Backend->>MongoDB: Update lastLogin
        Backend-->>Frontend: User + Access Token + Refresh Token
        Frontend->>Frontend: Store in localStorage
        Frontend->>Frontend: Update AuthContext
        Frontend-->>User: Redirect to Dashboard
    end
```

## 2. Interviewer Schedule Creation Flow

```mermaid
sequenceDiagram
    participant Interviewer
    participant Frontend
    participant Backend
    participant MongoDB

    Note over Interviewer,MongoDB: Schedule Creation Flow
    Interviewer->>Frontend: Navigate to Interviews page
    Frontend->>Backend: GET /api/v1/schedules (fetch existing)
    Backend->>MongoDB: Query schedules
    MongoDB-->>Backend: Schedules list
    Backend-->>Frontend: Schedules data
    Frontend-->>Interviewer: Display schedules
    
    Interviewer->>Frontend: Click "Create Schedule"
    Frontend-->>Interviewer: Show schedule form
    Interviewer->>Frontend: Fill form (date, time, duration, etc.)
    Interviewer->>Frontend: Submit schedule
    
    Frontend->>Backend: POST /api/v1/schedules
    Backend->>Backend: Validate date (must be future)
    Backend->>MongoDB: Check existing schedule for date
    MongoDB-->>Backend: Existing schedule check
    
    alt Schedule exists for date
        Backend-->>Frontend: Error: Schedule already exists
        Frontend-->>Interviewer: Show error message
    else No existing schedule
        Backend->>MongoDB: Create schedule document
        MongoDB-->>Backend: Schedule created
        Backend->>Backend: Generate slots (auto-calculate)
        Backend->>MongoDB: Create slot documents (batch insert)
        MongoDB-->>Backend: Slots created
        Backend-->>Frontend: Schedule + Slots count
        Frontend->>Frontend: Refresh schedules list
        Frontend-->>Interviewer: Show success message
    end
```

## 3. Candidate Booking Flow

```mermaid
sequenceDiagram
    participant Candidate
    participant Frontend
    participant Backend
    participant MongoDB

    Note over Candidate,MongoDB: Booking Flow
    Candidate->>Frontend: Navigate to Interviews page
    Frontend->>Backend: GET /api/v1/interviewers?hasSchedules=true
    Backend->>MongoDB: Query interviewers with schedules
    MongoDB-->>Backend: Interviewers list
    Backend-->>Frontend: Interviewers data
    Frontend-->>Candidate: Display interviewer cards
    
    Candidate->>Frontend: Select interviewer
    Frontend->>Backend: GET /api/v1/slots?interviewerId=X
    Backend->>MongoDB: Query available slots
    MongoDB-->>Backend: Slots list
    Backend-->>Frontend: Slots data
    Frontend-->>Candidate: Display calendar with slots
    
    Candidate->>Frontend: Click available slot
    Frontend-->>Candidate: Show slot details
    Candidate->>Frontend: Click "Book Now"
    
    Frontend->>Backend: POST /api/v1/reservations {slotId}
    Backend->>MongoDB: Find slot by ID
    MongoDB-->>Backend: Slot data
    
    alt Slot not available
        Backend-->>Frontend: Error: Slot not available
        Frontend-->>Candidate: Show error message
    else Slot available
        Backend->>MongoDB: Check existing reservation
        MongoDB-->>Backend: Reservation check
        
        alt Reservation exists
            Backend-->>Frontend: Error: Already reserved
            Frontend-->>Candidate: Show error message
        else No reservation
            Backend->>MongoDB: Create reservation (status: pending)
            MongoDB-->>Backend: Reservation created
            Backend->>MongoDB: Update slot (currentCandidates++, status)
            MongoDB-->>Backend: Slot updated
            Backend-->>Frontend: Reservation created
            Frontend->>Frontend: Refresh slots display
            Frontend-->>Candidate: Show success message
        end
    end
```

## 4. Reservation Acceptance Flow

```mermaid
sequenceDiagram
    participant Interviewer
    participant Frontend
    participant Backend
    participant MongoDB

    Note over Interviewer,MongoDB: Reservation Acceptance Flow
    Interviewer->>Frontend: Navigate to Interviews page
    Frontend->>Backend: GET /api/v1/reservations/pending
    Backend->>MongoDB: Query pending reservations
    MongoDB-->>Backend: Pending reservations
    Backend-->>Frontend: Reservations list
    Frontend-->>Interviewer: Display pending reservations
    
    Interviewer->>Frontend: Click "Accept" on reservation
    Frontend->>Backend: POST /api/v1/reservations/:id/accept
    Backend->>MongoDB: Find reservation
    MongoDB-->>Backend: Reservation data
    
    Backend->>MongoDB: Update reservation (status: accepted)
    MongoDB-->>Backend: Reservation updated
    Backend->>MongoDB: Create session document
    MongoDB-->>Backend: Session created
    Backend->>MongoDB: Update session with reservationId
    MongoDB-->>Backend: Session updated
    Backend-->>Frontend: Reservation accepted + Session created
    Frontend->>Frontend: Refresh reservations list
    Frontend-->>Interviewer: Show success message
    
    Note over Interviewer,MongoDB: Alternative: Rejection Flow
    Interviewer->>Frontend: Click "Reject" on reservation
    Frontend-->>Interviewer: Show rejection reason dialog
    Interviewer->>Frontend: Enter rejection reason
    Interviewer->>Frontend: Submit rejection
    
    Frontend->>Backend: POST /api/v1/reservations/:id/reject {reason}
    Backend->>MongoDB: Update reservation (status: rejected, reason)
    MongoDB-->>Backend: Reservation updated
    Backend->>MongoDB: Update slot (currentCandidates--, status)
    MongoDB-->>Backend: Slot updated
    Backend-->>Frontend: Reservation rejected
    Frontend->>Frontend: Refresh reservations list
    Frontend-->>Interviewer: Show success message
```

## 5. Video Call Session Flow

```mermaid
sequenceDiagram
    participant Candidate
    participant Interviewer
    participant Frontend
    participant Backend
    participant SocketIO
    participant MongoDB

    Note over Candidate,MongoDB: Session Start Flow
    Interviewer->>Frontend: Navigate to session page
    Frontend->>Backend: GET /api/v1/sessions/:id
    Backend->>MongoDB: Find session
    MongoDB-->>Backend: Session data
    Backend-->>Frontend: Session details
    Frontend-->>Interviewer: Display session info
    
    Interviewer->>Frontend: Click "Start Session"
    Frontend->>Backend: POST /api/v1/sessions/:id/start
    Backend->>MongoDB: Update session (status: in-progress, meetingLink)
    MongoDB-->>Backend: Session updated
    Backend-->>Frontend: Session started
    Frontend->>Frontend: Initialize WebRTC
    
    Note over Candidate,SocketIO: WebRTC Connection Setup
    Interviewer->>Frontend: Request media (getUserMedia)
    Frontend->>Frontend: Get local stream
    Interviewer->>SocketIO: Connect to socket
    SocketIO-->>Interviewer: Socket connected
    Interviewer->>SocketIO: Join session room
    
    Candidate->>Frontend: Navigate to session page
    Frontend->>Backend: GET /api/v1/sessions/:id
    Backend->>MongoDB: Find session
    MongoDB-->>Backend: Session data
    Backend-->>Frontend: Session details
    Frontend-->>Candidate: Display session info
    
    Candidate->>Frontend: Click "Join Call"
    Frontend->>Frontend: Initialize WebRTC
    Candidate->>Frontend: Request media (getUserMedia)
    Frontend->>Frontend: Get local stream
    Candidate->>SocketIO: Connect to socket
    SocketIO-->>Candidate: Socket connected
    Candidate->>SocketIO: Join session room
    
    Note over Candidate,SocketIO: WebRTC Signaling
    Interviewer->>Frontend: Create RTCPeerConnection
    Interviewer->>Frontend: Create offer
    Interviewer->>SocketIO: Emit offer
    SocketIO->>Candidate: Receive offer
    Candidate->>Frontend: Set remote description
    Candidate->>Frontend: Create answer
    Candidate->>SocketIO: Emit answer
    SocketIO->>Interviewer: Receive answer
    Interviewer->>Frontend: Set remote description
    
    Interviewer->>Frontend: Gather ICE candidates
    Interviewer->>SocketIO: Emit ICE candidate
    SocketIO->>Candidate: Receive ICE candidate
    Candidate->>Frontend: Add ICE candidate
    
    Candidate->>Frontend: Gather ICE candidates
    Candidate->>SocketIO: Emit ICE candidate
    SocketIO->>Interviewer: Receive ICE candidate
    Interviewer->>Frontend: Add ICE candidate
    
    Note over Candidate,Interviewer: Video Call Active
    Candidate<->Interviewer: P2P video/audio stream
    
    Note over Candidate,MongoDB: Evaluation During Call
    Interviewer->>Frontend: Update evaluation scores
    Frontend->>SocketIO: Emit evaluation-update
    SocketIO->>Candidate: Broadcast evaluation-update
    Candidate->>Frontend: Update evaluation display
    
    Note over Candidate,MongoDB: Session Completion
    Interviewer->>Frontend: Click "End Call"
    Frontend->>Frontend: Close peer connection
    Interviewer->>SocketIO: Leave room
    Candidate->>SocketIO: Leave room
    
    Interviewer->>Frontend: Click "Complete Session"
    Frontend->>Backend: POST /api/v1/sessions/:id/complete
    Backend->>MongoDB: Update session (status: completed, actualEndTime)
    MongoDB-->>Backend: Session updated
    Backend-->>Frontend: Session completed
    Frontend-->>Interviewer: Show success message
```

## 6. Evaluation Flow

```mermaid
sequenceDiagram
    participant Interviewer
    participant Candidate
    participant Frontend
    participant Backend
    participant MongoDB

    Note over Interviewer,MongoDB: Evaluation Creation Flow
    Interviewer->>Frontend: During/After session, fill evaluation form
    Interviewer->>Frontend: Enter scores & comments
    Interviewer->>Frontend: Submit evaluation
    
    Frontend->>Backend: POST /api/v1/evaluations {sessionId, criteria, notes}
    Backend->>MongoDB: Find session
    MongoDB-->>Backend: Session data
    
    alt Session not found
        Backend-->>Frontend: Error: Session not found
        Frontend-->>Interviewer: Show error message
    else Session found
        Backend->>Backend: Check authorization (must be interviewer)
        Backend->>MongoDB: Check if evaluation exists
        MongoDB-->>Backend: Evaluation check
        
        alt Evaluation exists
            Backend-->>Frontend: Error: Evaluation already exists
            Frontend-->>Interviewer: Show error message
        else No evaluation
            Backend->>Backend: Calculate overallScore
            Backend->>MongoDB: Create evaluation document
            MongoDB-->>Backend: Evaluation created
            Backend-->>Frontend: Evaluation created
            Frontend->>Frontend: Refresh evaluation display
            Frontend-->>Interviewer: Show success message
        end
    end

    Note over Candidate,MongoDB: Candidate Viewing Evaluation
    Candidate->>Frontend: Navigate to session page (completed)
    Frontend->>Backend: GET /api/v1/evaluations/:sessionId
    Backend->>MongoDB: Find evaluation by sessionId
    MongoDB-->>Backend: Evaluation data
    Backend-->>Frontend: Evaluation details
    Frontend-->>Candidate: Display evaluation results
    
    Note over Interviewer,MongoDB: View All Evaluations
    Interviewer->>Frontend: Navigate to "My Evaluations"
    Frontend->>Backend: GET /api/v1/evaluations/my?page=1&limit=100
    Backend->>MongoDB: Query evaluations (interviewerId = user._id)
    MongoDB-->>Backend: Evaluations list
    Backend-->>Frontend: Evaluations data
    Frontend-->>Interviewer: Display evaluations list
    
    Candidate->>Frontend: Navigate to "My Evaluations"
    Frontend->>Backend: GET /api/v1/evaluations/my?page=1&limit=100
    Backend->>MongoDB: Query evaluations (candidateId = user._id)
    MongoDB-->>Backend: Evaluations list
    Backend-->>Frontend: Evaluations data
    Frontend-->>Candidate: Display evaluations list
```

## 7. Complete Interview Lifecycle Flow

```mermaid
sequenceDiagram
    participant Candidate
    participant Interviewer
    participant Admin
    participant Frontend
    participant Backend
    participant MongoDB
    participant SocketIO

    Note over Candidate,SocketIO: Complete Interview Lifecycle
    
    rect rgb(200, 220, 255)
        Note over Interviewer,MongoDB: Phase 1: Setup
        Interviewer->>Frontend: Register (with CV)
        Frontend->>Backend: POST /api/v1/auth/register
        Backend->>MongoDB: Create user (isApproved: false)
        Admin->>Backend: Approve interviewer
        Backend->>MongoDB: Update user (isApproved: true)
        Interviewer->>Frontend: Create schedule
        Frontend->>Backend: POST /api/v1/schedules
        Backend->>MongoDB: Create schedule + auto-generate slots
    end
    
    rect rgb(220, 255, 220)
        Note over Candidate,MongoDB: Phase 2: Booking
        Candidate->>Frontend: Browse interviewers
        Frontend->>Backend: GET /api/v1/interviewers
        Candidate->>Frontend: Select interviewer & slot
        Frontend->>Backend: POST /api/v1/reservations
        Backend->>MongoDB: Create reservation (status: pending)
    end
    
    rect rgb(255, 255, 200)
        Note over Interviewer,MongoDB: Phase 3: Acceptance
        Interviewer->>Frontend: View pending reservations
        Frontend->>Backend: GET /api/v1/reservations/pending
        Interviewer->>Frontend: Accept reservation
        Frontend->>Backend: POST /api/v1/reservations/:id/accept
        Backend->>MongoDB: Update reservation + Create session
    end
    
    rect rgb(255, 220, 220)
        Note over Candidate,SocketIO: Phase 4: Video Call
        Interviewer->>Frontend: Start session
        Frontend->>Backend: POST /api/v1/sessions/:id/start
        Backend->>MongoDB: Update session (status: in-progress)
        Interviewer->>SocketIO: Connect & join room
        Candidate->>SocketIO: Connect & join room
        Candidate<->Interviewer: WebRTC P2P video call
        Interviewer->>Frontend: Complete session
        Frontend->>Backend: POST /api/v1/sessions/:id/complete
        Backend->>MongoDB: Update session (status: completed)
    end
    
    rect rgb(220, 220, 255)
        Note over Interviewer,MongoDB: Phase 5: Evaluation
        Interviewer->>Frontend: Create evaluation
        Frontend->>Backend: POST /api/v1/evaluations
        Backend->>MongoDB: Create evaluation
        Candidate->>Frontend: View evaluation
        Frontend->>Backend: GET /api/v1/evaluations/:sessionId
        Backend->>MongoDB: Find evaluation
        Backend-->>Frontend: Evaluation data
        Frontend-->>Candidate: Display evaluation results
    end
```

## Key Components

### Actors
- **Candidate**: User seeking interview practice
- **Interviewer**: User conducting interviews
- **Admin**: Platform administrator
- **Frontend**: React application
- **Backend**: Express.js API server
- **MongoDB**: Database
- **SocketIO**: WebSocket server for real-time communication
- **Cloudinary**: File storage service

### Main Entities
- **User**: Candidate, Interviewer, or Admin
- **Schedule**: Interviewer's availability schedule
- **Slot**: Time slot within a schedule
- **Reservation**: Candidate's booking request
- **Session**: Actual interview session
- **Evaluation**: Interviewer's assessment of candidate

### Key Flows
1. **Authentication**: Registration → Approval (for interviewers) → Login
2. **Scheduling**: Interviewer creates schedule → Slots auto-generated
3. **Booking**: Candidate browses → Selects slot → Creates reservation
4. **Acceptance**: Interviewer reviews → Accepts/Rejects → Session created
5. **Video Call**: Session starts → WebRTC connection → Real-time call
6. **Evaluation**: Interviewer evaluates → Candidate views results

