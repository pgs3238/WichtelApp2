package Eventverwaltung.Event.entity;

import Eventverwaltung.Event.entity.internal.Event;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;

public class EventTO implements Serializable {
    private int eventId;
    @NotNull(message = "Eventname muss zwischen 5 und 256 Zeichen lang sein.")
    @NotBlank(message = "Eventname muss zwischen 5 und 256 Zeichen lang sein.")
    @Size(min = 5, max = 256, message = "Eventname muss zwischen 5 und 256 Zeichen lang sein.")
    private String name;
    @NotNull(message = "Regeln muss zwischen 5 und 256 Zeichen lang sein.")
    @NotBlank(message = "Regeln muss zwischen 5 und 256 Zeichen lang sein.")
    @Size(min = 5, max = 256, message = "Regeln muss zwischen 5 und 256 Zeichen lang sein.")
    private String regeln;
    @NotNull(message = "Wichteldatum muss gesetzt sein.")
    private LocalDateTime deadline;
    @NotNull(message = "Ort muss zwischen 5 und 256 Zeichen lang sein.")
    @NotBlank(message = "Ort muss zwischen 5 und 256 Zeichen lang sein.")
    @Size(min = 5, max = 256, message = "Ort muss zwischen 5 und 256 Zeichen lang sein.")
    private String ort;
    @NotNull(message = "Geschenkdatum muss gesetzt sein.")
    private LocalDateTime eventDate;

    //@NotNull(message = "Cookie Error")
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
