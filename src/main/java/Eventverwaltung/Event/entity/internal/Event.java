package Eventverwaltung.Event.entity.internal;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "wichtel_event")


public class Event implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int EventId;
    private String name;
    private String regeln;
    private LocalDateTime deadline;
    private LocalDateTime eventDate;

    public Event(int eventId, String name, String regeln, LocalDateTime deadline, LocalDateTime eventDate) {
        EventId = eventId;
        this.name = name;
        this.regeln = regeln;
        this.deadline = deadline;
        this.eventDate = eventDate;
    }

    public Event(){

    }

    public int getEventId() {
        return EventId;
    }

    public void setEventId(int eventId) {
        EventId = eventId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegeln() {
        return regeln;
    }

    public void setRegeln(String regeln) {
        this.regeln = regeln;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }
}
