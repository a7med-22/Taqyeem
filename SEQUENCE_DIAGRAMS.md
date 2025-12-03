# Sequence Diagrams - Taqyeem Platform

This document contains sequence diagrams showing the detailed interactions between different components of the Taqyeem Platform over time.

## 1. User Registration and Login Sequence

This diagram shows the complete flow of user registration and authentication with JWT tokens.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    participant Cloudinary

    Note over User,Cloudinary: Registration Flow
    User->>Frontend: Fill registration form
    User->>Frontend: Submit form (with CV if interviewer)
    Frontend->>Backend: POST /api/v1/auth/register
    Backend->>Database: Check if email exists
    Database-->>Backend: User not found
    
    alt Interviewer Role
        Backend->>Cloudinary: Upload CV file
        Cloudinary-->>Backend: CV URL and public ID
    end
    
    Backend->>Database: Create user (hash password)
    Database-->>Backend: User created
    Backend-->>Frontend: Success response (pending approval if interviewer)
    Frontend-->>User: Show success message

    Note over User,Cloudinary: Login Flow
    User->>Frontend: Enter credentials
    User->>Frontend: Submit login form
    Frontend->>Backend: POST /api/v1/auth/login
    Backend->>Database: Find user by email (with password)
    Database-->>Backend: User data
    
    alt Invalid Credentials
        Backend-->>Frontend: Error: Invalid credentials
        Frontend-->>User: Show error message
    else Valid Credentials
        Backend->>Backend: Verify password (bcrypt)
        Backend->>Backend: Generate JWT tokens (access + refresh)
        Backend->>Database: Update lastLogin timestamp
        Backend-->>Frontend: Return user data + tokens
        Frontend->>Frontend: Store tokens in localStorage
        Frontend-->>User: Redirect to dashboard
    end
```

---

## 2. Candidate Booking a Slot Sequence

This diagram shows how a candidate browses interviewers, views slots, and books an interview slot.

```mermaid
sequenceDiagram
    participant Candidate
    participant Frontend
    participant Backend
    participant Database

    Candidate->>Frontend: Navigate to Interviews page
    Frontend->>Backend: GET /api/v1/users?role=interviewer&hasSchedules=true<br/>(with JWT token)
    Backend->>Backend: Verify JWT token
    Backend->>Database: Query approved interviewers with schedules
    Database-->>Backend: List of interviewers
    Backend-->>Frontend: Interviewers list
    Frontend-->>Candidate: Display interviewers

    Candidate->>Frontend: Select interviewer
    Frontend->>Backend: GET /api/v1/slots?interviewerId=xxx<br/>(with JWT token)
    Backend->>Backend: Verify JWT token
    Backend->>Database: Query slots for interviewer
    Database-->>Backend: Available slots
    Backend-->>Frontend: Slots list
    Frontend-->>Candidate: Display calendar with slots

    Candidate->>Frontend: Click "Book Slot"
    Frontend->>Backend: POST /api/v1/reservations<br/>{slotId, note}
    Backend->>Backend: Verify JWT token
    Backend->>Database: Find slot by ID
    Database-->>Backend: Slot data
    
    alt Slot Not Available
        Backend-->>Frontend: Error: Slot not available
        Frontend-->>Candidate: Show error message
    else Slot Available
        Backend->>Database: Check for active reservation<br/>(candidateId + interviewerId)
        Database-->>Backend: No active reservation found
        
        Backend->>Database: Create reservation (status: pending)
        Database-->>Backend: Reservation created
        Backend->>Database: Increment slot.currentCandidates
        Backend->>Database: Update slot.status<br/>(pending or booked)
        Backend-->>Frontend: Success: Reservation created
        Frontend-->>Candidate: Show success message
    end
```

---

## 3. Interviewer Accepting/Rejecting Reservation Sequence

This diagram shows how an interviewer reviews and responds to reservation requests.

```mermaid
sequenceDiagram
    participant Interviewer
    participant Frontend
    participant Backend
    participant Database

    Interviewer->>Frontend: Navigate to Interviews page
    Frontend->>Backend: GET /api/v1/reservations/pending<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & role
    Backend->>Database: Query pending reservations<br/>(interviewerId = current user)
    Database-->>Backend: Pending reservations list
    Backend-->>Frontend: Reservations with candidate details
    Frontend-->>Interviewer: Display pending reservations

    alt Accept Reservation
        Interviewer->>Frontend: Click "Accept"
        Frontend->>Backend: POST /api/v1/reservations/:id/accept<br/>(with JWT token)
        Backend->>Backend: Verify JWT token & authorization
        Backend->>Database: Find reservation by ID
        Database-->>Backend: Reservation data
        
        Backend->>Database: Update reservation<br/>(status: accepted, respondedAt, respondedBy)
        Database-->>Backend: Reservation updated
        Backend->>Database: Create session<br/>(status: scheduled)
        Database-->>Backend: Session created
        Backend-->>Frontend: Success: Reservation accepted, session created
        Frontend-->>Interviewer: Show success message
        
    else Reject Reservation
        Interviewer->>Frontend: Click "Reject" + enter reason
        Frontend->>Backend: POST /api/v1/reservations/:id/reject<br/>{rejectionReason}
        Backend->>Backend: Verify JWT token & authorization
        Backend->>Database: Find reservation by ID
        Database-->>Backend: Reservation data
        
        Backend->>Database: Update reservation<br/>(status: rejected, rejectionReason, respondedAt)
        Database-->>Backend: Reservation updated
        Backend->>Database: Decrement slot.currentCandidates
        Backend->>Database: Update slot.status<br/>(available or pending)
        Backend-->>Frontend: Success: Reservation rejected
        Frontend-->>Interviewer: Show success message
    end
```

---

## 4. Starting Video Interview Session Sequence

This diagram shows the flow of starting a video interview session with WebRTC and Socket.io.

```mermaid
sequenceDiagram
    participant Candidate
    participant Interviewer
    participant Frontend
    participant Backend
    participant Database
    participant SocketIO
    participant WebRTC

    Note over Candidate,WebRTC: Session Start Flow
    Interviewer->>Frontend: View accepted reservations
    Frontend->>Backend: GET /api/v1/sessions/me<br/>(with JWT token)
    Backend->>Database: Query sessions for interviewer
    Database-->>Backend: Sessions list
    Backend-->>Frontend: Sessions data
    Frontend-->>Interviewer: Display sessions

    Interviewer->>Frontend: Click "Start Session"
    Frontend->>Backend: POST /api/v1/sessions/:id/start<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & authorization
    Backend->>Database: Find session by ID
    Database-->>Backend: Session data
    Backend->>Database: Update session<br/>(status: in-progress, actualStartTime)
    Database-->>Backend: Session updated
    Backend-->>Frontend: Success: Session started
    Frontend->>SocketIO: Connect to socket server
    SocketIO-->>Frontend: Connection established

    Note over Candidate,WebRTC: WebRTC Signaling
    Interviewer->>Frontend: Join session room
    Frontend->>SocketIO: Emit 'join-session'<br/>{sessionId, userId, role}
    SocketIO->>SocketIO: Add to room
    SocketIO-->>Frontend: Room joined confirmation
    
    Candidate->>Frontend: View accepted reservation
    Candidate->>Frontend: Click "Join Session"
    Frontend->>SocketIO: Emit 'join-session'<br/>{sessionId, userId, role}
    SocketIO->>SocketIO: Add to room
    SocketIO-->>Frontend: Room joined confirmation
    SocketIO->>SocketIO: Notify other participants
    SocketIO-->>Frontend: Other participant joined

    Note over Candidate,WebRTC: WebRTC Peer Connection
    Interviewer->>Frontend: Initialize WebRTC
    Frontend->>WebRTC: Create peer connection
    Frontend->>WebRTC: Get user media (camera/mic)
    WebRTC-->>Frontend: Media stream
    Frontend->>WebRTC: Create offer
    WebRTC-->>Frontend: Offer SDP
    Frontend->>SocketIO: Emit 'offer'<br/>{offer, sessionId}
    SocketIO->>SocketIO: Broadcast to room
    SocketIO-->>Frontend: Receive offer (Candidate side)
    
    Candidate->>Frontend: Initialize WebRTC
    Frontend->>WebRTC: Create peer connection
    Frontend->>WebRTC: Get user media (camera/mic)
    WebRTC-->>Frontend: Media stream
    Frontend->>WebRTC: Set remote description (offer)
    Frontend->>WebRTC: Create answer
    WebRTC-->>Frontend: Answer SDP
    Frontend->>SocketIO: Emit 'answer'<br/>{answer, sessionId}
    SocketIO->>SocketIO: Broadcast to room
    SocketIO-->>Frontend: Receive answer (Interviewer side)
    
    Frontend->>WebRTC: Set remote description (answer)
    Frontend->>WebRTC: Exchange ICE candidates
    Frontend->>SocketIO: Emit 'ice-candidate'<br/>{candidate, sessionId}
    SocketIO->>SocketIO: Broadcast to room
    SocketIO-->>Frontend: Receive ICE candidate
    Frontend->>WebRTC: Add ICE candidate
    
    Note over Candidate,WebRTC: Video Interview Active
    WebRTC-->>Frontend: Peer connection established
    Frontend-->>Interviewer: Video/audio stream active
    Frontend-->>Candidate: Video/audio stream active
```

---

## 5. Creating Evaluation Sequence

This diagram shows how an interviewer creates an evaluation after completing an interview session.

```mermaid
sequenceDiagram
    participant Interviewer
    participant Frontend
    participant Backend
    participant Database

    Interviewer->>Frontend: Complete interview session
    Frontend->>Backend: POST /api/v1/sessions/:id/complete<br/>{notes}
    Backend->>Backend: Verify JWT token & authorization
    Backend->>Database: Find session by ID
    Database-->>Backend: Session data
    Backend->>Database: Update session<br/>(status: completed, actualEndTime)
    Backend->>Database: Decrement slot.currentCandidates
    Backend->>Database: Update slot.status
    Database-->>Backend: Session and slot updated
    Backend-->>Frontend: Success: Session completed
    Frontend-->>Interviewer: Show completion message

    Interviewer->>Frontend: Click "Create Evaluation"
    Frontend->>Frontend: Display evaluation form
    Interviewer->>Frontend: Fill evaluation form:<br/>- Communication score (1-10)<br/>- Technical score (1-10)<br/>- Problem Solving score (1-10)<br/>- Confidence score (1-10)<br/>- Comments for each criteria<br/>- General notes
    Interviewer->>Frontend: Submit evaluation form
    Frontend->>Backend: POST /api/v1/evaluations<br/>{sessionId, criteria, notes}
    Backend->>Backend: Verify JWT token & authorization
    Backend->>Database: Find session by ID
    Database-->>Backend: Session data
    
    alt Session Not Valid
        Backend-->>Frontend: Error: Session not found or invalid
        Frontend-->>Interviewer: Show error message
    else Session Valid
        Backend->>Database: Check if evaluation exists
        Database-->>Backend: No evaluation found
        
        Backend->>Backend: Calculate overallScore<br/>(average of 4 criteria scores)
        Backend->>Database: Create evaluation<br/>{sessionId, candidateId, interviewerId,<br/>criteria, notes, overallScore, isCompleted}
        Database-->>Backend: Evaluation created
        Backend-->>Frontend: Success: Evaluation created
        Frontend-->>Interviewer: Show success message
        
        Note over Interviewer,Database: Candidate Notification
        Backend->>Database: Evaluation is now available<br/>for candidate to view
    end
```

---

## 6. Admin Managing Users Sequence

This diagram shows how an admin manages users, including approving interviewers and deleting users.

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant Backend
    participant Database

    Admin->>Frontend: Navigate to Admin Dashboard
    Frontend->>Backend: GET /api/v1/admin/dashboard<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & admin role
    Backend->>Database: Query platform statistics
    Database-->>Backend: Statistics data
    Backend-->>Frontend: Dashboard data
    Frontend-->>Admin: Display dashboard

    Admin->>Frontend: Navigate to Users tab
    Frontend->>Backend: GET /api/v1/admin/users<br/>?search=xxx&role=xxx&status=xxx<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & admin role
    Backend->>Database: Query users with filters
    Database-->>Backend: Users list
    Backend-->>Frontend: Users data
    Frontend-->>Admin: Display users table

    alt Approve Interviewer
        Admin->>Frontend: Click "Approve" on pending interviewer
        Frontend->>Backend: POST /api/v1/admin/users/:id/approve<br/>(with JWT token)
        Backend->>Backend: Verify JWT token & admin role
        Backend->>Database: Find user by ID
        Database-->>Backend: User data
        Backend->>Database: Update user<br/>(isApproved: true)
        Database-->>Backend: User updated
        Backend-->>Frontend: Success: Interviewer approved
        Frontend-->>Admin: Show success message
        
    else Reject Interviewer
        Admin->>Frontend: Click "Reject" on pending interviewer
        Frontend->>Backend: POST /api/v1/admin/users/:id/reject<br/>(with JWT token)
        Backend->>Backend: Verify JWT token & admin role
        Backend->>Database: Find user by ID
        Database-->>Backend: User data
        Backend->>Database: Update user<br/>(isApproved: false)
        Database-->>Backend: User updated
        Backend-->>Frontend: Success: Interviewer rejected
        Frontend-->>Admin: Show success message
        
    else Edit User
        Admin->>Frontend: Click "Edit" on user
        Frontend->>Frontend: Display edit form
        Admin->>Frontend: Modify user details
        Admin->>Frontend: Submit form
        Frontend->>Backend: PUT /api/v1/admin/users/:id<br/>{name, email, role, etc.}
        Backend->>Backend: Verify JWT token & admin role
        Backend->>Database: Update user
        Database-->>Backend: User updated
        Backend-->>Frontend: Success: User updated
        Frontend-->>Admin: Show success message
        
    else Delete User
        Admin->>Frontend: Click "Delete" on user
        Frontend->>Frontend: Show confirmation dialog
        Admin->>Frontend: Confirm deletion
        Frontend->>Backend: DELETE /api/v1/admin/users/:id<br/>(with JWT token)
        Backend->>Backend: Verify JWT token & admin role
        Backend->>Database: Find user by ID
        Database-->>Backend: User data
        Backend->>Database: Delete user
        Database-->>Backend: User deleted
        Backend-->>Frontend: Success: User deleted
        Frontend-->>Admin: Show success message
    end
```

---

## 7. Admin Viewing Evaluation Sequence

This diagram shows how an admin views candidate evaluations from the sessions tab.

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant Backend
    participant Database

    Admin->>Frontend: Navigate to Sessions tab
    Frontend->>Backend: GET /api/v1/admin/sessions<br/>?search=xxx&status=xxx&dateFrom=xxx&dateTo=xxx<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & admin role
    Backend->>Database: Query all sessions with filters
    Database-->>Backend: Sessions list
    Backend-->>Frontend: Sessions data
    Frontend-->>Admin: Display sessions table

    Admin->>Frontend: Click "View Evaluation" on session
    Frontend->>Backend: GET /api/v1/evaluations/:sessionId<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & admin role
    Backend->>Database: Find evaluation by sessionId
    Database-->>Backend: Evaluation data
    
    alt Evaluation Not Found
        Backend-->>Frontend: Error: Evaluation not found
        Frontend-->>Admin: Show "Evaluation not available" message
    else Evaluation Found
        Backend->>Database: Populate evaluation<br/>(candidateId, interviewerId, sessionId)
        Database-->>Backend: Evaluation with populated data
        Backend-->>Frontend: Evaluation data
        Frontend->>Frontend: Display evaluation dialog
        Frontend-->>Admin: Show evaluation details:<br/>- Candidate information<br/>- Interviewer information<br/>- Session details<br/>- Communication score & comment<br/>- Technical score & comment<br/>- Problem Solving score & comment<br/>- Confidence score & comment<br/>- Overall score<br/>- General notes
    end
```

---

## 8. Slot Reversal Sequence (When Reservation/Session is Deleted)

This diagram shows how slot availability is restored when a reservation or session is deleted.

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant Backend
    participant Database

    Note over Admin,Database: Delete Reservation Flow
    Admin->>Frontend: Click "Delete" on reservation
    Frontend->>Frontend: Show confirmation dialog
    Admin->>Frontend: Confirm deletion
    Frontend->>Backend: DELETE /api/v1/admin/reservations/:id<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & admin role
    Backend->>Database: Find reservation by ID
    Database-->>Backend: Reservation data
    Backend->>Database: Find slot by reservation.slotId
    Database-->>Backend: Slot data
    Backend->>Database: Decrement slot.currentCandidates
    Backend->>Database: Check if currentCandidates > 0
    Database-->>Backend: Updated count
    
    alt currentCandidates > 0
        Backend->>Database: Update slot.status = 'pending'
    else currentCandidates = 0
        Backend->>Database: Update slot.status = 'available'
    end
    
    Backend->>Database: Delete reservation
    Database-->>Backend: Reservation deleted, slot updated
    Backend-->>Frontend: Success: Reservation deleted, slot restored
    Frontend-->>Admin: Show success message

    Note over Admin,Database: Delete Session Flow
    Admin->>Frontend: Click "Delete" on session
    Frontend->>Frontend: Show confirmation dialog
    Admin->>Frontend: Confirm deletion
    Frontend->>Backend: DELETE /api/v1/admin/sessions/:id<br/>(with JWT token)
    Backend->>Backend: Verify JWT token & admin role
    Backend->>Database: Find session by ID
    Database-->>Backend: Session data
    Backend->>Database: Find reservation by session.reservationId
    Database-->>Backend: Reservation data
    Backend->>Database: Find slot by reservation.slotId
    Database-->>Backend: Slot data
    Backend->>Database: Decrement slot.currentCandidates
    Backend->>Database: Check if currentCandidates > 0
    Database-->>Backend: Updated count
    
    alt currentCandidates > 0
        Backend->>Database: Update slot.status = 'pending'
    else currentCandidates = 0
        Backend->>Database: Update slot.status = 'available'
    end
    
    Backend->>Database: Delete session
    Database-->>Backend: Session deleted, slot updated
    Backend-->>Frontend: Success: Session deleted, slot restored
    Frontend-->>Admin: Show success message
```

---

## Key Components in Sequences

### Frontend
- React application with React Query for data fetching
- JWT token stored in localStorage
- Socket.io client for real-time communication
- WebRTC API for video/audio streaming

### Backend
- Express.js REST API
- JWT authentication middleware
- Role-based authorization
- MongoDB with Mongoose ODM
- Socket.io server for signaling

### Database
- MongoDB collections: Users, Schedules, Slots, Reservations, Sessions, Evaluations
- Indexes for performance optimization
- Data relationships and population

### External Services
- Cloudinary: File storage (CVs, avatars, recordings)
- Socket.io: Real-time signaling for WebRTC
- WebRTC: Peer-to-peer video/audio communication

