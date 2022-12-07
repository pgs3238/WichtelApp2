package Eventverwaltung.Event.entity;

import Eventverwaltung.Event.entity.internal.Event;

import java.io.Serializable;
import java.time.LocalDateTime;

public class EventTO implements Serializable {
    private int EventId;
    private String name;
    private String regeln;
    private LocalDateTime deadline;
    private LocalDateTime eventDate;

    public Event toEvent(){
        Event event = new Event(this.EventId, this.name,this.regeln,this.deadline,this.eventDate);
        return event;
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
