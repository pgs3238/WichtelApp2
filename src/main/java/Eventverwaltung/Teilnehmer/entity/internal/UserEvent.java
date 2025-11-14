package Eventverwaltung.Teilnehmer.entity.internal;

import Eventverwaltung.Event.entity.internal.Event;

import javax.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name="wichtel_event_wichtel_user1")
public class UserEvent {

    @EmbeddedId
    @AttributeOverrides({
            @AttributeOverride(name = "userEmail", column = @Column(name = "usermail")),
            @AttributeOverride(name = "eventId", column = @Column(name = "event_eventid"))
    })
    private UserEventId id;

    @ManyToOne
    @MapsId("userEmail")
    @JoinColumn(name = "usermail")
    private User user;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_eventid")
    private Event event;

    @Column(name = "radio", nullable = false)
    private int radio = 0; //default value 0

    @ElementCollection
    @CollectionTable(
            name = "user_event_exclusions",
            joinColumns = {
                    @JoinColumn(name = "user_email", referencedColumnName = "usermail"),
                    @JoinColumn(name = "event_id", referencedColumnName = "event_eventid")
            }
    )
    @Column(name = "excluded_email")
    private Set<String> excludedEmails = new HashSet<>();


    public UserEvent(UserEventId id, User user, Event event, int radio, Set<String> excludedEmails) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.radio = radio;
        this.excludedEmails = excludedEmails != null ? excludedEmails : new HashSet<>();
    }

    public UserEvent() {
        this.excludedEmails = new HashSet<>();
    }

    public UserEventId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Event getEvent() {
        return event;
    }

    public int getRadio() {
        return radio;
    }

    public void setId(UserEventId id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public void setRadio(int radio) {
        this.radio = radio;
    }

    public Set<String> getExcludedEmails() {
        return excludedEmails;
    }

    public void setExcludedEmails(Set<String> excludedEmails) {
        this.excludedEmails = excludedEmails != null ? excludedEmails : new HashSet<>();
    }
}
