package Eventverwaltung.Teilnehmer.entity.internal;

import Eventverwaltung.Event.entity.internal.Event;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "unregistered_user")
public class UnregisteredUser {

    @Id
    private String email;

    @ManyToMany(targetEntity = Event.class, fetch = FetchType.EAGER)
    @JoinTable(name = "unregistered_event_user",
            joinColumns = @JoinColumn(name = "unregistered_email"),
            inverseJoinColumns = @JoinColumn(name = "event_id"))
    private Set<Event> events = new HashSet<>();

    public UnregisteredUser() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Set<Event> getEvents() { return events; }
    public void setEvents(Set<Event> events) { this.events = events; }
}
