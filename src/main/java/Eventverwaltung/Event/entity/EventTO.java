package Eventverwaltung.Event.entity;

import Eventverwaltung.Event.entity.internal.Event;
import java.io.Serializable;
import java.time.LocalDateTime;

public class EventTO implements Serializable {
    private int eventId;
    private String name;
    private String regeln;
    private LocalDateTime deadline;
    private String ort;
    private LocalDateTime eventDate;

    private String owner;

    public Event toEvent(){
        Event event = new Event(this.eventId, this.name,this.regeln,this.deadline,this.ort, this.eventDate, this.owner);
        return event;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
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

    public String getOrt() {
        return ort;
    }

    public void setOrt(String ort) {
        this.ort = ort;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
