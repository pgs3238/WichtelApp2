package Eventverwaltung.Teilnehmer.entity.internal;

import Eventverwaltung.Event.entity.internal.Event;

import javax.persistence.*;

@Entity
@Table(name="wichtel_event_wichtel_user1")
public class UserEvent {

    @EmbeddedId
    @AttributeOverrides({
            //@AttributeOverride(name = "userEmail", column = @Column(name = "keypartone")),
            //@AttributeOverride(name = "eventId", column = @Column(name = "keyparttwo"))
            @AttributeOverride(name = "userEmail", column = @Column(name = "usermail")),
            @AttributeOverride(name = "eventId", column = @Column(name = "event_eventid"))
    })
    private UserEventId id;

    @ManyToOne
    @MapsId("userEmail")
    //@JoinColumn(name = "keypartone")
    @JoinColumn(name = "usermail")
    private User user;

    @ManyToOne
    @MapsId("eventId")
    //@JoinColumn(name = "keyparttwo")
    @JoinColumn(name = "event_eventid")
    private Event event;

    @Column(name = "radio", nullable = false)
    private int radio = 0; //default value 0


    public UserEvent(UserEventId id, User user, Event event, int radio) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.radio = radio;
    }

    public UserEvent() {}

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
}
